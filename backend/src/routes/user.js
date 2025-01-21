const express = require("express");
const { register, login, followUser, logout, updatePassword, updateProfile, deleteMyProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getMyPosts, getUserPosts } = require("../../controllers/user");
const { isAuthanticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/follow/:id").get(isAuthanticated, followUser);
router.route("/logout").get(logout);
router.route("/update/password").put(isAuthanticated, updatePassword);
router.route("/update/profile").put(isAuthanticated, updateProfile);
router.route("/delete/me").delete(isAuthanticated, deleteMyProfile);
router.route("/me").get(isAuthanticated, myProfile);
router.route("/my/posts").get(isAuthanticated, getMyPosts);
router.route("/userposts/:id").get(isAuthanticated, getUserPosts);
router.route("/user/:id").get(isAuthanticated, getUserProfile);
router.route("/users").get(isAuthanticated, getAllUsers);
router.route("/forgot/password").post(forgotPassword );
router.route("/password/reset/:token").put( resetPassword);



module.exports = router;