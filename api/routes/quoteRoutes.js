import express from 'express';
import { getQuote, updateQuote } from '../controllers/quoteController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getQuote);
router.put('/', auth, updateQuote);

export default router;
