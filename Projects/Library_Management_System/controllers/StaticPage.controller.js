
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