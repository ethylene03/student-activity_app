<script setup lang="ts">
import { login } from '@/api/authorization'
import { isError } from '@/helpers/utils'
import type { StudentLogin } from '@/models/students'
import { useAuthorizationStore } from '@/stores/authorization'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const credentials = ref<StudentLogin>({
  email: '',
  password: '',
} as StudentLogin)

const errorMessage = ref<string>('')
const router = useRouter()

async function handleLogin() {
  const response = await login(credentials.value)

  if (isError(response)) {
    errorMessage.value = response.error.join(', ')
    return
  }

  const auth = useAuthorizationStore()
  auth.setStudentDetails(response)

  router.push({ name: 'Home' })
}
</script>

<template>
  <section id="login" class="login--container">
    <div class="card p-4 shadow" style="min-width: 22rem">
      <h2 class="card-title text-center mb-4">Log In</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter Email Address"
            v-model="credentials.email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter Password"
            v-model="credentials.password"
            required
          />
        </div>

        <div class="mb-3 text-danger" v-if="errorMessage">{{ errorMessage }}</div>
        <button type="submit" class="btn btn-primary w-100 mt-4">Log In</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.login--container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
