import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {notFound, errorHandler} from "./middleware/error-middleware";
import {v2 as cloudinary} from "cloudinary";

// routers
import userRouter from "./routes/user-route";
import categoryRouter from "./routes/category-route";
import uploadRouter from "./routes/upload-route";
import productRouter from "./routes/product-route";
import orderRouter from "./routes/order-route";
import analyticsRouter from "./routes/analytics-route";


const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(cors());


// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});

app.get("/", (req, res) => {
  res.send("Hello, this is the Sailors API!");
})

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/analytics", analyticsRouter);



// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL as string;

mongoose.connect(MONGODB_URL).then(()=> {
  app.listen(PORT, ()=> console.log(`Server connected to the port ${PORT}`));
})
