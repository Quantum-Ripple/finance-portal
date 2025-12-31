<template>
  <div class="p-4 md:p-6 space-y-6">
    <h1 class="text-3xl font-bold text-gray-700 mb-6">Fees by Category</h1>

   
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <p class="text-gray-500 font-medium mb-3">Fees Collected by Month</p>
      <apexchart
        v-if="monthChartData.series.length"
        type="bar"
        height="300"
        :options="monthChartData.options"
        :series="monthChartData.series"
      />
      <p v-else class="text-gray-400 text-center py-20">No data available</p>
    </div>

 
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <p class="text-gray-500 font-medium mb-3">Fees Collected by Class</p>
      <apexchart
        v-if="classChartData.series.length"
        type="pie"
        height="300"
        :options="classChartData.options"
        :series="classChartData.series"
      />
      <p v-else class="text-gray-400 text-center py-20">No data available</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ApexCharts from 'apexcharts'
import VueApexCharts from 'vue3-apexcharts'
import { feeByMonth, feeByClass } from '../../api/dashboard'

const monthChartData = ref({
  series: [],
  options: {
    chart: { id: 'fees-by-month' },
    xaxis: { categories: [] },
    colors: ['#34D399'], 
    dataLabels: { enabled: true, formatter: (val) => `Ksh. ${val.toLocaleString()}` }
  }
})

const classChartData = ref({
  series: [],
  options: {
    chart: { id: 'fees-by-class' },
    labels: [],
    colors: ['#3B82F6', '#FBBF24', '#EF4444', '#8B5CF6', '#10B981'], 
    legend: { position: 'bottom' }
  }
})

const fetchCharts = async () => {
  try {
    
    const monthData = await feeByMonth()
    if (monthData && monthData.length) {
      monthChartData.value.series = [{ name: 'Fees Collected', data: monthData.map(d => d.collected_amount) }]
      monthChartData.value.options.xaxis.categories = monthData.map(d => d.month_name)
    }

    const classData = await feeByClass()
    if (classData && classData.length) {
      classChartData.value.series = classData.map(d => d.collected_amount)
      classChartData.value.options.labels = classData.map(d => d.class_level)
    }
  } catch (error) {
    console.error('Error fetching category charts:', error)
  }
}

onMounted(() => {
  fetchCharts()
})
</script>

<script>
export default {
  components: { apexchart: VueApexCharts }
}
</script>

<style scoped>

</style>
