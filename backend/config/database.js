var mongoose = require("mongoose");

exports.connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
};



// exports.connectDatabase = () => {
//     mongoose.connect(process.env.MONGO_URI);
//     mongoose.Promise = global.Promise;
//     var db = mongoose.connection;
//     db.on('connected',(con)=>{
//         console.log(`Database Connected: ${con.connection.host}`);
//     });
    
//     db.on('error', (error)=>{
//         console.log("Mongoose connection error"+error);
//     })
// };