// src/server/api.ts
import { remultApi } from 'remult/remult-express'
import { Task } from '../shared/Task.js'

export const api = remultApi({
    entities: [Task]
})