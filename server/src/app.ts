import express from "express";
import dotenv from "dotenv";
const app = express();

// config dot env file
dotenv.config();

app.get('/', (req, res)=>{
    res.send("Hello world !")
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server app Listing at http://localhost:${PORT}`);
})