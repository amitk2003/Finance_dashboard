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
// get current user (/me)
/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Users]
 *     description: Returns the profile details of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: Unauthorized
 */


// get all users (admin)

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Admin can fetch all users in the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden - Only Admin allowed
 */

// get user by id
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Admin can fetch a specific user by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not authenticated
 *       403:
 *         description: user is not authorised
 */

// update user role/status
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user role or status
 *     tags: [Users]
 *     description: Admin (or Viewer if allowed) can update user details like role or status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [Viewer, Analyst, Admin]
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */



// delete user

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     description: Admin can delete a user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */

router.get('/me', protect, getCurrentUser);

router.get('/', protect, authorize('Admin'), getAllUsers);
router.get('/:id', protect, authorize('Admin'), getUserById);
router.put('/:id', protect, authorize('Admin', 'Viewer'), updateUser);
router.delete('/:id', protect, authorize('Admin'), deleteUser);









export default router;