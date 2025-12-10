<script lang="ts" setup>
import { signup } from '@/api/authorization'
import { isError } from '@/helpers/utils'
import type { StudentSignUp } from '@/models/students'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const credentials = ref<StudentSignUp>({} as StudentSignUp)

const errorMessage = ref<string>('')
const router = useRouter()

async function handleSignUp() {
  const response = await signup(credentials.value)

  if (isError(response)) {
    errorMessage.value = response.error.join(', ')
    return
  }

  router.push({ name: 'Login' })
}
</script>

<template>
  <section id="signup" class="signup--container">
    <div class="card p-4 shadow mx-3" style="max-width: 25rem">
      <h2 class="card-title text-center mb-4">Sign Up</h2>

      <form @submit.prevent="handleSignUp">
        <div class="mb-3 row gap-3 gap-md-0">
          <div class="col-12 col-md-6">
            <label for="firstName" class="form-label">
              First Name
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              placeholder="Enter First Name"
              v-model="credentials.firstName"
              required
            />
          </div>

          <div class="col-12 col-md-6">
            <label for="lastName" class="form-label">
              Last Name
              <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              v-model="credentials.lastName"
              required
            />
          </div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">
            Email
            <span class="text-danger">*</span>
          </label>
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
          <label for="password" class="form-label">
            Password
            <span class="text-danger">*</span>
          </label>
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
        <button type="submit" class="btn btn-primary w-100 mt-4">Sign Up</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
.signup--container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
</style>
