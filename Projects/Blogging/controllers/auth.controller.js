import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const Signup = async (req,res)=>{
    try{

        const {fullName,gender,email,password} = req.body;
        if(!fullName || !gender || !email || !password){
            return res.status(400).json({
               message:`Missing fields !!!`,
               success:false
            });
        }

        // Check is email already exsist
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({
               message:`User Already Registered`,
               success:false
            });
        }

        // password encryption
        const hashPassword = await bcrypt.hash(password,10);

        // Create user
        const newUser = await User.create({
            fullName,
            gender,
            email,
            password:hashPassword
        });

        return res.redirect("/");
    
    }catch(err){
        console.log(`Error from Signup: ${err}`);
        res.status(500).json({
            message:`Internal Server Error`,
            success:false
        })
    }
}

export const Login = async (req,res)=>{
    try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:`Missing Email or Password`,
                success:false
            });
        }

        // check user present or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:`Invalid Email or Password`,
                success:false
            });
        }

        // check password is correct or not 
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.status(404).json({
                message:`Invalid Email or Password`,
                success:false
            })
        }

        return res.redirect("/");

    }catch(err){
        console.log(`Error from Login: ${err}`);
        res.status(500).json({
            message:`Internal Server Error`,
            success:false
        });
    }
}
