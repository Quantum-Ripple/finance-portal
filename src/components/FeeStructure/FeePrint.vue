<template>
  <div v-if="fee" class="max-w-4xl mx-auto p-6">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold">{{ fee.school_name || 'Unknown School' }}</h1>
      <p class="text-gray-600">
        Fee Structure for {{ fee.class_level }} - {{ fee.term }} {{ fee.year }}
      </p>
    </div>

    <div class="bg-white border rounded-lg p-6 space-y-4">
      <div class="grid grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500">Class Level</p>
          <p class="font-medium text-lg">{{ fee.class_level }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Term</p>
          <p class="font-medium text-lg">{{ fee.term }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Academic Year</p>
          <p class="font-medium text-lg">{{ fee.year }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Amount</p>
          <p class="font-medium text-lg text-green-700">
            {{ formatCurrency(fee.amount) }}
          </p>
        </div>
      </div>

      <div class="mt-6">
        <p class="text-gray-700">
          Generated on: {{ new Date().toLocaleDateString() }}
        </p>
        <p class="text-gray-700">
          Approved by: _______________________
        </p>
      </div>
    </div>

    <div class="flex justify-center mt-8">
      <button
        @click="printPage"
        class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download
      </button>
    </div>
  </div>

  <div v-else class="text-center text-gray-500 mt-10">
    Loading fee details...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getFeeById } from '../../api/fee' 


const fee = ref(null)
const route = useRoute()


const fetchFee = async () => {
  try {
    const response = await getFeeById(route.params.id)
    fee.value = response
  } catch (error) {
    console.error('Failed to fetch fee:', error)
  }
}

onMounted(fetchFee)


const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount)

const printPage = () => {
  window.print()
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #app, #app * {
    visibility: visible;
  }
  #app {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
