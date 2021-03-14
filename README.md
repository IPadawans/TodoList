# TodoList
# Backend
* When you pull the application, run `yarn` on directory of project
* For backend of application, is necessary postgres on you environment, runing at port 5432, and a database named `todolistsaipos`.
* Run migrations with command `yarn typeorm:migration run`
* Follow the `.env.example` file to create a file named `.env`, in that file, fill the informations to correctly run application
* Run application with command `yarn dev:server`
* Available routes:
 ## /tasks
 * * GET -> Inform on URL param, ID of wished task
 * * GET -> List all tasks if non informed status param, otherwise, list all tasks with informed status
 * * UPDATE -> Inform, in URL after action, the ID of task to have status updated. In body params, inform new "status" and, if going back to status TODO, the "password" of supervisor
 * * POST -> Inform, in body params: "name", "email", "description" to create a task
 
 ## /outOfTasks
 * * POST -> Inform "name" and "email" on body params, to create 3 random tasks with description consulted on API Cat Facts

 # Frontend
 * Made in ReactJS
 * After pull, run `yarn` on directory of project
 * Then, just type `yarn start` on terminal (on directory of frontend), that your application will begin at port 3000
 * For correctly working, be sure that backend is running on port 3333
 
