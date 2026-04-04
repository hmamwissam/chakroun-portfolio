import express from 'express';
import { getTraining, updateTraining } from '../controllers/trainingController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTraining);
router.put('/', auth, updateTraining);

export default router;
