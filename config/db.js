import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.DB_CONFIG
            //   "mongodb+srv://sajinapk94:sajina123@cluster0.h6ics.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

        );
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
