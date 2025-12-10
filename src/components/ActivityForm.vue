<script setup lang="ts">
import { getActivity } from '@/api/activities'
import { isError } from '@/helpers/utils'
import type { Activity } from '@/models/activities'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
onMounted(() => {
  if(route.params.id)
    fetchActivity()
})

const activity = ref<Activity>({
  activity: '',
  description: '',
  timestamp: new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Manila' }).slice(0, -3),
} as Activity)
async function fetchActivity() {
  const id = route.params.id as string
  const response = await getActivity(id)
  if (isError(response)) return

  activity.value = response
}

const emit = defineEmits<{ (e: 'submitForm', activity: Activity): void }>()
function onSubmit() {
  emit('submitForm', activity.value)
}
</script>

<template>
  <form class="card p-5 shadow-sm w-100" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="activity" class="form-label">
        Activity Name
        <span class="text-danger">*</span>
      </label>
      <input type="text" class="form-control" id="activity" v-model="activity.activity" required />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        class="form-control"
        id="description"
        rows="3"
        v-model="activity.description"
      ></textarea>
    </div>

    <div class="mb-3">
      <label for="timestamp" class="form-label">Date & Time</label>
      <input
        type="datetime-local"
        class="form-control"
        id="timestamp"
        v-model="activity.timestamp"
        required
      />
    </div>

    <div class="mt-4 d-flex flex-column flex-md-row gap-4">
      <button type="button" class="btn btn-outline-danger flex-fill" @click="$router.back()">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary flex-fill">
        {{ activity.id ? 'Update Activity' : 'Add Activity' }}
      </button>
    </div>
  </form>
</template>
