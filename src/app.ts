import express from'express';
import authRoutes from './routes/authRoutes.ts';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

export default app;