import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the required fields");
    }

    //Check if provided email alraedy exist or not
    const user = await User.findOne({
        email: email
    });

    if (user) {
        res.status(400);
        throw new Error("User already exists");
    } else {

        //Creating a record of user
        const createUser = await User.create({
            userName,
            email,
            password,

        });

        if (createUser) {
            res.status(200).json({
                sts: "01",
                msg: "Registerd successfully.",

            });
        } else {
            res.status(400).json({
                sts: "00",
                msg: "Something went wrong",
            });
        }
    }
});



// Login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res
            .status(400)
            .json({ sts: "00", msg: "Please enter all required fields" });
    }

    let user = await User.findOne({ email });


    if (user && (await user.matchPassword(password))) {

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "800d",
            }
        );

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token_type: "Bearer",
            access_token: token,
            sts: "01",
            msg: "Success",
        });
    } else {
        res.status(401).json({ sts: "00", msg: "User does not exist" });
    }
});

//Function to edit details of a user
export const editUser = asyncHandler(async (req, res) => {

    const { userId, userName, email, password } = req.body;
    if (!userId) {
        res.json({
            msg: "please provide userId",
            sts: "00"
        });
        throw new Error("Please provide userId");
    }


    const user = await User.findById(userId)

    if (user) {
        const userExist = await User.findOne({
            email: email
        });

        if (userExist) {
            res.status(400);
            throw new Error("User already exists");
        } else {
            const updatedUser = await User.findByIdAndUpdate(userId, {
                userName: userName,
                email: email,
                password: password
            }, { new: true })

            if (updatedUser) {

                res.status(200).json({ sts: "01", msg: "User updated successfully" });

            } else {
                res.status(400).json({ sts: "00", msg: "User not updated" });
            }
        }
    } else {
        res.status(400).json({ sts: "00", msg: "User not found" });
    }
})



export const getUsers = asyncHandler(async (req, res) => {

    const blog = req.query.blog;


    let users;
    if (blog) {

        users = await User.find().populate({
            path: 'blogs',   // The field in Blog that references the user
            select: 'title content', // Specify which fields to return from Blog
        });
    } else {
        users = await User.find()
    }

    res.status(200).json({ sts: "01", msg: "Users data fetched successfully", result: users });


})
