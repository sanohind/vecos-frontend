<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">
          Create Account
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Join Vehicle Control System
        </p>
      </div>

      <!-- Register Form -->
      <div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{ 'border-red-300 focus:ring-red-500': errors.name }"
              style="--focus-ring-color: #0A2856;"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Enter your full name"
            />
            <p v-if="errors.name" class="text-red-600 text-xs mt-1">
              {{ errors.name[0] }}
            </p>
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              required
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{ 'border-red-300 focus:ring-red-500': errors.email }"
              style="--focus-ring-color: #0A2856;"
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
            <input
              id="password"
              v-model="form.password"
              type="password"
              autocomplete="new-password"
              required
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{ 'border-red-300 focus:ring-red-500': errors.password }"
              style="--focus-ring-color: #0A2856;"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="text-red-600 text-xs mt-1">
              {{ errors.password[0] }}
            </p>
            <p class="text-gray-500 text-xs mt-1">
              Minimum 8 characters required
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              autocomplete="new-password"
              required
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{ 'border-red-300 focus:ring-red-500': errors.password_confirmation }"
              style="--focus-ring-color: #0A2856;"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Confirm your password"
            />
            <p v-if="errors.password_confirmation" class="text-red-600 text-xs mt-1">
              {{ errors.password_confirmation[0] }}
            </p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
            {{ successMessage }}
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
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <router-link 
            to="/login" 
            class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Already have an account? <span class="font-medium">Sign in</span>
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

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
    
    const errors = ref({})
    const errorMessage = ref('')
    const successMessage = ref('')
    const loading = ref(false)

    const handleRegister = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''
      successMessage.value = ''
      
      // Basic validation
      if (form.value.password !== form.value.password_confirmation) {
        errorMessage.value = 'Passwords do not match'
        loading.value = false
        return
      }

      if (form.value.password.length < 8) {
        errorMessage.value = 'Password must be at least 8 characters long'
        loading.value = false
        return
      }
      
      try {
        const result = await authStore.register(form.value)
        
        if (result.success) {
          successMessage.value = 'Account created successfully! You can now sign in.'
          
          // Reset form
          form.value = {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
          }
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          errorMessage.value = result.message
          errors.value = result.errors || {}
        }
      } catch (error) {
        errorMessage.value = 'An unexpected error occurred'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      successMessage,
      loading,
      handleRegister
    }
  }
}
</script>