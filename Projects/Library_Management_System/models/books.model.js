import mongoose from "mongoose";
const Schema = mongoose.Schema;

const booksSchema = new Schema({

    title:{
        type:String,
        required:true,
        minlength:3,
    },
    author:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        enum: ["Science","Technology","Mathematics","Literature","History","Business","Computers","Stories"],
        required:true
    },
    quantity:{
        type:Number,
        default:1,
        required:true
    },
    bookImageURL:{
        type:String
    },
    descriptions:{
        type:String,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true});

const Books = mongoose.model("books",booksSchema);

export default Books; 
