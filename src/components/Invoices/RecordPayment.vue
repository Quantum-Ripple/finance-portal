<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-xl font-semibold mb-4">Record Payment</h2>

      <div class="mb-4 p-3 bg-gray-50 rounded" v-if="invoice">
        <p><strong>Student:</strong> {{ invoice.student_name }}</p>
        <p><strong>Amount Due:</strong> {{ invoice.amount_due }}</p>
        <p><strong>Amount Paid:</strong> {{ invoice.amount_paid }}</p>
        <p><strong>Balance:</strong> {{ invoice.amount_due - invoice.amount_paid }}</p>
      </div>

      <form @submit.prevent="submitPayment" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            v-model.number="paymentAmount"
            placeholder="Enter payment amount"
            class="border rounded px-3 py-2 w-full"
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Payment Method</label>
          <select v-model="paymentMethod" class="border rounded px-3 py-2 w-full" required>
            <option value="">Select a method</option>
            <option v-for="(label, key) in PAYMENT_METHODS" :key="key" :value="key">
              {{ label }}
            </option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-medium">Transaction Code (optional)</label>
          <input
            type="text"
            v-model="transactionCode"
            placeholder="Enter transaction code"
            class="border rounded px-3 py-2 w-full"
          />
        </div>

        <div class="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            @click="cancel"
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Record Payment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { recordPayment, getInvoiceById } from '../../api/fee'

const props = defineProps({
  invoiceId: { type: Number, required: true },
  standalone: { type: Boolean, default: false } // If true, modal is full page
})

const emit = defineEmits(['close', 'paymentRecorded'])

const router = useRouter()

const PAYMENT_METHODS = {
  cash: 'Cash',
  mpesa: 'Mpesa',
  bank: 'Bank Transfer',
  cheque: 'Cheque'
}

const invoice = ref(null)
const paymentAmount = ref('')
const paymentMethod = ref('')
const transactionCode = ref('')

const loadInvoice = async () => {
  if (props.invoiceId) {
    invoice.value = await getInvoiceById(props.invoiceId)
  }
}

watch(() => props.invoiceId, loadInvoice, { immediate: true })

const cancel = () => {
  if (props.standalone) {
    router.push({ name: 'InvoiceList' }) // Return to list
  } else {
    emit('close') // Close modal
  }
}

const submitPayment = async () => {
  if (!paymentAmount.value || paymentAmount.value <= 0) {
    alert('Amount must be greater than 0')
    return
  }
  if (!paymentMethod.value) {
    alert('Please select a payment method')
    return
  }

  const payload = {
    invoice: props.invoiceId,
    amount: paymentAmount.value,
    method: paymentMethod.value,
    transaction_code: transactionCode.value || ''
  }

  try {
    await recordPayment(payload)
    emit('paymentRecorded')
    emit('close')
    alert('Payment recorded successfully')
  } catch (err) {
    console.error(err)
    alert('Failed to record payment')
  }
}
</script>
