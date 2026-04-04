import express from 'express';
import { getHero, updateHero } from '../controllers/heroController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getHero);
router.put('/', auth, updateHero);

export default router;
