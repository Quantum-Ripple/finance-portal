<template>
  <div class="p-6 max-w-3xl mx-auto">
  
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold">Expense Details</h1>
      <button
        @click="$router.back()"
        class="text-sm bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Back
      </button>
    </div>

 
    <div v-if="loading" class="text-center text-gray-500 py-10">
      Loading expense...
    </div>

 
    <div v-else-if="error" class="text-red-600 bg-red-50 p-4 rounded">
      Failed to load expense.
    </div>

    <div v-else class="bg-white shadow rounded-lg p-6 space-y-4">
      <div>
        <p class="text-sm text-gray-500">Category</p>
        <p class="text-lg font-medium">{{ expense.expense_category }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Amount</p>
        <p class="text-lg font-medium">KES {{ expense.amount }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Date</p>
        <p class="text-lg font-medium">{{ expense.date }}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Description</p>
        <p class="text-base">{{ expense.description || '—' }}</p>
      </div>

      
      <div class="flex gap-3 mt-4">
        <button
          @click="openEditModal"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          @click="confirmDelete"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>

    
    <ExpenseModal
      v-if="showEditModal"
      :expense="expense"
      @close="showEditModal = false"
      @refresh="refreshExpense"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExpenseDetail, deleteExpense } from '../../api/expense'
import ExpenseModal from './ExpenseModal.vue'

const route = useRoute()
const router = useRouter()

const expense = ref({})
const loading = ref(true)
const error = ref(false)


const showEditModal = ref(false)

const fetchExpense = async () => {
  try {
    const id = route.params.id
    expense.value = await getExpenseDetail(id)
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const refreshExpense = async () => {
  await fetchExpense()
  showEditModal.value = false
}


const openEditModal = () => {
  showEditModal.value = true
}


const confirmDelete = async () => {
  if (confirm('Are you sure you want to delete this expense?')) {
    try {
      await deleteExpense(expense.value.id)
      router.push({ name: 'Expenditures' }) 
    } catch (err) {
      console.error(err)
      alert('Failed to delete expense')
    }
  }
}

onMounted(fetchExpense)
</script>
