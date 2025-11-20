<template>
  <div class="flex h-screen bg-gray-50">
    
    <SimpleSideBar
      class="hidden md:flex"
      :items="navItems"
      :title="sidebarTitle"
      @logout="onLogout"
    />

    
    <div class="flex-1 flex flex-col">
      
      <SimpleAppBar
        class="relative z-50"
        :title="PageTitle"
        @menu-toggle="toggleSidebar"
      />

      
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-view />
      </main>
    </div>

    
    <transition name="fade">
      <div
        v-if="mobileSidebarOpen"
        class="fixed inset-0 z-40 flex"
      >

        <SimpleSideBar
          class="relative z-50 bg-white w-full sm:w-3/4 max-w-xs"
          :items="navItems"
          title="Menu"
          @logout="onLogout"
          @navigate="toggleSidebar"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SimpleAppBar from '../components/AppBar.vue'
import SimpleSideBar from '../components/SideBar.vue'
import Auth from '../api/Auth'
import { useRouter } from 'vue-router'

const navItems = [
  { label: 'Dashboard', route: { name: 'Dashboard' } },
  { label: 'Announcements', route: { name: 'AnnouncementsPage' } },
  { label: 'Settings', route: { name: 'Settings' } },
]

const mobileSidebarOpen = ref(false)
const router = useRouter()




function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}
const userData = JSON.parse(localStorage.getItem("user") || "{}")

const PageTitle = ref(`${getGreeting()}, ${userData.full_name || ""}`)

const sidebarTitle = ref(`${userData.school_name || ""}`)





function toggleSidebar() {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}

function onLogout() {
  if(confirm("Are you sure you want to logout?")){
    Auth.logout()
    router.push({ name: 'login' })
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>