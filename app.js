import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import connectToDb from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
dotenv.config();

//db connection
connectToDb(
  `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ricpc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
)
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Error", error.message));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// routes
app.use("/api/users/", userRouter);
app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to our site",
    success: true,
    error: false,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
