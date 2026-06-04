import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({

    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    },
    profileImageURL:{
        type:String
    },
    OTP:{
        type:Number,
        default: undefined
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    resetPasswordOTP:{
        type:Number,
        default: undefined
    },
    resetPasswordEmail:{
        type:String,
        default: undefined
    }
},{timestamps:true});


const User = mongoose.model("users",userSchema);

export default User;