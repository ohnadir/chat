import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

// config dot env file
dotenv.config();


/* import { authenticationRouter, userRouter } from './routes';
app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);
 */

app.get('/', (req, res)=>{
    res.send("Hello world !")
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server app Listing at http://localhost:${PORT}`);
})