import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();


// if(process.env.NODE_ENV !== "production"){
//     require("dotenv").config({path: "backend/config/config.env"});
// }
//using middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ limit: '16kb',extended:true}));
app.use(express.static("public"))
app.use(cookieParser());

// //importing routes
// const post = require("./routes/Post.route.js");
// const user = require("./routes/user.route.js");

// app.use("/api/v1", post);
// app.use("/api/v1", user);

export default app;