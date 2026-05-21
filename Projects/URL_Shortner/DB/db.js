import mongoose from "mongoose";

const DB_Connection = async (req,res)=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);

    }catch(err){
        console.log(`Error from Database Connections`);
        res.status(500).json({
            message:`Internal Server Error`,
            success:false
        })
    }
}

export default DB_Connection;