<script setup lang="ts">
import { formatDate } from '@/helpers/utils'
import type { DailyActivityCount } from '@/models/activities'
import type { EChartsOption } from 'echarts'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, watch } from 'vue'
import VChart from 'vue-echarts'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const { data } = defineProps<{ data: DailyActivityCount[] | null }>()
const option = ref<EChartsOption>({})

function renderChart() {
  if (!data) return

  option.value = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} : {c} counts',
    },
    xAxis: {
      type: 'category',
      data: data.map((activity) => formatDate(activity.date)),
    },
    yAxis: {
      type: 'value',
    },
    legend: {
      show: true,
      orient: 'horizontal',
      bottom: 0,
    },
    series: [
      {
        data: data.map((activity) => activity.count),
        type: 'line',
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
    class="figure card shadow-sm p-3"
    style="min-height: 400px"
  >
    <v-chart :option="option" style="min-height: 300px" autoresize />
    <figcaption class="figure-caption mt-5 text-center">Daily Activities Overview</figcaption>
  </figure>
</template>
