<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { remult } from 'remult'
import { Task } from './shared/Task'

const taskRepo = remult.repo(Task)
const tasks = ref<Task[]>([])

onMounted(async () => {
  const items = await taskRepo.find({
    limit: 20,
    orderBy: { createdAt: "asc" },
    //where: { completed: true }
  })
  tasks.value = items
})
</script>

<template>
  <div>
    <h1>todos</h1>
    <main>
      <div v-for="task in tasks">
        <input type="checkbox" v-model="task.completed" />
        {{ task.title }}
      </div>
    </main>
  </div>
</template>