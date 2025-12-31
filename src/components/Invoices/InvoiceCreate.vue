<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Generate Invoices</h1>

    <form @submit.prevent="submitForm" class="space-y-4">

      <div>
        <label class="block mb-1">Class</label>
        <select v-model="classLevel" class="border rounded px-3 py-2 w-full">
          <option value="">Select Class</option>
          <option v-for="c in classLevels" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
      </div>
    
<div>
  <label class="block mb-1">Term</label>
  <select v-model="term" class="border rounded px-3 py-2 w-full">
    <option value="">Select Term</option>
    <option v-for="t in terms" :key="t" :value="t">
      {{ t }}
    </option>
  </select>
</div>


      <div>
        <label class="block mb-1">Fee Structure</label>
        <select v-model="feeStructure" class="border rounded px-3 py-2 w-full">
          <option value="">Select Fee Structure</option>
          <option v-for="f in feeStructures" :key="f.id" :value="f.id">
            {{ f.class_level }} - {{ f.term }} - {{ f.amount }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {{ loading ? 'Generating...' : 'Generate Invoices' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getFees, createBulkInvoices } from '../../api/fee'
import { useRouter } from 'vue-router'

const router = useRouter()
const feeStructures = ref([])

const classLevel = ref('')
const feeStructure = ref('')
const term = ref('')
const loading = ref(false)


const classLevels = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4']
const terms = ['Term 1','Term 2','Term 3']


onMounted(async () => {
  feeStructures.value = await getFees()
})

const submitForm = async () => {
  if (!classLevel.value || !feeStructure.value) {
    alert('Please select class and fee structure')
    return
  }

  const payload = {
    class_level: classLevel.value,
    fee_structure: feeStructure.value,
    term: term.value
  }

  loading.value = true
  try {
    await createBulkInvoices(payload)
    alert('Invoices generated successfully')
    router.push({name: 'Invoices'})
  } catch (err) {
    console.error(err)
    alert('Failed to generate invoices')
  } finally {
    loading.value = false
  }
}
</script>
