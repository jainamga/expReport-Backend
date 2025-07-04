import { Response } from 'express';
import { Expense, Category } from '../models';
import { AuthRequest } from '../middleware/authMiddleware';
import sequelize from '../config/database';

// --- Create a new expense ---
export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, category_id, description, expense_date } = req.body;
    const userId = req.user?.id;

    const expense = await Expense.create({
      amount,
      category_id,
      description,
      expense_date,
      user_id: userId,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error });
  }
};

// --- Get expenses ---
export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const whereClause: any =
      req.user?.role === 'Admin' ? {} : { user_id: req.user?.id };

    // Add filters based on query params
    const { category_id, start_date, end_date } = req.query;

    if (category_id) {
      whereClause.category_id = category_id;
    }
    if (start_date || end_date) {
      whereClause.expense_date = {};
      if (start_date) {
        whereClause.expense_date['$gte'] = start_date;
      }
      if (end_date) {
        whereClause.expense_date['$lte'] = end_date;
      }
    }

    const expenses = await Expense.findAll({ where: whereClause });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

// --- Update an expense status (Admin only) ---
export const updateExpenseStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.status = status;
    await expense.save();

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense status', error });
  }
};

// --- Get Expense Analytics (Admin only) ---
export const getExpenseAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const analytics = await Expense.findAll({
      attributes: [
        [sequelize.col('Category.name'), 'categoryName'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
      ],
      include: [{
        model: Category,
        attributes: []
      }],
      group: ['Category.name'],
      raw: true,
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};