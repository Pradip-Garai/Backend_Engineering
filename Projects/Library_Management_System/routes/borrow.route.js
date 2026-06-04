import express from 'express';
import { BorrowBook, ReturnBook } from '../controllers/borrow.controller.js';
import UserMiddleware from '../middleware/usermiddleware.js';

const BorrowRouter = express.Router();

// POST routes for borrowing and returning
BorrowRouter.post("/api/borrow", UserMiddleware, BorrowBook);
BorrowRouter.post("/api/return", UserMiddleware, ReturnBook);

export default BorrowRouter;
