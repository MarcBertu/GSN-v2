import { Router } from 'express';
import { getAllContrats, getContrat, addContrat, modifyContrat, deleteContrat } from '../controllers/Contrats';

const router = Router();

router.get('/getAll', getAllContrats);

router.get('/getContrat', getContrat);

router.post('/addContrat', addContrat);

router.put('/modifyContrat', modifyContrat);

router.delete('/deleteContrat', deleteContrat);

export default router;