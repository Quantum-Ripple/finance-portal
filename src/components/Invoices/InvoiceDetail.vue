<template>
  <div class="p-6 max-w-3xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Invoice Details</h1>

    <div class="bg-white shadow rounded p-4 mb-6">
      <h2 class="text-lg font-semibold mb-2">Invoice Summary</h2>
      <div class="grid grid-cols-2 gap-4">
        <div><strong>Student:</strong> {{ invoice.student_name }}</div>
        <div><strong>Class:</strong> {{ invoice.class_level }}</div>
        <div><strong>Term:</strong> {{ invoice.term }}</div>
        <div><strong>Year:</strong> {{ invoice.year }}</div>
        <div><strong>Amount Due:</strong> {{ invoice.amount_due }}</div>
        <div><strong>Amount Paid:</strong> {{ invoice.amount_paid }}</div>
        <div><strong>Balance:</strong> {{ invoice.amount_due - invoice.amount_paid }}</div>
        <div>
          <strong>Status:</strong>
          <span
            :class="invoice.is_fully_paid ? 'bg-green-100 text-green-700 px-2 py-1 rounded' : 'bg-yellow-100 text-yellow-700 px-2 py-1 rounded'"
          >
            {{ invoice.is_fully_paid ? 'Paid' : 'Pending' }}
          </span>
        </div>
      </div>
    </div>

   
    <div class="bg-white shadow rounded p-4 mb-6">
      <h2 class="text-lg font-semibold mb-2">Payments</h2>
      <table class="w-full border-collapse">
        <thead class="bg-gray-100 text-left">
          <tr>
            <th class="p-2">Date</th>
            <th class="p-2">Amount</th>
            <th class="p-2">Method</th>
            <th class="p-2">Transaction Code</th>
            <th class="p-2">Received By</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in invoice.payments" :key="payment.id" class="border-t">
            <td class="p-2">{{ payment.date }}</td>
            <td class="p-2">{{ payment.amount }}</td>
            <td class="p-2">{{ payment.method }}</td>
            <td class="p-2">{{ payment.transaction_code }}</td>
            <td class="p-2">{{ payment.received_by_name }}</td>
          </tr>
          <tr v-if="!invoice.payments.length">
            <td colspan="5" class="p-4 text-center text-gray-500">No payments recorded</td>
          </tr>
        </tbody>
      </table>
    </div>

  
    <div v-if="!invoice.is_fully_paid">
      <RecordPayment
        :invoice-id="invoice.id"
        @paymentRecorded="fetchInvoice"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getInvoiceById } from '../../api/fee'
import RecordPayment from './RecordPayment.vue'


const route = useRoute()
const router = useRouter()
const invoice = ref({
  student_name: '',
  class_level: '',
  term: '',
  year: '',
  amount_due: 0,
  amount_paid: 0,
  is_fully_paid: false,
  payments: []
})

const fetchInvoice = async () => {
  try {
    const data = await getInvoiceById(route.params.id)
    invoice.value = data
  } catch (err) {
    console.error(err)
    alert('Failed to load invoice')
    router.back()
  }
}

onMounted(fetchInvoice)
</script>
