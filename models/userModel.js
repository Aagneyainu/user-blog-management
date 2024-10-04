import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },   // Ensure virtuals are included in JSON responses
        toObject: { virtuals: true }, // Ensure virtuals are included in object responses
    }
);

// Define virtual property 'blogs' to populate blogs created by this user
userSchema.virtual('blogs', {
    ref: 'Blog',          // The model to use (Blog)
    localField: '_id',    // Field on the user schema (user ID)
    foreignField: 'author',  // Field on the blog schema that references the user
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Doing encryption before saving to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
