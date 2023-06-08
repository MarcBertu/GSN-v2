import { Router } from 'express';
import { sendEmail, emailIsVerified } from '../controllers/Mail';

const router = Router();

router.post('/sendEmail', sendEmail);

router.post('/emailVerified', emailIsVerified);

export default router;