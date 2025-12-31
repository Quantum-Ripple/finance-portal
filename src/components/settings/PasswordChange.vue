<template>
  <div class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
      Change Password
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">

      
      <div class="relative">
        <label class="block text-gray-700 mb-1">Current Password</label>
        <input
          :type="showOld ? 'text' : 'password'"
          v-model="oldPassword"
          placeholder="Enter current password"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <span class="absolute right-3 top-9 cursor-pointer text-gray-500" @click="showOld = !showOld">
          <i :class="showOld ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </span>
      </div>

      
      <div class="relative">
        <label class="block text-gray-700 mb-1">New Password</label>
        <input
          :type="showNew ? 'text' : 'password'"
          v-model="newPassword"
          placeholder="Enter new password"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <span class="absolute right-3 top-9 cursor-pointer text-gray-500" @click="showNew = !showNew">
          <i :class="showNew ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </span>
      </div>

      
      <div class="relative">
        <label class="block text-gray-700 mb-1">Confirm Password</label>
        <input
          :type="showConfirm ? 'text' : 'password'"
          v-model="confirmPassword"
          placeholder="Confirm new password"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <span class="absolute right-3 top-9 cursor-pointer text-gray-500" @click="showConfirm = !showConfirm">
          <i :class="showConfirm ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </span>
      </div>

      
      <ul class="text-sm text-gray-600 list-disc list-inside mb-4">
        <li>Minimum 8 characters</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one number</li>
        <li>At least one special character (!@#$%^&*)</li>
      </ul>

      
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 flex justify-center items-center"
        :disabled="loading"
      >
        <span v-if="!loading">Change Password</span>
        <span v-else class="flex items-center">
          <i class="fa fa-spinner fa-spin mr-2"></i> Updating...
        </span>
      </button>
    </form>

    
    <p v-if="errorMessage" class="mt-4 text-red-500 text-center font-medium">
      {{ errorMessage }}
    </p>
    <p v-if="successMessage" class="mt-4 text-green-600 text-center font-medium">
      {{ successMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Auth from '../../api/Auth';


const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');


const showOld = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);


const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = 'New passwords do not match.';
    return;
  }

  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(newPassword.value)) {
    errorMessage.value = 'New password does not meet the rules.';
    return;
  }

  loading.value = true;

  try {
    await Auth.ChangePassword(oldPassword.value, newPassword.value);
    successMessage.value = 'Password changed successfully!';

    
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (err) {
    errorMessage.value =
      err.old_password ||
      err.new_password ||
      err.detail ||
      'Something went wrong!';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>