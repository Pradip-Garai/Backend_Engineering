import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Books from '../models/books.model.js';

dotenv.config();

async function checkBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL);
        console.log("Connected to MongoDB successfully!");
        
        const books = await Books.find({});
        console.log(`Found ${books.length} books in database:\n`);
        
        books.forEach((book, index) => {
            console.log(`${index + 1}. Title: ${book.title}`);
            console.log(`   Author: ${book.author}`);
            console.log(`   ISBN: ${book.isbn}`);
            console.log(`   Image URL: ${book.bookImageURL}`);
            console.log(`   ------------------------------------------`);
        });
        
        await mongoose.disconnect();
    } catch (err) {
        console.error("Error querying books:", err);
    }
}

checkBooks();
