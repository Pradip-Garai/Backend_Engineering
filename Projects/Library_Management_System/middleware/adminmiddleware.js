import jwt from 'jsonwebtoken';

const AdminMiddleware = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.redirect("/login?message=Please login to continue");
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);
      if (!decode) {
        return res.redirect("/login?message=Session expired, please login again");
      }

      if (decode.role !== 'ADMIN') {
        return res.redirect("/?message=You are not authorized to access the Admin Panel");
      }

      req.user = decode;

      next();

   } catch (err) {
      console.error("Admin middleware error:", err.message);
      return res.redirect("/login?message=Session expired, please login again");
   }
}

export default AdminMiddleware;