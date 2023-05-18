import { Router } from 'express';
import { addSite, deleteSite, getAllSite } from '../controllers/Site';

const router = Router();

router.get("/getAll", getAllSite); 
router.post("/addSite", addSite);
router.delete("/deleteSite", deleteSite);

export default router;