import { Router } from 'express';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get('/', tasksController.list);
tasksRouter.get('/:task_id', tasksController.index);
tasksRouter.post('/', tasksController.create);
tasksRouter.put('/:task_id', tasksController.update);

export default tasksRouter;
