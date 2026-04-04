import express from 'express';
import { createMessage, getMessages, deleteMessage, markRead } from '../controllers/messageController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/', auth, getMessages);
router.put('/:id/read', auth, markRead);
router.delete('/:id', auth, deleteMessage);

export default router;
