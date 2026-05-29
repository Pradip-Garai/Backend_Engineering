import jwt from 'jsonwebtoken';

const UserMiddleware = async (req,res,next)=>{
   try{
      const token = req.cookies.token;
      if(!token){
        return res.redirect("/login");
      }

      const decode = jwt.verify(token,process.env.JWT_SECRET);
      if(!decode){
        return res.redirect("/login");
      }

      req.user = decode;

      next();

   }catch(err){

   }
}

export default UserMiddleware;