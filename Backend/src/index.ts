import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import http from "http";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes";
import { uploadFiles } from "controller/applicant.controller";

const app = express();
dotenv.config();
export const JWT_SECRET = process.env.JWT_SECRET

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log("server running on port 8000");
});
app.post("/api/:id/upload-files", uploadFiles);

app.use("/api/applicants", router);

app.post("/api/logout", (req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
