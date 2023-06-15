import { Router } from 'express';
import { login, register, unregister, checkEmail, getAllUsers, allowUser } from '../controllers/Credentials';

const router = Router();

router.get('/all', getAllUsers);

router.post('/login', login);

router.post('/register', register);

router.delete('/unregister', unregister);

router.post('/checkEmail', checkEmail);

router.post('/allow', allowUser);

export default router;