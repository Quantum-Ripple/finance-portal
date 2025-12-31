<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div class="bg-white w-full max-w-lg rounded-lg p-6 relative shadow-xl">
      
     
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-black"
        @click="$emit('close')"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-6">
        {{ isEdit ? 'Edit Expense' : 'Add New Expense' }}
      </h2>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Category</label>
          <select
            v-model="form.expense_category"
            class="w-full border rounded px-3 py-2"
          >
            <option disabled value="">Select category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            v-model="form.amount"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            v-model="form.date"
            class="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
      </div>

      <div class="mt-6 flex justify-end gap-3">
        <button
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          @click="submit"
        >
          {{ isEdit ? 'Update' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { createExpense, updateExpense } from '../../api/expense'

const props = defineProps({
  expense: Object
})

const emit = defineEmits(['close', 'refresh'])

const isEdit = ref(false)
const form = ref({
  expense_category: '',
  amount: '',
  date: '',
  description: ''
})

const categories = ['Utilities', 'Salary', 'Maintenance', 'Miscellaneous']

watch(
  () => props.expense,
  (val) => {
    if (val && Object.keys(val).length) {
      isEdit.value = true
      form.value = { ...val }
    } else {
      isEdit.value = false
      form.value = {
        expense_category: '',
        amount: '',
        date: '',
        description: ''
      }
    }
  },
  { immediate: true }
)

const submit = async () => {
  try {
    isEdit.value
      ? await updateExpense(form.value.id, form.value)
      : await createExpense(form.value)

    emit('refresh')
    emit('close')
  } catch (err) {
    alert('Failed to save expense')
  }
}
</script>
