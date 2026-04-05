import express from 'express';
import protect from '../middlewares/auth.js';
import authorize from '../middlewares/role.js';
import getSummary  from '../controllers/dashboardController.js';


const router = express.Router();
console.log({
  protect: typeof protect,
  authorize: typeof authorize,
  authorizeCall: typeof authorize('Viewer'),
  getSummary: typeof getSummary
});
router.get('/summary', protect, authorize('Viewer', 'Analyst', 'Admin'), getSummary);

export default router;