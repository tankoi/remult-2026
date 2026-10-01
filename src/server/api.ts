// src/server/api.ts
import { remultApi } from 'remult/remult-express'
import { Task } from '../shared/Task.js'
import { TasksController } from '../shared/TasksController.js'
import { AuthController } from '../shared/AuthController.js'

export const api = remultApi({
    entities: [Task],
    admin: true, // Enable the Admin UI
    controllers: [TasksController, AuthController],
    getUser: (req) => req.session!['user'],
})