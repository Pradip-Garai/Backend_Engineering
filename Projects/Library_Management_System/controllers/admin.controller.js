import Books from "../models/books.model.js";

export const AddBook = async (req, res) => {
    try {
        const { title, author, isbn, catagory, quantity, description } = req.body;
        
        // Align description with the database model which expects "descriptions"
        const descriptions = description || req.body.descriptions;

        if (!title || !author || !isbn || !catagory || !quantity || !descriptions) {
            return res.redirect("/admin-panel?message=Book Details Missing !!!");
        }

        if (!req.file || !req.file.path) {
            return res.redirect("/admin-panel?message=Book Image Missing !!!");
        }

        const image = req.file.path;

        const newBook = await Books.create({
            title,
            author,
            isbn,
            catagory,
            quantity,
            descriptions,
            bookImageURL: image,
            createdBy: req.user ? req.user._id : null
        });

        return res.redirect("/admin-panel?message=Book added successfully!");

    } catch (err) {
        console.error("Error adding book:", err);
        return res.redirect(`/admin-panel?message=Failed to add book: ${encodeURIComponent(err.message)}`);
    }
}