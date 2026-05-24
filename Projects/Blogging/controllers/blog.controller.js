import Blog from '../models/blog.model.js';


export const CreateBlog = async (req,res)=>{
    try{

        const {title,body} = req.body;
        if(!title || !body){
            return res.render("AddBlog",{
                error:`Missing Title or Content`
            });
        }

        const coverImageURL = req.file.path;

        //store data
        const newBlog = await Blog.create({
            title,
            body,
            coverImageURL,
            createdBy:req.user.id
        });

        console.log(newBlog);
        res.redirect("/");

    }catch(err){
        console.log(`Error From Blog Creation: ${err}`);
        return res.render("AddBlog",{
            error: `Internal Server Error`
        })
    }
}