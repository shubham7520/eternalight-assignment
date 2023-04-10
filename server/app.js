import express from "express";
import { config } from "dotenv";
import connectdb from "./config/connectdb.js"
import userRoute from "./routes/userRoute.js";

const app = express();
config();
connectdb();

app.use(express.json());
app.use('/api/v1', userRoute);

app.get('/', (req, res) => {
    res.send("API is working..");
})

const PORT = process.env.PORT || 4500;

app.listen(PORT, console.log("Server is Started.."));