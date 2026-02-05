import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRouter from "./routes/authRoute.js";
import postRouter from "./routes/postRoute.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());

//API
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
  })
  .catch((err) => {
    console.log(err);
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Running on Port", PORT);
});