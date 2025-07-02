import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import expenseRoutes from './routes/expenses'; // Corrected import
import './models'; // This one line is enough to load all models and associations

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mount the routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database connected and synced.');
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();