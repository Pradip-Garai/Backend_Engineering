import mongoose from "mongoose";


const DB_Connect = async (req,res)=>{
    try{

        await mongoose.connect(process.env.DB_URL);

    }catch(err){
        console.log(`Error from MongoDB Connection : ${err}`);
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }
}

export default DB_Connect;