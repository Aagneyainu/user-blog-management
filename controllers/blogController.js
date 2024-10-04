import asyncHandler from "../middleware/asyncHandler.js";
import Blog from "../models/blogModel.js";

export const addBlog = asyncHandler(async (req, res) => {


    const author = req.user._id;

    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error("Please enter all the required fields");
    }


    const blog = await Blog.create({
        title,
        content,
        author
    });
    if (blog) {
        res.status(201).json({ sts: "01", msg: "blog added successfully", blog });
    } else {
        res.status(400).json({ sts: "00", msg: "Error in adding blog" });
    }
})



export const editBlog = asyncHandler(async (req, res) => {


    const blogId = req.query.blogId;

    const { title, content } = req.body;

    if (!blogId) {
        res.status(400);
        throw new Error("Please provide blogId");
    }


    const blog = await Blog.findById(blogId)

    if (blog) {

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title: title,
            content: content
        }, { new: true })

        if (updatedBlog) {

            res.status(200).json({ sts: "01", msg: "Blog updated successfully", blog: updatedBlog });

        } else {
            res.status(400).json({ sts: "00", msg: "Blog not updated" });
        }

    } else {
        res.status(400).json({ sts: "00", msg: "Blog not found" });
    }
})


export const deleteBlog = asyncHandler(async (req, res) => {


    const blogId = req.query.blogId;



    if (!blogId) {
        res.status(400);
        throw new Error("Please provide blogId");
    }


    const blog = await Blog.findById(blogId)

    if (blog) {

        await Blog.findByIdAndDelete(blog._id).then(() => {
            res.json({
                sts: "01",
                msg: "deleted successfully"
            })
        })

    } else {
        res.status(400).json({ sts: "00", msg: "Blog not found" });
    }
})


export const getDetailsOfABlog = asyncHandler(async (req, res) => {

    const { blogId } = req?.params

    let blog = await Blog.findById(blogId).populate({
        path: 'author',
        select: 'userName email',
    });


    res.status(200).json({ sts: "01", msg: "Blog data fetched successfully", result: blog });


})


export const getListOfBlogs = asyncHandler(async (req, res) => {

    const { blogId } = req?.params

    const blogs = await Blog.find() // Fetch all blogs
        .populate("author", "userName email") // Populate author field with user details (you can choose fields to return)
        .select("title content author") // Select only the fields you want to return
        .sort({ createdAt: -1 }); // Sort by latest created at


    // Format the blogs to include a short excerpt (first 100 characters of content)
    const formattedBlogs = blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        author: blog.author.userName, // Use the populated user name
        excerpt: blog.content.substring(0, 100) + (blog.content.length > 100 ? '...' : ''), // Short excerpt
    }));




    res.status(200).json({ sts: "01", msg: "Blog data fetched successfully", result: formattedBlogs });


})