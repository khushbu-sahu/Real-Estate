import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err);
})

const app = express();
// we use expesss.json to parse the request body in json format , when we not using this then we can't get the data from the server we get an undefined


app.listen(3000 , () =>{
    console.log("server is running on port 3000")
})
app.use(express.json())
app.use('/api/user', userRouter)

app.use('/api/auth', authRouter )

