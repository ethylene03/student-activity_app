<script setup lang="ts">
import { updateActivity } from '@/api/activities'
import ActivityForm from '@/components/ActivityForm.vue'
import { isError } from '@/helpers/utils'
import type { Activity } from '@/models/activities'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  document.title = 'Edit Activity - Student Activity App'
})

const isLoading = ref<boolean>(false)
const error = ref<string>('')
const router = useRouter()
async function editActivity(activity: Activity) {
  isLoading.value = true

  const response = await updateActivity(activity)
  if (isError(response)) {
    error.value = response.error.join(', ')
    isLoading.value = false
    return
  }

  router.back()
}
</script>

<template>
  <section id="activity-add" class="section">
    <h1>Update Activity</h1>
    <p class="lead">Change the form details below to update activity.</p>
    <p class="text-danger">{{ error }}</p>

    <ActivityForm @submit-form="editActivity" />
  </section>
</template>
