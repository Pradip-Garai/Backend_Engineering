
export const HomePage = (req,res)=>{
    return res.render("Home",{
        user:req.user
    });
}

export const SignupPage = (req,res)=>{
    return res.render("Signup");
}

export const LoginPage = (req,res)=>{
    return res.render("Login");
}