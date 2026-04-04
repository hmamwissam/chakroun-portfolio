import express from 'express';
import { getEducation, updateEducation } from '../controllers/educationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEducation);
router.put('/', auth, updateEducation);

export default router;
