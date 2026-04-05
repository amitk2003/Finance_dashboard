import express from 'express';
import protect from '../middlewares/auth.js';
import authorize from '../middlewares/role.js';
import { createRecord, getRecords, deleteRecord } from '../controllers/recordController.js';


const router = express.Router();


router.post('/', protect, authorize('Analyst', 'Admin'), createRecord);
router.get('/', protect, authorize('Viewer', 'Analyst', 'Admin'), getRecords);
router.delete('/:id', protect, authorize('Analyst', 'Admin'), deleteRecord);

export default router;