// src/config/database.ts
import { Sequelize } from 'sequelize';

// Replace with your actual database credentials
const dbName = 'expenseTracker';
const dbUser = 'root';
const dbPass = 'Yell0_BeE!';
const dbHost = 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

export default sequelize;