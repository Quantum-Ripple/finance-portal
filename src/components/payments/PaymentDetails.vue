<template>
  <div class="p-4 md:p-6">
    <h1 class="text-2xl font-semibold mb-6">Payment Details</h1>

    <button
      class="mb-4 text-blue-600 hover:underline"
      @click="$router.push({ name: 'Payments'})"
    >
      &larr; Back to Payments
    </button>

   
    <section class="mb-6 p-4 border rounded shadow-sm bg-white">
      <h2 class="text-xl font-medium mb-4">Payment Details</h2>
      <p><strong>School:</strong> {{ school.name }}</p>
      <p><strong>Student:</strong> {{ payment.student_name }}</p>
      <p><strong>Date:</strong> {{ payment.date }}</p>
      <p><strong>Amount:</strong> {{ payment.amount }}</p>
      <p><strong>Method:</strong> {{ payment.method_display }}</p>
      <p><strong>Received By:</strong> {{ payment.received_by }}</p>

      <button
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        @click="downloadReceipt"
      >
        Download Receipt
      </button>
    </section>

   
    <section v-if="invoice" class="p-4 border rounded shadow-sm bg-white">
      <h2 class="text-xl font-medium mb-4">Invoice Details</h2>
      <p><strong>School:</strong> {{ school.name }}</p>
      <p><strong>Invoice ID:</strong> {{ invoice.id }}</p>
      <p><strong>Student:</strong> {{ invoice.student_name }}</p>
      <p><strong>Amount Due:</strong> {{ invoice.amount_due }}</p>
      <p><strong>Amount Paid:</strong> {{ invoice.amount_paid }}</p>
      <p><strong>Fully Paid:</strong> {{ invoice.is_fully_paid ? 'Yes' : 'No' }}</p>
      <p><strong>Created At:</strong> {{ formatDate(invoice.created_at) }}</p>

      <h3 class="font-medium mt-4">Payments</h3>
      <ul class="list-disc pl-5">
        <li v-for="p in invoice.payments" :key="p.id">
          {{ formatDate(p.date) }} - {{ p.amount }} via {{ p.method_display }}
          <span v-if="p.transaction_code"> (Txn: {{ p.transaction_code }})</span>
        </li>
      </ul>

      <button
        class="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        @click="downloadInvoice"
      >
        Download Invoice
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPaymentById, getInvoiceById } from '../../api/fee'
import { getSchoolDetails } from '../../api/event'
import jsPDF from 'jspdf'

const route = useRoute()
const paymentId = route.params.id

const payment = ref({})
const invoice = ref(null)
const school = ref({})


const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB')
}


const fetchData = async () => {
  try {
    payment.value = await getPaymentById(paymentId)

    if (payment.value.invoice) {
      invoice.value = await getInvoiceById(payment.value.invoice)
    }

   
    const schoolId = payment.value.school || (invoice.value ? invoice.value.school : null)
    if (schoolId) {
      school.value = await getSchoolDetails(schoolId)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}


const downloadReceipt = () => {
  const doc = new jsPDF()
  
 
  doc.setFillColor(54, 162, 235) 
  doc.rect(0, 0, 210, 30, 'F')
  
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('Payment Receipt', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`School: ${school.value.name}`, 20, 45)
  doc.text(`Reg No: ${school.value.registration_number}`, 20, 55)
  doc.text(`Address: ${school.value.address}, ${school.value.city}`, 20, 65)
  doc.text(`Phone: ${school.value.phone}`, 20, 75)
  doc.text(`Email: ${school.value.email}`, 20, 85)
  
  doc.text(`Payment ID: ${payment.value.id}`, 20, 100)
  doc.text(`Student: ${payment.value.student_name}`, 20, 110)
  doc.text(`Date: ${formatDate(payment.value.date)}`, 20, 120)
  doc.text(`Amount: ${payment.value.amount}`, 20, 130)
  doc.text(`Method: ${payment.value.method_display}`, 20, 140)
  doc.text(`Received By: ${payment.value.received_by}`, 20, 150)
  
  doc.save(`Receipt_Payment_${payment.value.id}.pdf`)
}


const downloadInvoice = () => {
  if (!invoice.value) return
  const doc = new jsPDF()
  

  doc.setFillColor(75, 192, 192) 
  doc.rect(0, 0, 210, 30, 'F')
  
  doc.setFontSize(18)
  doc.setTextColor(255, 255, 255)
  doc.text('Invoice', 105, 20, { align: 'center' })
  
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`School: ${school.value.name}`, 20, 45)
  doc.text(`Reg No: ${school.value.registration_number}`, 20, 55)
  doc.text(`Address: ${school.value.address}, ${school.value.city}`, 20, 65)
  doc.text(`Phone: ${school.value.phone}`, 20, 75)
  doc.text(`Email: ${school.value.email}`, 20, 85)
  
  doc.text(`Invoice ID: ${invoice.value.id}`, 20, 100)
  doc.text(`Student: ${invoice.value.student_name}`, 20, 110)
  doc.text(`Amount Due: ${invoice.value.amount_due}`, 20, 120)
  doc.text(`Amount Paid: ${invoice.value.amount_paid}`, 20, 130)
  doc.text(`Fully Paid: ${invoice.value.is_fully_paid ? 'Yes' : 'No'}`, 20, 140)
  doc.text(`Created At: ${formatDate(invoice.value.created_at)}`, 20, 150)
  
  doc.text('Payments:', 20, 165)
  let y = 175
  invoice.value.payments.forEach((p) => {
    doc.text(
      `- ${formatDate(p.date)}: ${p.amount} via ${p.method_display}${p.transaction_code ? ` (Txn: ${p.transaction_code})` : ''}`,
      20,
      y
    )
    y += 10
  })

  doc.save(`Invoice_${invoice.value.id}.pdf`)
}

onMounted(fetchData)
</script>

<style scoped>
section {
  margin-bottom: 1.5rem;
}
</style>
