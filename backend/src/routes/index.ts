import { Router } from 'express';
import tasksRouter from './tasks.routes';
import outOfTasksRouter from './outoftasks.routes';

const routes = Router();

routes.use('/tasks', tasksRouter);
routes.use('/outOfTasks', outOfTasksRouter);

export default routes;
