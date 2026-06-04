import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["BORROWED", "RETURNED"],
        default: "BORROWED"
    }
}, { timestamps: true });

const Borrow = mongoose.model("borrows", borrowSchema);

export default Borrow;
