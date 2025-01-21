import dotenv from "dotenv";
import app  from "./app.js";
// import express from 'express'
import {connectDB, gracefulShutdown} from "./src/db/db-index.js";

dotenv.config({
  path: "./env",
});

// const app= express();
const PORT = process.env.PORT || 3000;

// Listen for termination signals
process.on("SIGINT", gracefulShutdown); // For Ctrl+C
process.on("SIGTERM", gracefulShutdown); // For termination from the OS or a cloud provider

// // cloudinary.config({
// //  cloud_name: process.env.CLOUDINARY_NAME,
// //  api_key: process.env.CLOUDINARY_API_KEY,
// //  api_secret: process.env.CLOUDINARY_API_SECRET ,
// // });

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`sever is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MONGODB Connection failed`, err.message);
    process.exit(1);
  });



