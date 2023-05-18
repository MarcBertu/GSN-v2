import { Router } from 'express';
import { login, register, unregister, checkEmail } from '../controllers/Credentials';

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.delete('/unregister', unregister);

router.post('/checkEmail', checkEmail);

export default router;