import Books from '../models/books.model.js';

export const HomePage = (req,res)=>{
  const user = req.user;
  return res.render("Home",{
    users:user
  });
}

export const  SignUpPage = (req,res)=>{
  return res.render("Signup");
}

export const LoginPage = (req,res)=>{
  return res.render("Login");
}

export const OtpVerification = (req,res)=>{
  return res.render("Otp_Verification");
}

export const AdminpanelPage = (req,res)=>{
  return res.render("AdminPanel");
}

export const BooksPage = async (req, res) => {
  try {
    const user = req.user;
    const books = await Books.find({}).sort({ createdAt: -1 });
    
    // Extract unique authors for the filter dropdown
    const authors = await Books.distinct("author");
    
    return res.render("Books", {
      users: user,
      books: books,
      authors: authors.sort()
    });
  } catch (err) {
    console.error("Error loading books page:", err);
    return res.redirect("/?message=Failed to load book catalog");
  }
}