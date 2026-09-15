<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { remult } from 'remult'
import { Task } from './shared/Task'

const taskRepo = remult.repo(Task)
const tasks = ref<Task[]>([])
const newTaskTitle = ref("")

// events {
const addTask = async () => {
  try {
    const newTask = await taskRepo.insert({
      title: newTaskTitle.value
    })
    tasks.value.push(newTask)
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

onMounted(async () => {
  const items = await taskRepo.find({
    limit: 20,
    orderBy: { createdAt: "asc" },
    //where: { completed: true }
  })
  tasks.value = items
})
// } events
</script>

<template>
  <div>
    <h1>todos</h1>
    <main>
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
      </div>
    </main>
  </div>
</template>