<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Fee Structure</h1>
        <p class="text-sm text-gray-500">View, edit, or print fee details</p>
      </div>

      <div class="flex gap-3">
        <button
          @click="goBack"
          class="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Back
        </button>

        <button
          @click="toggleEdit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ editing ? 'Cancel Edit' : 'Edit' }}
        </button>

        <button
          @click="goToPrint"
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
          Print
        </button>
      </div>
    </div>

  
    <div v-if="fee" class="bg-white border rounded-lg p-6 grid grid-cols-2 gap-6">
      
      <div>
        <p class="text-xs text-gray-500">Class Level</p>
        <div v-if="editing">
          <select v-model="editableFee.class_level" class="w-full border rounded px-2 py-1">
            <option v-for="grade in grades" :key="grade" :value="grade">{{ grade }}</option>
          </select>
        </div>
        <p v-else class="text-lg font-medium">{{ fee.class_level }}</p>
      </div>

    
      <div>
        <p class="text-xs text-gray-500">Term</p>
        <div v-if="editing">
          <select v-model="editableFee.term" class="w-full border rounded px-2 py-1">
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>
        <p v-else class="text-lg font-medium">{{ fee.term }}</p>
      </div>

     
      <div>
        <p class="text-xs text-gray-500">Academic Year</p>
        <div v-if="editing">
          <input type="number" v-model.number="editableFee.year" class="w-full border rounded px-2 py-1" />
        </div>
        <p v-else class="text-lg font-medium">{{ fee.year }}</p>
      </div>

    
      <div>
        <p class="text-xs text-gray-500">Total Amount</p>
        <div v-if="editing">
          <input type="number" step="0.01" v-model.number="editableFee.amount" class="w-full border rounded px-2 py-1" />
        </div>
        <p v-else class="text-lg font-semibold text-green-700">{{ formatCurrency(fee.amount) }}</p>
      </div>

     
      <div v-if="editing" class="col-span-2 flex justify-end mt-4">
        <button
          @click="saveChanges"
          class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>

    <div class="border border-red-200 rounded-lg p-4 bg-red-50">
      <p class="font-medium text-red-700 mb-2">Danger Zone</p>
      <p class="text-sm text-red-600 mb-4">
        Deleting this fee structure is permanent and cannot be undone.
      </p>

      <button
        @click="confirmDelete"
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Fee Structure
      </button>
    </div>


    <div v-if="loading" class="text-center text-gray-500">
      Loading fee details...
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFeeById, updateFee, deleteFee } from '../../api/fee'

const route = useRoute()
const router = useRouter()

const fee = ref(null)
const editableFee = reactive({ class_level: '', term: '', year: null, amount: null })
const loading = ref(false)
const editing = ref(false)

const grades = [
  'Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6',
  'Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'
]

const fetchFee = async () => {
  try {
    loading.value = true
    fee.value = await getFeeById(route.params.id)
    Object.assign(editableFee, fee.value)
  } catch (error) {
    console.error('Failed to load fee:', error)
  } finally {
    loading.value = false
  }
}

const toggleEdit = () => {
  editing.value = !editing.value
  if (editing.value) {
    Object.assign(editableFee, fee.value)
  }
}

const saveChanges = async () => {
  try {
    await updateFee(route.params.id, editableFee)
    Object.assign(fee.value, editableFee)
    editing.value = false
  } catch (error) {
    console.error('Failed to update fee:', error)
  }
}

const goBack = () => router.back()

const goToPrint = () => {
  router.push({ name: 'FeePrint', params: { id: route.params.id } })
}

const confirmDelete = async () => {
  if (!confirm('This action is irreversible. Continue?')) return
  try {
    await deleteFee(route.params.id)
    router.push({ name: 'FeeStructure' })
  } catch (error) {
    console.error('Failed to delete fee:', error)
  }
}

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount)

onMounted(fetchFee)
</script>
