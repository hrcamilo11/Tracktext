import express from'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import connectDB from './config/database';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  //Origen permitido, que puede ser la URL de tu frontend
    credentials: true
  }));

connectDB().then(() => {});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

export default app;