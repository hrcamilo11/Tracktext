import express from'express';
import authRoutes from './routes/authRoutes.ts';
import connectDB from './config/database.ts';

const app = express();

connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;