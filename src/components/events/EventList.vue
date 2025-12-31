<template>
  <div class="p-6">
    
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800">Announcements</h2>
      <button
        @click="getNotifications"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>

    
    <div v-if="loading" class="text-gray-500">Loading announcements...</div>

    
    <div v-if="error" class="text-red-600">
      Failed to load announcements. Please try again later.
    </div>

    <div v-if="events.length==0" class="text-gray-500">
      No announcements available.
    </div>

    
    

    
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="announcement in events"
        :key="announcement.id"
        class="bg-white p-5 rounded-xl shadow-md border border-gray-100"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          {{ announcement.title }}
        </h3>
        <p class="text-gray-600 text-sm mb-3 line-clamp-3">
          {{ announcement.message }}
        </p>

        <div class="text-sm text-gray-500 mb-3">
          
          <p><strong>Target:</strong> {{ announcement.target_audience }}</p>
          <p>
            <strong>Date:</strong>
            {{ formatDate(announcement.created_at) }}
          </p>
        </div>

        <button
          @click="viewDetails(announcement.id)"
          class="text-blue-600 font-medium hover:underline"
        >
          Read More →
        </button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as eventApi from '../../api/event'

const events = ref([])
const loading = ref(false)
const error = ref(null)
const router = useRouter()


async function getNotifications() {
  loading.value = true
  error.value = null
  try {
    const response = await eventApi.fetchEvents()

    
    events.value = response.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  } catch (err) {
    console.error('Failed to fetch announcements:', err)
    error.value = err.message || 'Error fetching announcements.'
  } finally {
    loading.value = false
  }
}


function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}


function viewDetails(id) {
  router.push({ name: 'EventDetail', params: { id } })
}

onMounted(() => {
  getNotifications()
})
</script>

<style scoped>

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>