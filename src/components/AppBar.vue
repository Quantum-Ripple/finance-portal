<!--
/**
 * @file AppBar.vue
 * @description This component serves as the main application bar (or header) for the dashboard layout.
 *              It displays the page title, navigation links, and provides controls for mobile navigation.
 *
 * @overview
 * The AppBar is a responsive component that adapts its layout for desktop and mobile screens.
 * On desktop, it shows a title and a set of navigation links. On mobile, it displays a hamburger
 * menu icon to toggle a sidebar and a "more" icon for additional actions.
 *
 * @props
 * - `title`: A `String` prop that sets the main title displayed in the app bar. Defaults to 'My App'.
 *
 * @emits
 * - `menu-toggle`: Emitted when the hamburger menu icon is clicked on mobile viewports. This event
 *   is typically used by the parent layout to toggle the visibility of the mobile sidebar.
 * - `mobile-actions`: Emitted when the "more" icon (three vertical dots) is clicked on mobile
 *   viewports, intended to trigger a dropdown or other UI for additional actions.
 *
 * @dependencies
 * - `vue-router`: Used for declarative navigation via the `<router-link>` component to navigate
 *   to different pages (e.g., 'StudentsPage', 'AnnouncementsPage').
 *
 * @interactions
 * - **Desktop Navigation:** On screens wider than the `md` breakpoint, it displays navigation links
 *   to "Students" and "Announcements".
 * - **Mobile Navigation:** On smaller screens, it hides the main navigation and shows a hamburger
 *   menu icon. Clicking this icon emits the `menu-toggle` event.
 * - **Profile Icon:** Includes a user profile icon, which currently acts as a placeholder and does
 *   not have any associated actions.
 *
 * @uiUx
 * - Provides a responsive design that transitions smoothly between mobile and desktop layouts.
 * - The app bar is designed to be fixed at the top of the screen, providing consistent navigation.
 * - Utilizes universally recognized icons (hamburger menu, user profile, more) for intuitive user interaction.
 */
-->
<template>
  <header class="w-full bg-white border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-16 flex items-center justify-between">
        
        <div class="flex items-center space-x-3">
          <button
            class="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            aria-label="open menu"
            @click="$emit('menu-toggle')"
          >
            
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <span class="text-lg font-semibold" data-testid="app-title">{{ title }}</span>
        </div>

        
        <nav class="hidden md:flex items-center space-x-3">
          
          <router-link to="" class="px-3 py-2 rounded-md hover:bg-gray-100">Students</router-link>
          <router-link to="" class="px-3 py-2 rounded-md hover:bg-gray-100">Announcements</router-link>

           

          
          
          
          <button class="p-2 rounded-full hover:bg-gray-100" aria-label="profile">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A9 9 0 1118.88 6.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </nav>

        
        <div class="md:hidden">
          <button class="p-2 rounded-md hover:bg-gray-100" @click="$emit('mobile-actions')" aria-label="more">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: 'My App' }
})
</script>