import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import http from "http"
import * as dotenv from "dotenv";
import mongoose from "mongoose"
import router from "./routes"

const app = express();
dotenv.config();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log("server running on port 8000")
})
app.post('/api/upload-files', async (req, res) => {
    const { fileUrls } = req.body; // Expect an array of URLs
    try {
      // Save fileUrls to your database or perform other actions
        console.log("received")
      res.status(200).json({ message: "Files uploaded successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Failed to save file URLs." });
    }
  });

  
app.use("/api/applicants", router);
mongoose.Promise = Promise
mongoose.connect(process.env.DB_URL)
mongoose.connection.on('error', (error: Error)=>console.log(error))