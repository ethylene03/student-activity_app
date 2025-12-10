<script setup lang="ts">
import { deleteActivity, getActivities } from '@/api/activities'
import ActionBar from '@/components/ActionBar.vue'
import DataTable from '@/components/DataTable.vue'
import DeleteModal from '@/components/DeleteModal.vue'
import { debounce, isError } from '@/helpers/utils'
import type { Activity } from '@/models/activities'
import { Modal } from 'bootstrap'
import { onMounted, ref, watch } from 'vue'

onMounted(() => {
  document.title = 'Activities - Student Activity Tracker'
  fetchActivities()
  debouncedFetch.value = debounce(() => fetchActivities(), 500)
})

const isLoading = ref<boolean>(false)
const currentPage = ref<number>(0)
const totalPages = ref<number>(1)

const debouncedFetch = ref<(() => void) | null>(null)
const controller = ref<AbortController | null>(null)

const activities = ref<Activity[]>([] as Activity[])

async function fetchActivities(page: number = 0) {
  if (controller.value) controller.value.abort()
  controller.value = new AbortController()
  isLoading.value = true

  const response = await getActivities(
    {
      page: Math.max(0, page - 1).toString(),
      sort: `${sortWith.value},${sortAscending.value ? 'asc' : 'desc'}`,
      ...(filterDate.value ? { date: filterDate.value } : {}),
      ...(search.value ? { query: search.value } : {}),
    },
    controller.value?.signal,
  )

  if (isError(response)) {
    isLoading.value = false
    return
  }

  activities.value = response.content as Activity[]
  totalPages.value = response.totalPages
  currentPage.value = response.number + 1
  isLoading.value = false
}

const search = ref('')
watch(
  () => search.value,
  () => {
    debouncedFetch.value?.()
  },
)

const sortAscending = ref<boolean>(true)
const sortWith = ref<string>('activity')

watch(
  () => sortWith.value,
  () => {
    sortAscending.value = true
    fetchActivities(currentPage.value)
  },
)

watch(
  () => sortAscending.value,
  () => fetchActivities(currentPage.value),
)

const toDeleteId = ref('')
function showDeleteModal(id: string) {
  toDeleteId.value = id
  const modal = document.getElementById('modal--delete')
  if (modal) {
    const bootstrapModal = new Modal(modal)
    bootstrapModal.show()
  }
}

async function handleDeleteActivity() {
  if (toDeleteId.value === '') return

  isLoading.value = true
  await deleteActivity(toDeleteId.value)

  const modal = document.getElementById('modal--delete')
  if (modal) {
    const bootstrapModal = Modal.getInstance(modal)
    bootstrapModal?.hide()
  }

  toDeleteId.value = ''
  fetchActivities()
}

const filterDate = ref('')
watch(
  () => filterDate.value,
  () => fetchActivities(),
)
</script>

<template>
  <section id="activity-page" class="section">
    <h1>Activities</h1>
    <p class="lead">Browse, update, and create your activities here.</p>
    <ActionBar
      @on-change-sort-with="sortWith = $event"
      @on-search-text="search = $event"
      @on-click-sort-by="sortAscending = !sortAscending"
      @on-filter-by-date="filterDate = $event"
    />

    <DataTable
      :data="activities"
      :pages="totalPages"
      :isLoading="isLoading"
      :currentPage="currentPage"
      @on-change-page="fetchActivities($event)"
      @delete-item="showDeleteModal($event)"
    />

    <DeleteModal @delete="handleDeleteActivity" />
  </section>
</template>
