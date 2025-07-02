// src/models/index.ts
import User from './User';
import Expense from './Expense';
import Category from './Category';

// A User can have many Expenses
User.hasMany(Expense, { foreignKey: 'user_id' ,   onDelete: 'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'user_id' });

// A Category can have many Expenses
Category.hasMany(Expense, { foreignKey: 'category_id' });
Expense.belongsTo(Category, { foreignKey: 'category_id' });

export { User, Expense, Category };