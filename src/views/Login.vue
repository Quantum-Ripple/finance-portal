<!--
/**
 * @file Login.vue
 * @description This view provides the login interface for parents to access the portal.
 *              It handles user authentication, role-based access control, and redirects
 *              to the appropriate dashboard upon successful login.
 *
 * @overview
 * The component presents a form for users to enter their email and password. Upon submission,
 * it attempts to authenticate the user via an API call. After successful authentication,
 * it performs a role check to ensure the user has the necessary permissions to access
 * the Parents portal. If authentication is successful and the role is authorized,
 * the user is redirected to the dashboard; otherwise, appropriate error messages are displayed.
 *
 * @dataDisplayed
 * - Email input field.
 * - Password input field.
 * - Login button, with a loading state indicator.
 * - Error messages for invalid credentials, unauthorized access, or other login failures.
 *
 * @dataFetching
 * - `Auth.login(email, password)` from `../api/Auth.js`: Authenticates the user with the provided credentials.
 *
 * @dependencies
 * - Vue Composition API: `ref` for reactive state management, `useRouter` for programmatic navigation.
 * - API Service: `../api/Auth.js` for handling authentication logic and API calls.
 * - `localStorage`: Used to persist user information (e.g., authentication token, user object)
 *   across sessions after a successful login.
 *
 * @interactions
 * - **User Input:** Users interact by typing their email and password into the designated input fields.
 * - **Login Attempt:** Clicking the "Login" button triggers the `handleLogin` function, which
 *   initiates the authentication process.
 * - **Role-Based Access Control:** After successful authentication, the `user.role` is checked
 *   against a predefined `ALLOWED_ROLES` array. If the user's role is not permitted for this portal,
 *   their authentication data is cleared, and an access denied message is shown.
 * - **Redirection:** Upon successful authentication and authorization, the user is
 *   programmatically redirected to the `/dashboard` route using `router.push()`.
 * - **Error Handling:** Comprehensive error handling is implemented to display specific,
 *   user-friendly messages for various failure scenarios, such as invalid credentials (401),
 *   forbidden access (403), or general login errors.
 *
 * @uiUx
 * - Presents a clean, minimalist, and centered login form, ensuring a focused user experience.
 * - Provides clear visual feedback through loading states on the button and distinct error messages.
 * - The design prioritizes ease of use and clarity for the authentication process.
 */
-->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../api/Auth' 

const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)


const ALLOWED_ROLES = ['finance','admin']

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    
    await Auth.login(email.value, password.value)

    
    const stored = localStorage.getItem('user')
    const user = stored ? JSON.parse(stored) : null
    const token = localStorage.getItem('token')

    
    
    

    if (!user || !user.role) {
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      error.value = 'Login failed (no user info). Try again.'
      loading.value = false
      return
    }

    
    if (!ALLOWED_ROLES.includes(user.role.toLowerCase())) {
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      error.value = 'Your account does not have access to the Finance portal.'
      loading.value = false
      return
    }

    
    router.push('/dashboard')

  } catch (err) {
    
    if (err?.response?.status === 401) {
      error.value = 'Invalid credentials. Please try again.'
    } else if (err?.response?.status === 403) {
      error.value = 'You are not authorized to access this portal.'
    } else {
      error.value = 'Login failed. Please try again.'
      console.error('Login error:', err)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <h2 class="text-xl font-semibold text-center mb-4">Finance Login</h2>

      <input v-model="email" type="email" placeholder="Email"
             class="border rounded w-full p-2 mb-3" />

      <input v-model="password" type="password" placeholder="Password"
             class="border rounded w-full p-2 mb-3" />

      <button @click="handleLogin"
              :disabled="loading"
              class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-60">
        <span v-if="!loading">Login</span>
        <span v-else>Signing in...</span>
      </button>

      <p v-if="error" class="text-red-500 text-sm mt-3">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>


