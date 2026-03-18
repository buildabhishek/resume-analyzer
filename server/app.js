import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.get('/', (req, res) => res.send('API running...'));

export default app;
