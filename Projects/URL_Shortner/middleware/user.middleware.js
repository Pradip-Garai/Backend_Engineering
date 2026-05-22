import jwt from 'jsonwebtoken';

const UserMiddleware = async (req, res, next) => {

    try {

        // GET TOKEN FROM COOKIE

        const token = req.cookies?.token;

        // CHECK TOKEN EXIST OR NOT

        if (!token) {

            return res.redirect('/login');

        }

        // VERIFY TOKEN

        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // STORE USER DATA IN REQ

        req.user = decode;

        // NEXT MIDDLEWARE
        next();

    } catch (err) {

        return res.redirect('/login');

    }

};

export default UserMiddleware;