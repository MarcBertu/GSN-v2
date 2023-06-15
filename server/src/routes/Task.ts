import { Router } from 'express';
import { getAllTasks, addTask, deleteTask } from '../controllers/Task';

const router = Router();

router.post('/getAll', getAllTasks);

router.post('/addTask', addTask);

router.delete('/deleteTask', deleteTask);

export default router;