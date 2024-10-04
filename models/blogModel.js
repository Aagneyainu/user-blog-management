import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const blogSchema = new mongoose.Schema(
    {

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,

        },

        content: {
            type: String,
            required: true,

        }

    },
    {
        timestamps: true,
    }
);





const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
