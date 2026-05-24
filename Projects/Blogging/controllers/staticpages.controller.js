import Blog from "../models/blog.model.js";

export const HomePage = async  (req,res)=>{
    const allBlogs = await Blog.find({}).populate('createdBy', 'fullName email profilePicture');
    return res.render("Home",{
        user:req.user,
        currentPage:"home",
        blogs:allBlogs
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

export const ReadBlogPage = async (req,res)=>{
    
    const blog = await Blog.findById(req.params.id).populate('createdBy', 'fullName email profilePicture');

    return res.render("Blog",{
        user:req.user,
        blog:blog
    })
}