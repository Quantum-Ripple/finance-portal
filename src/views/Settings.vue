<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">

   
    <div class="bg-white shadow-md p-4">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Settings</h2>

      <div class="flex space-x-3 overflow-x-auto pb-2">

        <button
          @click="active='password'"
          :class="buttonClass('password')"
          class="whitespace-nowrap"
        >
          Change Password
        </button>

        <button
          @click="active='profile'"
          :class="buttonClass('profile')"
          class="whitespace-nowrap"
        >
          Profile Settings
        </button>


      </div>
    </div>

   
    <div class="flex-1 p-6 md:p-10">

      
      <div v-if="!active" class="text-center mt-20 md:mt-10">
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Select a setting</h2>
        <p class="text-gray-600">Choose an option from the menu to modify your settings.</p>
      </div>

  
      <div v-if="active === 'password'" class="max-w-lg mx-auto">
        <div class="flex items-center mb-4">
          <button @click="active=''" class="text-blue-500 hover:underline mr-2">
            ← Back
          </button>
          <h2 class="text-xl font-semibold text-gray-800">Change Password</h2>
        </div>

        <PasswordChange />
      </div>

      
      <div v-if="active === 'profile'" class="max-w-lg mx-auto">
        <div class="flex items-center mb-4">
          <button @click="active=''" class="text-blue-500 hover:underline mr-2">
            ← Back
          </button>
          <h2 class="text-xl font-semibold text-gray-800">Profile Settings</h2>
        </div>

        <p class="text-gray-600">Profile settings</p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import PasswordChange from '../components/settings/PasswordChange.vue';

const active = ref('');

const buttonClass = (key) => {
  return `px-4 py-2 rounded transition duration-200 border 
    ${active.value === key 
      ? 'bg-blue-200 border-blue-400 font-semibold text-gray-800' 
      : 'bg-white hover:bg-blue-100 border-gray-300 text-gray-800'
    }`;
};
</script>