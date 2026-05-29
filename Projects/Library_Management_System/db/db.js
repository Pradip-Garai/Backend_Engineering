import mongoose from "mongoose";

const DataBase_Connection = async ()=>{
    try{

        return await mongoose.connect(process.env.MONGO_URL);

    }catch(err){

        console.log(`Error from Database Connection:`, err.message);
        throw err;

    }
}

export default DataBase_Connection;