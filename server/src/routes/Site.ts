import { Router } from 'express';
import { addSite, deleteSite } from '../controllers/Site';

const router = Router();

router.post("/addSite", addSite);
router.delete("/deleteSite", deleteSite);

export default router;