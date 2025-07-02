import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// Defines the POST route for registering a user
router.post('/register', registerUser);

// Defines the POST route for logging in a user
router.post('/login', loginUser);

export default router;