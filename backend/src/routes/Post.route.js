import express from "express";
import { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, commentOnPost, deleteComment } from "../controllers/Post.controller.js";
import { isAuthanticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/post/upload").post(isAuthanticated,createPost);
router.route("/post/:id").get(isAuthanticated, likeAndUnlikePost);
router.route("/post/:id").put(isAuthanticated, updateCaption);
router.route("/post/:id").delete(isAuthanticated,deletePost);
router.route("/posts").get(isAuthanticated,getPostOfFollowing);

router.route("/post/comment/:id").put(isAuthanticated,commentOnPost);
router.route("/post/comment/:id").delete(isAuthanticated,deleteComment);

export default router;                                                        