// routes/userRoutes.js
import express from 'express';
import protect from '../middlewares/auth.js';
import authorize from '../middlewares/role.js';
import { 
  getAllUsers, 
  getUserById,
  updateUser,
  deleteUser,
  getCurrentUser 
} from '../controllers/userController.js';

const router = express.Router();

// Any authenticated user can see their own profile
router.get('/me', protect, getCurrentUser);

// Admin only routes
router.get('/', protect, authorize('Admin'), getAllUsers);
router.get('/:id', protect, authorize('Admin'), getUserById);
router.put('/:id', protect, authorize('Admin,Viewer'), updateUser);
router.delete('/:id', protect, authorize('Admin'), deleteUser);

export default router;