<!-- src/views/LoginView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <img :src="sanohLogo" alt="Sanoh" class="h-12 w-auto mx-auto mb-4" />
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Vehicle Control System</h1>
      </div>

      <!-- Login Form -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Email </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{
                'border-red-300 focus:ring-red-500': errors.email,
                'focus:ring-blue-500': !errors.email,
              }"
              style="--focus-ring-color: #0a2856"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Enter your email"
            />
            <p v-if="errors.email" class="text-red-600 text-xs mt-1">
              {{ errors.email[0] }}
            </p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors pr-10"
                :class="{
                  'border-red-300 focus:ring-red-500': errors.password,
                  'focus:ring-blue-500': !errors.password,
                }"
                style="--focus-ring-color: #0a2856"
                @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
                placeholder="Enter your password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 5 12 5c4.64 0 8.577 2.51 9.964 6.678.07.21.07.434 0 .644C20.577 16.49 16.64 19 12 19c-4.64 0-8.577-2.51-9.964-6.678z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.28 16.09 7.245 19 12 19c1.598 0 3.11-.314 4.477-.885M10.343 6.94A9.956 9.956 0 0112 7c4.755 0 8.72 2.91 10.066 7-.337.995-.87 1.91-1.556 2.705M3 3l18 18"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-red-600 text-xs mt-1">
              {{ errors.password[0] }}
            </p>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
          >
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full text-white py-2.5 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style="background-color: #0A2856; hover:background-color: #083144;"
            @mouseover="$event.target.style.backgroundColor = '#083144'"
            @mouseout="$event.target.style.backgroundColor = '#0A2856'"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <router-link
            to="/register"
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Need an account? <span class="font-medium">Sign up</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import sanohLogo from '@/assets/sanoh-logo.png'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { showSuccess, showError } = useNotification()

    const form = ref({
      email: '',
      password: '',
    })

    const errors = ref({})
    const errorMessage = ref('')
    const loading = ref(false)
    const showPassword = ref(false)

    const handleLogin = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''

      try {
        const result = await authStore.login(form.value)

        if (result.success) {
          showSuccess('Login Successful', 'Welcome back!')
          router.push('/dashboard')
        } else {
          errorMessage.value = result.message
          errors.value = result.errors || {}
          showError('Login Failed', result.message)
        }
      } catch {
        errorMessage.value = 'An unexpected error occurred'
        showError('Login Error', 'An unexpected error occurred')
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      loading,
      handleLogin,
      sanohLogo,
      showPassword,
      showSuccess,
      showError,
    }
  },
}
</script>
