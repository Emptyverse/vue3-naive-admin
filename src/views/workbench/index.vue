<template>
  <div class="chart-container">
    <MyEchart :options="option1" class="chart"></MyEchart>
    <MyEchart :options="option2" class="chart"></MyEchart>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import MyEchart from '@/components/echarts/MyEchart.vue'
// TODO: 此处引入api

// const data = ref([])
// 首先需要引入api
// onMounted(async () => {
//   try {
//     const response = await axios.get('your_api_endpoint')
//     // 这里假设 API 返回的数据是一个数组
//     if (response.data && Array.isArray(response.data)) {
//       data.value = response.data
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// })
const option1 = reactive({
  title: {
    text: '内容更新统计',
    subtext: 'Content update statistics',
    left: 'left',
  },
  yAxis: {
    // 将原先的 xAxis 改为 yAxis
    data: ['A', 'B', 'C', 'D', 'E'],
  },
  xAxis: {}, // 将原先的 yAxis 改为 xAxis
  series: [
    {
      type: 'bar',
      data: [10, 22, 28, 43, 49],
      barWidth: '40%',
    },
  ],
})

const option2 = reactive({
  title: {
    text: '内容更新统计',
    subtext: 'Content update statistics',
    left: 'right',
  },
  tooltip: {
    trigger: 'item',
  },

  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '70%',
      // 直接在data中调用 data.value
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
</script>

<style scoped>
.chart-container {
  display: flex;
  padding: 10px;
}

.chart {
  flex: 1;
  height: 300px;
  margin-right: 10px;
}
</style>
