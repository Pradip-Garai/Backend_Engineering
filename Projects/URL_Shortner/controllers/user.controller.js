import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import e from 'express';


export const Register = async (req,res)=>{
    try{

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:`All Fields are requied `,
                success:false
            });
        }

        // check user is already exsist or not
        const user = await User.findOne({email:email});
        if(user){
            return res.status(409).json({
                message:`User Already Registered `,
                success:false
            });
        }

        // password encryption
        const hashPassword = await bcrypt.hash(password,10);

        // create user
        const newUser = await User.create({
            name,
            email,
            password:hashPassword
        });

        const token = jwt.sign(
            {_id:newUser._id,email:newUser.email},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );
        
        // store token in cookie
        res.cookie("token", token, {
            httpOnly:true
        });

        // redirect
        return res.redirect("/");

    }catch(err){
        console.log(`Error from User Registration : ${err}`);
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
                message:`All Fields are requied `,
                success:false
            });
        }

        // search user
        const user = await User.findOne({email:email});
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
            });
        }

        const token = jwt.sign(
            {_id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        // store token in cookie
        res.cookie("token", token, {
            httpOnly:true
        });

        // redirect
        return res.redirect("/");
        
    }catch(err){
        console.log(`Error from User Login : ${err}`);
        res.status(500).json({
            message:`Internal Server Error`,
            success:false
        })
    }
}

export const Logout = async (req, res) => {

    try {

        // CLEAR COOKIE

        res.clearCookie("token");

        // REDIRECT LOGIN PAGE

        res.redirect("/login");

    } catch (err) {

        console.log(`Logout Error : ${err}`);

        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });

    }

};