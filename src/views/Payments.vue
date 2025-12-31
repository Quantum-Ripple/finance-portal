<template>
  <div class="p-6">
   
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Payments</h1>
      <button
        @click="goToRecordPayment"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Record Payment
      </button>
    </div>

   
    <div class="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name or amount"
        v-model="searchQuery"
        class="border rounded px-3 py-2 w-64"
      />

      <input
        type="date"
        v-model="filterDate"
        class="border rounded px-3 py-2"
      />

      <select v-model="filterMethod" class="border rounded px-3 py-2">
        <option value="">All Methods</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>
    </div>

 
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-left">Student</th>
            <th class="px-4 py-2 text-left">Amount</th>
            <th class="px-4 py-2 text-left">Payment Method</th>
            <th class="px-4 py-2 text-left">Date</th>
            <th class="px-4 py-2 text-left">Transaction Code</th>
            <th class="px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in filteredPayments"
            :key="payment.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ payment.full_name }}</td>
            <td class="px-4 py-2">{{ payment.amount }}</td>
            <td class="px-4 py-2">{{ payment.payment_method }}</td>
            <td class="px-4 py-2">{{ payment.date }}</td>
            <td class="px-4 py-2">{{ payment.transaction_code || '-' }}</td>
            <td class="px-4 py-2">
              <button
                @click="downloadPayment(payment.id)"
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Download Receipt
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    
    <div v-if="loading" class="text-center mt-4">Loading payments...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getPayments } from '../api/fee.js' 

const router = useRouter()

const payments = ref([])
const loading = ref(false)
const searchQuery = ref('')
const filterDate = ref('')
const filterMethod = ref('')


const fetchPayments = async () => {
  loading.value = true
  try {
    payments.value = await getPayments()
  } catch (error) {
    console.error('Error fetching payments:', error)
  } finally {
    loading.value = false
  }
}

const filteredPayments = computed(() => {
  return payments.value.filter((p) => {
    const matchesSearch =
      p.full_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.amount.toString().includes(searchQuery.value)
    const matchesDate = filterDate.value ? p.date === filterDate.value : true
    const matchesMethod = filterMethod.value
      ? p.payment_method === filterMethod.value
      : true
    return matchesSearch && matchesDate && matchesMethod
  })
})


const goToRecordPayment = () => {
  router.push('/payments/record')
}


const downloadPayment = (id) => {
  router.push({ name: 'PaymentDetails', params: {id}})
}

onMounted(fetchPayments)
</script>

<style scoped>

table td,
table th {
  height: 48px;
}
</style>
