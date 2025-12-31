<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Create Fee Structure</h1>
      <button @click="goBack" class="text-gray-600 hover:text-gray-800">
        ← Back
      </button>
    </div>

    <div class="bg-white shadow rounded-lg p-6 space-y-6">
      <form @submit.prevent="submitForm" class="space-y-5">

        
        <div>
          <label class="block mb-1 font-medium">Class Level</label>
          <select
            v-model="form.class_level"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select class</option>
            <option v-for="grade in grades" :key="grade" :value="grade">
              {{ grade }}
            </option>
          </select>
        </div>

      
        <div>
          <label class="block mb-1 font-medium">Term</label>
          <select
            v-model="form.term"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select term</option>
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>

    
        <div>
          <label class="block mb-1 font-medium">Academic Year</label>
          <input
            type="number"
            v-model.number="form.year"
            class="w-full border rounded px-3 py-2"
            placeholder="2026"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Fee Amount</label>
          <input
            type="number"
            v-model.number="form.amount"
            step="0.01"
            class="w-full border rounded px-3 py-2"
            placeholder="36000"
            required
          />
        </div>

      
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="goBack"
            class="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            :disabled="loading"
          >
            {{ loading ? 'Saving...' : 'Save Fee Structure' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createFee } from '../../api/fee'

const router = useRouter()
const loading = ref(false)

const grades = [
  'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4',
  'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8',
  'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
]

const form = ref({
  class_level: '',
  term: '',
  year: null,
  amount: null
})

const submitForm = async () => {
  try {
    loading.value = true

    await createFee({
      class_level: form.value.class_level,
      term: form.value.term,
      year: Number(form.value.year),
      amount: Number(form.value.amount)
    })

    router.push({ name: 'FeeStructure' })
  } catch (error) {
    console.error('Failed to create fee structure:', error.response?.data || error)
  } finally {
    loading.value = false
  }
}

const goBack = () => router.back()
</script>
