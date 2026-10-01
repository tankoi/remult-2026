// src/Auth.vue

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { remult } from 'remult'
import App from './App.vue'
import { AuthController } from './shared/AuthController'

const username = ref('')
const signedIn = ref(false)

const signIn = async () => {
  try {
    remult.user = await AuthController.signIn(username.value)
    signedIn.value = true
    username.value = ''
  } catch (error: unknown) {
    alert((error as { message: string }).message)
  }
}
const signOut = async () => {
  await AuthController.signOut()
  remult.user = undefined
  signedIn.value = false
}

onMounted(async () => {
  await remult.initUser()
  signedIn.value = remult.authenticated()
})
</script>
<template>
  <div v-if="!signedIn">
    <h1>todos</h1>
    <main>
      <form @submit.prevent="signIn()">
        <input
          v-model="username"
          placeholder="Username, try Alex or Jane"
        />
        <button>Sign in</button>
      </form>
    </main>
  </div>
  <div v-else>
    <header>
      Hello {{ remult.user!.name }}
      <button @click="signOut()">Sign Out</button>
    </header>
    <App />
  </div>
</template>