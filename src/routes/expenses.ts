// src/routes/expense.ts
import { Router } from 'express';
import { 
  createExpense, 
  getExpenses, 
  updateExpenseStatus,
  getExpenseAnalytics 
} from '../controllers/expenseController';
import { protect, admin } from '../middleware/authMiddleware';

const router = Router();

// This middleware protects ALL routes in this file
router.use(protect);

// General routes
router.route('/')
  .post(createExpense)
  .get(getExpenses);

// Specific routes MUST come before dynamic routes
router.route('/analytics')
  .get(admin, getExpenseAnalytics);

// Dynamic routes with parameters come last
router.route('/:id/status')
  .patch(admin, updateExpenseStatus);

export default router;