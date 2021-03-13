import { Router } from 'express';
import OutOfTasksController from '../controllers/OutOfTasksController';

const outOfTasksRouter = Router();
const outOfTasksController = new OutOfTasksController();

outOfTasksRouter.post('/', outOfTasksController.create);

export default outOfTasksRouter;
