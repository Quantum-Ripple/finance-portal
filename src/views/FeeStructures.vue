<template>
  <div class="p-6 space-y-6">
 
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Fee Structures</h1>

      <button
        @click="goToCreate"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Fee Structure
      </button>
    </div>

   
    <div class="flex gap-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search by class level..."
        class="border rounded px-3 py-2 w-64"
      />

      <select v-model="selectedClass" class="border rounded px-3 py-2">
        <option value="">All Classes</option>
        <option v-for="c in classLevels" :key="c" :value="c">
          {{ c }}
        </option>
      </select>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded">
      <table class="w-full border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Class</th>
            <th class="p-3 text-left">Term</th>
            <th class="p-3 text-left">Year</th>
            <th class="p-3 text-left">Amount</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="fee in filteredFees"
            :key="fee.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-3">{{ fee.class_level }}</td>
            <td class="p-3">{{ fee.term }}</td>
            <td class="p-3">{{ fee.year }}</td>
            <td class="p-3 font-medium">
              {{ formatCurrency(fee.amount) }}
            </td>
            <td class="p-3 text-center">
              <button
                @click="viewFee(fee.id)"
                class="text-blue-600 hover:underline"
              >
                View
              </button>
            </td>
          </tr>

          <tr v-if="!filteredFees.length">
            <td colspan="5" class="text-center p-4 text-gray-500">
              No fee structures found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getFees } from '../api/fee'

const router = useRouter()
const fees = ref([])
const search = ref('')
const selectedClass = ref('')

const fetchFees = async () => {
  fees.value = await getFees()
}

onMounted(fetchFees)

const classLevels = computed(() => {
  return [...new Set(fees.value.map(f => f.class_level))]
})

const filteredFees = computed(() => {
  return fees.value.filter(fee => {
    const matchesSearch =
      fee.class_level.toLowerCase().includes(search.value.toLowerCase())

    const matchesClass =
      !selectedClass.value || fee.class_level === selectedClass.value

    return matchesSearch && matchesClass
  })
})
const goToCreate = () => {
  router.push({ name: 'FeeCreate'})
}

const viewFee = (id) => {
  router.push({
    name: 'FeeDetails',
    params: { id }
  })
}


const formatCurrency = (value) =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(value)
</script>
