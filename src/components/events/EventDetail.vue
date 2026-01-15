<template>
  <div class="p-6 max-w-3xl mx-auto">
    <div v-if="loading" class="text-gray-500">Loading announcement...</div>

    <div v-else-if="error" class="text-red-600">{{ error }}</div>

    <div v-else class="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">
        {{ event.title }}
      </h2>

      <p class="text-gray-600 mb-4 whitespace-pre-line">{{ event.message }}</p>

      <div class="text-sm text-gray-500 mb-4">
        <p><strong>Target:</strong> {{ event.target_audience }}</p>
        <p><strong>Date:</strong> {{ formatDate(event.created_at) }}</p>
      </div>

      <div class="flex justify-between items-center">
        <button
          @click="router.push({ name: 'AnnouncementsPage' })"
          class="text-blue-600 hover:underline"
        >
          ← Back
        </button>

    
      </div>

      
      <div v-if="successMessage" class="bg-green-100 text-green-700 p-3 rounded mt-4">
        {{ successMessage }}
      </div>

      <div v-if="deleteError" class="bg-red-100 text-red-700 p-3 rounded mt-4">
        {{ deleteError }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as eventApi from "../../api/event";

const route = useRoute();
const router = useRouter();

const event = ref({});
const loading = ref(false);
const deleting = ref(false);
const error = ref(null);
const successMessage = ref("");
const deleteError = ref("");

async function fetchEvent() {
  loading.value = true;
  try {
    const response = await eventApi.viewEvent(route.params.id);
    event.value = response;
  } catch (err) {
    console.error("Failed to load event:", err);
    error.value = "Could not load announcement details.";
  } finally {
    loading.value = false;
  }
}
/*
async function handleDelete() {
  if (!confirm("Are you sure you want to delete this announcement?")) return;

  deleting.value = true;
  deleteError.value = "";
  successMessage.value = "";

  try {
    await eventApi.deleteEvent(route.params.id);
    successMessage.value = "Announcement deleted successfully!";

    
    setTimeout(() => {
      router.push({ name: "Events" });
    }, 1200);
  } catch (err) {
    console.error("Delete failed:", err);
    deleteError.value = err.message || "Failed to delete announcement.";
  } finally {
    deleting.value = false;
  }
}
*/
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

onMounted(fetchEvent);
</script>