import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addBlog, deleteBlog, editBlog, getDetailsOfABlog, getListOfBlogs } from "../controllers/blogController.js";
const router = express.Router();


router.route("/add-blog").post(protect,addBlog);

router.route("/edit-blog").put(protect,editBlog)

router.route("/delete-blog").delete(protect,deleteBlog)

router.route("/get-blog/:blogId").get(protect,getDetailsOfABlog)

router.route("/get-all-blogs").get(protect,getListOfBlogs)


export default router;