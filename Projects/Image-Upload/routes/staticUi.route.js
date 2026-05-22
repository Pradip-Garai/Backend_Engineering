import express from 'express';

const StaticRouter = express.Router();

StaticRouter.get("/",(req,res)=>{
    return res.render("Home");
})

export default StaticRouter;