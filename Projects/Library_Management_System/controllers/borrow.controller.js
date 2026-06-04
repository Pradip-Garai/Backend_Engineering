import Borrow from '../models/borrow.model.js';
import Books from '../models/books.model.js';

// Borrow a book
export const BorrowBook = async (req, res) => {
    try {
        const { bookId, returnDate } = req.body;
        const userId = req.user._id;

        if (!bookId || !returnDate) {
            return res.status(400).json({ success: false, message: "Book ID and Return Date are required." });
        }

        // Validate Return Date
        const rDate = new Date(returnDate);
        const today = new Date();
        today.setHours(0,0,0,0);
        if (isNaN(rDate.getTime()) || rDate <= today) {
            return res.status(400).json({ success: false, message: "Please select a valid return date in the future." });
        }

        // Check if book exists and has quantity > 0
        const book = await Books.findById(bookId);
        if (!book) {
            return res.status(444).json({ success: false, message: "Book not found in library catalog." });
        }

        if (book.quantity <= 0) {
            return res.status(400).json({ success: false, message: "Sorry, this book is currently out of stock." });
        }

        // Check if user already borrowed this book and hasn't returned it yet
        const existingBorrow = await Borrow.findOne({
            userId,
            bookId,
            status: "BORROWED"
        });

        if (existingBorrow) {
            return res.status(400).json({ success: false, message: "You have already borrowed a copy of this book. Please return it before borrowing another." });
        }

        // Create the borrow record
        const newBorrow = await Borrow.create({
            userId,
            bookId,
            returnDate: rDate,
            status: "BORROWED"
        });

        // Decrement book catalog quantity
        book.quantity -= 1;
        await book.save();

        return res.status(200).json({
            success: true,
            message: `Successfully borrowed "${book.title}"!`,
            borrow: newBorrow
        });

    } catch (err) {
        console.error("Error in BorrowBook controller:", err);
        return res.status(500).json({ success: false, message: "Server error occurred while borrowing the book." });
    }
};

// Return a borrowed book
export const ReturnBook = async (req, res) => {
    try {
        const { borrowId } = req.body;
        const userId = req.user._id;

        if (!borrowId) {
            return res.status(400).json({ success: false, message: "Borrow ID is required." });
        }

        // Find borrow record
        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).json({ success: false, message: "Borrow record not found." });
        }

        // Ensure user owns this borrow record OR is an admin
        if (borrow.userId.toString() !== userId.toString() && req.user.role !== "ADMIN") {
            return res.status(403).json({ success: false, message: "You are not authorized to return this book." });
        }

        // Check if already returned
        if (borrow.status === "RETURNED") {
            return res.status(400).json({ success: false, message: "This book has already been returned." });
        }

        // Update borrow status
        borrow.status = "RETURNED";
        await borrow.save();

        // Increment book catalog quantity
        const book = await Books.findById(borrow.bookId);
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        return res.status(200).json({
            success: true,
            message: `Successfully returned the book!`
        });

    } catch (err) {
        console.error("Error in ReturnBook controller:", err);
        return res.status(500).json({ success: false, message: "Server error occurred while returning the book." });
    }
};
