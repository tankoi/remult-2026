<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { remult } from 'remult'
import { Task } from './shared/Task'
import { TasksController } from './shared/TasksController'

const taskRepo = remult.repo(Task)
const tasks = ref<Task[]>([])
const newTaskTitle = ref("")

// events {
const addTask = async () => {
  try {
    const newTask = await taskRepo.insert({
      title: newTaskTitle.value
    })
    //tasks.value.push(newTask) <-- this line is no longer needed
    newTaskTitle.value = ""
  }
  catch (error: unknown) {
    alert((error as {message: string}).message)
  }
}

const saveTask = async (task: Task) => {
  try {
    await taskRepo.save(task)
  } catch (error: unknown) {
    alert((error as { message: string}).message)    
  }
}

const deleteTask = async (task: Task) => {
  try {
    await taskRepo.delete(task)
    //tasks.value = tasks.value.filter((t) => task !== t); <-- this line is no longer needed
  } catch (error: unknown) {
    alert((error as { message: string}).message)    
  }
}

const setAllCompleted = async (completed: boolean) => {
  await TasksController.setAllCompleted(completed)
}

onMounted(() =>
  onUnmounted(
    taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { createdAt: "asc" }
        //where: { completed: true },
      })
      .subscribe(info => (tasks.value = info.applyChanges(tasks.value)))
  )
)
// } events
</script>

<template>
  <div>
    <h1>todos</h1>
    <main>
      <div>
        <button @click="setAllCompleted(true)">Set All as Completed</button>
        <button @click="setAllCompleted(false)"> Set All as Uncompleted</button>
      </div>
      <form @submit.prevent="addTask">
        <input
          v-model="newTaskTitle"
          placeholder="What needs to be done"
        />
        <button>Add</button>
      </form>
      <div v-for="task in tasks">
        <input 
          type="checkbox" 
          v-model="task.completed" 
          @change="saveTask(task)"
        />
        <input v-model="task.title">
        <button @click="saveTask(task)">Save</button>
        <button @click="deleteTask(task)">Delete</button>
      </div>
    </main>
  </div>
</template>