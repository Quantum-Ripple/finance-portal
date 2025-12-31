<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-lg p-6">
      <h2 class="text-xl font-semibold mb-4">Generate Invoice</h2>

      <form @submit.prevent="submit">
       
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Student</label>
          <select v-model="form.student" required class="w-full border rounded px-3 py-2">
            <option value="">Select student</option>
            <option v-for="s in students" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>

     
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Term</label>
          <select v-model="form.term" required class="w-full border rounded px-3 py-2">
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>

       
        <div class="mb-4">
          <label class="block mb-1 text-sm font-medium">Amount</label>
          <input
            type="number"
            v-model="form.amount"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

       
        <div class="flex justify-end gap-3 mt-6">
          <button
            type="button"
            class="px-4 py-2 border rounded"
            @click="$emit('close')"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { createInvoice } from '../../api/fee'
import { getStudent } from '../../api/Students'

const emit = defineEmits(['close', 'created'])

const form = ref({
  student: '',
  term: '',
  amount: ''
})

const students = ref([])

onMounted(async () => {
  students.value = await getStudent()
})

const submit = async () => {
  await createInvoice({
    student: form.value.student,
    term: form.value.term,
    amount_due: form.value.amount
  })

  emit('created')
  emit('close')
}
</script>
