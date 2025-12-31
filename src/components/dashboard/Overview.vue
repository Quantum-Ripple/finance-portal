<template>
  <div class="p-4 md:p-6 bg-gray-50 rounded-lg shadow-sm">
    <h1 class="text-3xl font-bold mb-6 text-gray-700">Dashboard Overview</h1>

    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
     
      <div class="bg-green-100 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <p class="text-green-800 font-medium text-sm mb-2">Fees Collected</p>
        <p class="text-2xl font-bold text-green-900">Ksh. {{ overviewData.fees_collected.toLocaleString() }}</p>
      </div>

     
      <div class="bg-red-100 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <p class="text-red-800 font-medium text-sm mb-2">Outstanding Balances</p>
        <p class="text-2xl font-bold text-red-900">Ksh. {{ overviewData.outstanding_balances.toLocaleString() }}</p>
      </div>

     
      <div class="bg-blue-100 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <p class="text-blue-800 font-medium text-sm mb-2">Expected Fees</p>
        <p class="text-2xl font-bold text-blue-900">Ksh. {{ overviewData.expected_fees.toLocaleString() }}</p>
      </div>

    
      <div class="bg-yellow-100 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <p class="text-yellow-800 font-medium text-sm mb-2">Expenditure</p>
        <p class="text-2xl font-bold text-yellow-900">Ksh. {{ overviewData.expenditure.toLocaleString() }}</p>
      </div>


      <div class="bg-purple-100 p-5 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
        <p class="text-purple-800 font-medium text-sm mb-2">Net Balance</p>
        <p class="text-2xl font-bold text-purple-900">Ksh. {{ overviewData.net_balance.toLocaleString() }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { overview } from '../../api/dashboard.js'

const overviewData = ref({
  fees_collected: 0,
  outstanding_balances: 0,
  expected_fees: 0,
  expenditure: 0,
  net_balance: 0
})

const fetchOverview = async () => {
  try {
    const data = await overview()
    overviewData.value = data
  } catch (error) {
    console.error('Error fetching dashboard overview:', error)
  }
}

onMounted(() => {
  fetchOverview()
})
</script>
