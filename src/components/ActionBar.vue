<script setup lang="ts">
import { camelToTitle } from '@/helpers/utils'
import { BarsArrowDownIcon, BarsArrowUpIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ref, watch } from 'vue'

/*<--------- EMIT/PROPS --------->*/

const emit = defineEmits<{
  (event: 'onSearchText', value: string): void
  (event: 'onClickSortBy'): void
  (event: 'onChangeSortWith', value: string): void
  (event: 'onFilterByDate', value: string): void
}>()

/*<--------- HANDLE SORTING --------->*/

const sortOptions = ['activity', 'description', 'timestamp']

const sortBy = ref<string>('asc')
function onClickSort() {
  sortBy.value = sortBy.value === 'asc' ? 'desc' : 'asc'
  emit('onClickSortBy')
}

const sortWith = ref<string>('activity')
watch(sortWith, () => {
  sortBy.value = 'asc'
  emit('onChangeSortWith', sortWith.value)
})

/*<--------- SEARCHING --------->*/

const search = ref<string>('')
watch(search, () => {
  searchText()
})

function searchText() {
  emit('onSearchText', search.value)
}

/*<--------- FILTER BY DATE --------->*/
const filterDate = ref('')
watch(
  () => filterDate.value,
  () => emit('onFilterByDate', filterDate.value),
)
</script>

<template>
  <div
    class="d-flex flex-column flex-md-row justify-content-between gap-4 align-items-center mb-3 w-100"
  >
    <button class="btn btn-primary" @click="$router.push(`/activities/add`)">
      Add New Activity
    </button>

    <div>
      <div class="input-group mb-3 border border-primary bg-white rounded-3">
        <input
          id="searchInput"
          type="text"
          class="form-control rounded-3 border-0 bg-transparent"
          v-model="search"
          placeholder="Search Activity..."
          aria-label="Search Input"
        />

        <button
          id="search--button"
          class="input-group-text bg-transparent border-0 text-primary cursor-pointer"
          @click="searchText"
          aria-label="Search Button"
        >
          <magnifying-glass-icon style="height: 1.25rem; width: 1.25rem" />
        </button>
      </div>

      <div>
        <div class="d-flex align-items-center gap-3 w-100">
          <label for="sortWith" class="text-nowrap mb-0">Sort By:</label>
          <select id="sortWith" v-model="sortWith" class="form-select border border-primary">
            <option value="" hidden>Sort by..</option>
            <template v-for="option in sortOptions" :key="option">
              <option v-if="option !== 'id'" :value="option">
                {{ camelToTitle(option) }}
              </option>
            </template>
          </select>

          <button
            class="btn text-primary border border-primary bg-white"
            @click="onClickSort"
            :class="{ disabled: !sortWith }"
            aria-label="Sort Button"
          >
            <bars-arrow-down-icon v-if="sortBy === 'asc'" style="height: 1.25rem; width: 1.25rem" />
            <bars-arrow-up-icon v-else style="height: 1.25rem; width: 1.25rem" />
          </button>
        </div>

        <div class="d-flex align-items-center gap-3 w-100 mt-3">
          <label for="filterDate" class="text-nowrap mb-0">Filter by Date:</label>
          <input
            id="filterDate"
            type="date"
            class="form-control border border-primary"
            v-model="filterDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#searchInput:focus {
  outline: none;
  box-shadow: none;
}
</style>
