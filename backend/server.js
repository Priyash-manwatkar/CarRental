import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import connectDb from './config/db.js';
import userRouter from './routes/userRoutes.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app=express();

const port=process.env.PORT || 3000
await connectDb()
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/bookings',bookingRouter)
app.get('/',(req,res)=>{
    res.send("server is running")

})
app.listen(port,()=>{
    console.log(`Server is listening on Port ${port}`);
})