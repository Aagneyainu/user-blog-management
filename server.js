import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import dotenv from "dotenv";
dotenv.config()
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";



const app = express();
app.use(cors());
app.use(express.json());

// Database connection
connectDB();
// Database connection



// API routes
app.get("/", (req, res) => {
  res.status(201).json("Running");
});

app.use("/api/users",userRoutes);
app.use("/api/blogs",blogRoutes);

// Error handling middleware
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT
app.listen(port, () => console.log(`Server running in ${port}`));
