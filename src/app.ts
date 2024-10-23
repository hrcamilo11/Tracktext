import express from'express';
import authRoutes from './routes/authRoutes.ts';
import connectDB from './config/database.ts';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Origen permitido, que puede ser la URL de tu frontend
    credentials: true
  }));

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;