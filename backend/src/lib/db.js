import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connect to Mongodb ${conn.connection.host}`);
    }catch(error){
        console.log("failed to connect to MongGoDB ", error);
        process.exit(1)
    }
}