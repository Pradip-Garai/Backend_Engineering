import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import EmailSender from '../services/mail_sender.js'


export const Register = async (req,res)=>{
    try{

        const { fullName,email,password} = req.body;
        if(!fullName || !email || !password){
            return res.render("Signup",{
                error:`Missing inputs !!! all fields are required `
            });
        }

        const user = await User.findOne({email});
        if(user){
            return res.render("Signup",{
                error:`User Already Exsist`
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const otp = Math.floor(100000 + Math.random() * 900000);
        EmailSender(email,otp);

        const newUser = await User.create({
            fullName,
            email,
            password:hashPassword,
            OTP:otp
        });

        const token = jwt.sign(
            {_id:newUser._id, email:newUser.email, name:newUser.fullName},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        res.cookie("token",token).redirect("/otp-varification");

    }catch(err){

    }
}

export const Login = async (req,res)=>{
     try{

        const {email,password} = req.body;
        if(!email || !password){
            return res.render("Login",{
                error:`Missing inputs !!! all fields are required `
            });
        }

        const user = await User.findOne({email});
        if(!user){
            return res.render("Login",{
                error:`Invalid Email or Password !!!`
            });
        }

        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(!isPasswordMatched){
            return res.render("Login",{
                error:`Invalid Email or Password !!!`
            });
        }

        const token = jwt.sign(
            {_id:user._id, email:user.email, name:user.fullName},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        );

        res.cookie("token",token).redirect("/");

    }catch(err){

    }
}

export const Logout = async (req,res)=>{
    try{

        res.clearCookie("token");

        return res.redirect("/login");

    }catch(err){

    }
}


export const OTPVarification = async (req, res) => {

    try {

        const { otp1, otp2, otp3, otp4, otp5, otp6 } = req.body;

        const email = req.user.email;

        // Combine OTP

        const enteredOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

        // Find User

        const user = await User.findOne({ email });

        if(!user){

            return res.redirect("/signup");

        }

        // Compare OTP

        if(Number(enteredOTP) !== user.OTP){

            return res.redirect("/otp-varification");

        }

        // Update Verification Status

        user.isVarified = true;

        // Remove OTP after verification

        user.OTP = undefined;

        await user.save();

        return res.redirect("/");

    } catch (err) {

        console.log(err);

        return res.redirect("/otp-varification");

    }

}
