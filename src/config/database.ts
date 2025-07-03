// src/config/database.ts
import { Sequelize } from 'sequelize';

// Replace with your actual database credentials
const dbName = process.env.DB_NAME || 'expenseTracker';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || 'Yell0_BeE!';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

export default sequelize;