import Books from '../models/books.model.js';
import Borrow from '../models/borrow.model.js';
import User from '../models/users.model.js';

export const HomePage = async (req, res) => {
  try {
    const user = req.user;
    
    // Fetch actual data from database
    const totalBooks = await Books.countDocuments();
    const totalBorrows = await Borrow.countDocuments({ status: "BORROWED" });
    const totalUsers = await User.countDocuments({ role: "USER" });
    
    // Get 15 random books with availability info
    const randomBooks = await Books.aggregate([
      { $sample: { size: 15 } }
    ]);
    
    // Fetch borrow counts for each book to calculate availability
    const booksWithAvailability = await Promise.all(randomBooks.map(async (book) => {
      const borrowCount = await Borrow.countDocuments({ 
        bookId: book._id, 
        status: "BORROWED" 
      });
      return {
        ...book,
        availableCopies: Math.max(0, book.quantity - borrowCount),
        borrowedCopies: borrowCount
      };
    }));
    
    return res.render("Home", {
      users: user,
      stats: {
        totalBooks,
        totalBorrows,
        totalUsers
      },
      randomBooks: booksWithAvailability
    });
  } catch (err) {
    console.error("Error loading home page:", err);
    return res.render("Home", {
      users: user,
      stats: {
        totalBooks: 0,
        totalBorrows: 0,
        totalUsers: 0
      },
      randomBooks: []
    });
  }
}

export const  SignUpPage = (req,res)=>{
  return res.render("Signup");
}

export const LoginPage = (req,res)=>{
  return res.render("Login");
}

export const OtpVerification = (req,res)=>{
  return res.render("Otp_Verification");
}

export const AdminpanelPage = async (req, res) => {
  try {
    const user = req.user;
    
    // Fetch books, borrows and user lists
    const books = await Books.find({}).sort({ createdAt: -1 });
    const borrows = await Borrow.find({})
      .populate("userId")
      .populate("bookId")
      .sort({ createdAt: -1 });
    const users = await User.find({ role: "USER" }).sort({ createdAt: -1 });

    // Calculate actual metrics for admin stats cards
    const totalBooksCount = books.length; // Count of unique book titles
    const totalBooksCopies = books.reduce((acc, curr) => acc + (curr.quantity || 0), 0); // Total copies in inventory
    const activeBorrowsCount = borrows.filter(b => b.status === "BORROWED").length;
    const activeReadersCount = users.filter(u => borrows.some(b => b.userId._id.toString() === u._id.toString() && b.status === "BORROWED")).length; // Readers with active borrowing
    const overdueCount = borrows.filter(b => b.status === "BORROWED" && new Date(b.returnDate) < new Date()).length;

    return res.render("AdminPanel", {
      users: user,
      books: books,
      borrows: borrows,
      readers: users,
      stats: {
        totalBooks: totalBooksCount,
        totalBooksCopies: totalBooksCopies,
        activeBorrows: activeBorrowsCount,
        activeReaders: activeReadersCount,
        overdueCount: overdueCount
      }
    });
  } catch (err) {
    console.error("Error loading admin panel:", err);
    return res.redirect("/?message=Failed to load admin panel");
  }
}

export const BooksPage = async (req, res) => {
  try {
    const user = req.user;
    const books = await Books.find({}).sort({ createdAt: -1 });
    
    // Extract unique authors for the filter dropdown
    const authors = await Books.distinct("author");
    
    // Get borrowing status for each book
    const bookStats = await Promise.all(books.map(async (book) => {
      const borrowCount = await Borrow.countDocuments({ 
        bookId: book._id, 
        status: "BORROWED" 
      });
      return {
        ...book.toObject(),
        availableCopies: Math.max(0, book.quantity - borrowCount),
        borrowedCopies: borrowCount
      };
    }));
    
    return res.render("Books", {
      users: user,
      books: bookStats,
      authors: authors.sort()
    });
  } catch (err) {
    console.error("Error loading books page:", err);
    return res.redirect("/?message=Failed to load book catalog");
  }
}

export const MyBooksPage = async (req, res) => {
  try {
    const user = req.user;
    const borrows = await Borrow.find({ userId: user._id })
      .populate("bookId")
      .sort({ createdAt: -1 });

    return res.render("MyBooks", {
      users: user,
      borrows: borrows
    });
  } catch (err) {
    console.error("Error loading My Books page:", err);
    return res.redirect("/?message=Failed to load my books");
  }
}