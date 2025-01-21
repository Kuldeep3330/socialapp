import mongoose from 'mongoose'
import {DB_NAME} from "../../constants.js"


const connectDB = async () => {
    try{
      const connectIns=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log(`\n MONGODB Connected: ${connectIns.connection.host}`);
      
    }catch(err){
        console.log(`MONGODB Connection failed`, err.message)
        process.exit(1);
    }
}

const gracefulShutdown= async()=>{
    try {
        await mongoose.disconnect();
        console.log('MongoDb connection closed.');
        process.exit(0);        
        
    } catch (error) {
        console.log('MongoDB disconnection failed ', error.message)   
        process.exit(1); 
    }
}

export {connectDB, gracefulShutdown}