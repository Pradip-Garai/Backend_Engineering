import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true 
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    }
});


const User = mongoose.model('users',userSchema);

export default User;