
export const HomePage = (req,res)=>{
    return res.render("Home",{
        user:req.user,
        currentPage:"home"
    });
}

export const SignupPage = (req,res)=>{
    return res.render("Signup");
}

export const LoginPage = (req,res)=>{
    return res.render("Login");
}

export const AddBlogPage = (req,res)=>{
    return res.render("AddBlog",{
        user:req.user,
        currentPage:"add-blog"
    });
}