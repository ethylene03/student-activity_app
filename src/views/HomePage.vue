<script setup lang="ts">
import { getDashboardStats } from '@/api/students'
import LineChart from '@/components/LineChart.vue'
import PieChart from '@/components/PieChart.vue'
import { isError } from '@/helpers/utils'
import type { DashboardStats } from '@/models/activities'
import { useAuthorizationStore } from '@/stores/authorization'
import { onMounted, ref } from 'vue'

onMounted(() => {
  document.title = 'Home - Student Activity Tracker'
  fetchDashboardStats()
})

const auth = useAuthorizationStore()
const stats = ref<DashboardStats>({} as DashboardStats)
async function fetchDashboardStats() {
  const response = await getDashboardStats()
  if (isError(response)) return
  stats.value = response
}
</script>

<template>
  <section id="home-page" class="section">
    <h1>Welcome, {{ auth.firstName }}!</h1>
    <p class="lead">View your summary of activities here.</p>

    <div class="mt-4 row w-100">
      <div class="col-12 col-md-8 p-0 pe-md-3 d-flex flex-column gap-3">
        <!-- cards -->
        <div class="d-flex flex-column flex-md-row gap-3">
          <div class="card p-3 shadow-sm text-center flex-fill">
            <h5 class="card-title">Total Activities</h5>
            <p class="card-text text-primary display-6">{{ stats.totalCount }}</p>
          </div>
          <div class="card p-3 shadow-sm text-center flex-fill">
            <h5 class="card-title">Average Daily Activities</h5>
            <p class="card-text text-primary display-6">{{ stats.dailyAverage }}</p>
          </div>
          <div class="card p-3 shadow-sm text-center flex-fill">
            <h5 class="card-title">Activities Today</h5>
            <p class="card-text text-primary display-6">{{ stats.todayCount }}</p>
          </div>
        </div>

        <!-- line chart -->
        <LineChart :data="stats.countPerDay" />
      </div>

      <!-- pie chart -->
      <PieChart :data="stats.countPerActivity" />
    </div>
  </section>
</template>
