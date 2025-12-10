<script setup lang="ts">
import { createActivity } from '@/api/activities'
import ActivityForm from '@/components/ActivityForm.vue'
import { isError } from '@/helpers/utils'
import type { Activity } from '@/models/activities'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  document.title = 'Add Activity - Student Activity Tracker'
})

const isLoading = ref<boolean>(false)
const error = ref<string>('')
const router = useRouter()
async function addActivity(activity: Activity) {
  isLoading.value = true

  const response = await createActivity(activity)
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
    <h1>Add New Activity</h1>
    <p class="lead">Fill out the form below to add a new activity.</p>
    <p class="text-danger">{{ error }}</p>

    <ActivityForm @submit-form="addActivity" />
  </section>
</template>
