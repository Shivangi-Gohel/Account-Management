import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
connectDB();

app.use(cors({
  origin: ["http://localhost:5173", "https://account-management-two.vercel.app"],  
  credentials: true,        
}))

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

import authRouter from './routes/authRouter.js';
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});