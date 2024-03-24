import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // we have to give database name also 
        // now that await mongoose.connect gives a return object so we name it a variable
        // connectionInstance : after connection, this variable holds responses
        console.log(`\n MongoDB connected!! DB Host: ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MONGODB connection FAILED: ", error);
        process.exit(1) // check why are we writing process.exit(1)- '1' only why?
        // Now our current application is running on a process and 'process' is a reference to that, so we exit it. 
    }
}

export default connectDB