import mongoose,{Schema} from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter an name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a Password"],
    minlength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
//To hash a password:
userSchema.pre("save", async function (next) {
  // do stuff
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

//To check a password:
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// userSchema.methods.matchPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    // { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
// userSchema.methods.generateToken = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
// };

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      // email: this.email,
      // username: this.username,
      // fullname: this.fullname,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};
// userSchema.methods.getResetPasswordToken = function () {
//   const resetToken = crypto.randomBytes(20).toString("hex");
//   this.resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

export const User = mongoose.model("User", userSchema);
