import express from 'express';
import protect from '../middlewares/auth.js';
import authorize from '../middlewares/role.js';
import getSummary  from '../controllers/dashboardController.js';

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary (income, expenses, balance, categories, recent records)
 *     tags: [Dashboard]
 *     description: |
 *       Returns aggregated financial data including total income, total expenses,
 *       net balance, category-wise totals, and recent activity.
 *       Accessible by Viewer, Analyst, and Admin roles.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_income:
 *                   type: number
 *                   example: 4500
 *                 total_expenses:
 *                   type: number
 *                   example: 500
 *                 net_balance:
 *                   type: number
 *                   example: 4000
 *                 category_totals:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example:
 *                     Salary: 4500
 *                     Stationary: -500
 *                 recent_records:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "69d23267f7bed6f718d78e6c"
 *                       amount:
 *                         type: number
 *                         example: 4500
 *                       type:
 *                         type: string
 *                         enum: [income, expense]
 *                         example: income
 *                       category:
 *                         type: string
 *                         example: Salary
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-04-05T10:00:00.000Z"
 *                       notes:
 *                         type: string
 *                         example: April salary
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - User does not have required role
 */
const router = express.Router();
console.log({
  protect: typeof protect,
  authorize: typeof authorize,
  authorizeCall: typeof authorize('Viewer'),
  getSummary: typeof getSummary
});
router.get('/summary', protect, authorize('Viewer', 'Analyst', 'Admin'), getSummary);

export default router;