import { Router } from 'express';
import { getAllTasks, addTask } from '../controllers/Task';

const router = Router();

router.get('/getAll', getAllTasks);

router.post('/addTask', addTask);

export default router;