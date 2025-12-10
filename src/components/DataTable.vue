<script setup lang="ts">
import { camelToTitle, formatDate } from '@/helpers/utils'
import type { Activity } from '@/models/activities'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NoData from './NoData.vue'
import TablePagination from './TablePagination.vue'

const dataLoaded = ref<boolean>(false)
onMounted(() => {
  window.setTimeout(() => {
    dataLoaded.value = true
  }, 300)
})

const { data, pages, isLoading, currentPage } = defineProps<{
  data: Array<Activity>
  pages: number
  isLoading: boolean
  currentPage: number
}>()

const emit = defineEmits<{
  (event: 'deleteItem', value: string): void
  (event: 'onChangePage', value: number): void
}>()
const router = useRouter()

function handleAction(item: Activity, action: string) {
  if (action === 'delete') {
    emit('deleteItem', item.id)
  } else {
    router.push({
      path: `/activities/${item.id}/${action}`,
    })
  }
}
</script>

<template>
  <section
    id="table"
    class="w-100 my-3 table-responsive d-flex flex-column justify-content-between rounded-3 bg-white"
    style="min-height: 400px"
  >
    <data-spinner v-if="isLoading || !dataLoaded" />
    <NoData v-else-if="!isLoading && dataLoaded && data.length === 0" message="No activities yet." />
    <div v-else style="overflow-y: auto">
      <table class="table table-striped table-hover table-borderless">
        <thead>
          <tr>
            <th scope="col" class="py-3 px-4 col-1 text-center">#</th>
            <template v-for="(_, key) in data[0]" :key="key">
              <th scope="col" v-if="key !== 'id'" class="col-3 text-capitalize py-3 px-4">
                {{ camelToTitle(key) }}
              </th>
            </template>
            <th scope="col" class="col-2 text-capitalize py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td class="text-center">
              {{ 8 * (currentPage - 1) + index + 1 }}
            </td>
            <template v-for="(value, key) in item" :key="value">
              <td v-if="key !== 'id'" class="px-4">
                {{ key === 'timestamp' ? formatDate(value) : value }}
              </td>
            </template>
            <td class="text-center px-4">
              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-sm btn-outline-primary me-3 px-4"
                  @click="handleAction(item, 'edit')"
                >
                  Edit
                </button>
                <button
                  class="btn btn-sm btn-outline-danger px-3"
                  @click="handleAction(item, 'delete')"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <TablePagination
      v-if="!isLoading && dataLoaded"
      :pages="pages"
      :current="currentPage"
      @on-change-page="(e: number) => $emit('onChangePage', e)"
    />
  </section>
</template>
