import express from 'express';
import { connectDB } from './db/db.js';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import foodRoutes from './routes/food.routes.js';
import foodPartnerRoutes from './routes/food-partner.routes.js';

const app = express();
configDotenv();
connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173', // or your deployed frontend URL
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

export default app;
