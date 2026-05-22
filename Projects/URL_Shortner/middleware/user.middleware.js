import jwt from 'jsonwebtoken';

const UserMiddleware = async (req,res,next)=>{

    try{

        const token = req.cookies.token;

        if(!token){
            return res.redirect('/login');
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decode;

        next();

    }catch(err){

        return res.redirect('/login');

    }

}

export default UserMiddleware;