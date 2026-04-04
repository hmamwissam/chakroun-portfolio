import express from 'express';
import { getContactInfo, updateContactInfo } from '../controllers/contactController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContactInfo);
router.put('/', auth, updateContactInfo);

export default router;
