import { Router } from 'express';
import { login, register, validateToken } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/validateToken', validateToken);

export default router;