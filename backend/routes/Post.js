const express = require("express");
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment } = require("../controllers/Post");
const { isAuthanticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthanticated,createPost);
router.route("/post/:id").get(isAuthanticated, likeAndUnlikePost);
router.route("/post/:id").put(isAuthanticated, updateCaption);
router.route("/post/:id").delete(isAuthanticated,deletePost);
router.route("/posts").get(isAuthanticated,getPostOfFollowing);

router.route("/post/comment/:id").put(isAuthanticated,commentOnPost);
router.route("/post/comment/:id").delete(isAuthanticated,deleteComment);

module.exports = router;                                                        