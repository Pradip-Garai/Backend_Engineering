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
            {_id:newUser._id, email:newUser.email, name:newUser.fullName, role:newUser.role},
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
            {_id:user._id, email:user.email, name:user.fullName, role:user.role},
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

export const ForgotPasswordPage = (req, res) => {
    try {
        return res.render("ForgotPassword");
    } catch (err) {
        console.log(err);
        return res.redirect("/login");
    }
}

export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.render("ForgotPassword", {
                error: "Please enter your email address"
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.render("ForgotPassword", {
                error: "No account found with this email address"
            });
        }

        // Generate OTP
        const resetOTP = Math.floor(100000 + Math.random() * 900000);
        
        // Save OTP and email to user
        user.resetPasswordOTP = resetOTP;
        user.resetPasswordEmail = email;
        await user.save();

        // Send OTP to email
        EmailSender(email, resetOTP);

        // Redirect to OTP verification page with email in session/query
        return res.redirect(`/auth/api/forgot-password-verify?email=${encodeURIComponent(email)}`);

    } catch (err) {
        console.log(err);
        return res.render("ForgotPassword", {
            error: "An error occurred. Please try again."
        });
    }
}

export const ForgotPasswordVerifyPage = (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.redirect("/auth/api/forgot-password");
        }
        return res.render("ForgotPasswordVerify", { email });
    } catch (err) {
        console.log(err);
        return res.redirect("/login");
    }
}

export const ForgotPasswordVerify = async (req, res) => {
    try {
        const { email, otp1, otp2, otp3, otp4, otp5, otp6 } = req.body;
        
        if (!email) {
            return res.redirect("/auth/api/forgot-password");
        }

        const enteredOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.render("ForgotPasswordVerify", {
                email,
                error: "User not found"
            });
        }

        if (Number(enteredOTP) !== user.resetPasswordOTP) {
            return res.render("ForgotPasswordVerify", {
                email,
                error: "Invalid OTP. Please try again."
            });
        }

        // OTP verified, redirect to reset password page
        return res.redirect(`/auth/api/reset-password?email=${encodeURIComponent(email)}`);

    } catch (err) {
        console.log(err);
        return res.render("ForgotPasswordVerify", {
            error: "An error occurred. Please try again."
        });
    }
}

export const ResetPasswordPage = (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.redirect("/auth/api/forgot-password");
        }
        return res.render("ResetPassword", { email });
    } catch (err) {
        console.log(err);
        return res.redirect("/login");
    }
}

export const ResetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        if (!email || !newPassword || !confirmPassword) {
            return res.render("ResetPassword", {
                email,
                error: "All fields are required"
            });
        }

        if (newPassword !== confirmPassword) {
            return res.render("ResetPassword", {
                email,
                error: "Passwords do not match"
            });
        }

        if (newPassword.length < 6) {
            return res.render("ResetPassword", {
                email,
                error: "Password must be at least 6 characters long"
            });
        }

        const user = await User.findOne({ email });
        
        if (!user) {
            return res.redirect("/forgot-password");
        }

        // Hash new password
        const hashPassword = await bcrypt.hash(newPassword, 10);
        
        // Update password and clear reset fields
        user.password = hashPassword;
        user.resetPasswordOTP = undefined;
        user.resetPasswordEmail = undefined;
        await user.save();

        return res.redirect("/login?message=Password reset successfully. Please login with your new password.");

    } catch (err) {
        console.log(err);
        const { email } = req.body;
        return res.render("ResetPassword", {
            email,
            error: "An error occurred. Please try again."
        });
    }
}
