<script setup lang="ts">
import { colorGenerator } from '@/helpers/utils'
import type { ActivityTypeCount } from '@/models/activities'
import type { EChartsOption } from 'echarts'
import { PieChart } from 'echarts/charts'
import { LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, watch } from 'vue'
import VChart from 'vue-echarts'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const { data } = defineProps<{ data: ActivityTypeCount[] | null }>()
const option = ref<EChartsOption>({})

function renderChart() {
  if (!data) return
  option.value = {
    title: { show: false },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} counts',
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      data: data.map(activity => activity.activity),
    },
    color: data.map(() => colorGenerator()),
    series: [
      {
        name: 'Activities Overview',
        type: 'pie',
        radius: '80%',
        data: data.map((activity) => {
          return { value: activity.count, name: activity.activity }
        }),
        labelLine: { show: false },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
}

watch(
  () => data,
  () => {
    if (data) renderChart()
  },
)
</script>

<template>
  <figure
    class="figure card shadow-sm p-3 col-12 col-md-4"
    style="min-height: 400px"
  >
    <v-chart :option="option" style="min-height: 400px; min-width: 300px" autoresize />
    <figcaption class="figure-caption mt-5 text-center">Activities Overview</figcaption>
  </figure>
</template>
