import express from 'express';
import { getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getExperience);
router.post('/', auth, createExperience);
router.put('/:id', auth, updateExperience);
router.delete('/:id', auth, deleteExperience);

export default router;
