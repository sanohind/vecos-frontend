<!-- src/views/RegisterView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm">
      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">Create Account</h1>
        <p class="mt-2 text-sm text-gray-600">Join Vehicle Control System</p>
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
              style="--focus-ring-color: #0a2856"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Enter your full name"
            />
            <p v-if="errors.name" class="text-red-600 text-xs mt-1">
              {{ errors.name[0] }}
            </p>
          </div>

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
              :class="{ 'border-red-300 focus:ring-red-500': errors.email }"
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
                autocomplete="new-password"
                required
                class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors pr-10"
                :class="{ 'border-red-300 focus:ring-red-500': errors.password }"
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
            <p class="text-gray-500 text-xs mt-1">Minimum 8 characters required</p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div class="relative">
              <input
                id="password_confirmation"
                v-model="form.password_confirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors pr-10"
                :class="{ 'border-red-300 focus:ring-red-500': errors.password_confirmation }"
                style="--focus-ring-color: #0a2856"
                @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                @click="showConfirmPassword = !showConfirmPassword"
                :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              >
                <svg
                  v-if="!showConfirmPassword"
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
            <p v-if="errors.password_confirmation" class="text-red-600 text-xs mt-1">
              {{ errors.password_confirmation[0] }}
            </p>
          </div>

          <!-- Department field -->
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              id="department"
              v-model="form.department"
              required
              class="block w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-colors appearance-none"
              :class="{
                'border-red-300 focus:ring-red-500': errors.department,
                'text-gray-400': !form.department,
                'text-gray-900': form.department,
              }"
              style="
                --focus-ring-color: #0a2856;
                background-image: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%23374151%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27m6 8 4 4 4-4%27/%3e%3c/svg%3e');
                background-position: right 0.75rem center;
                background-repeat: no-repeat;
                background-size: 1rem 1rem;
              "
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
            >
              <option value="" disabled class="text-gray-500">Select your department</option>
              <option value="Accounting" class="text-black">Accounting</option>
              <option value="Marketing" class="text-black">Marketing</option>
              <option value="Purchasing" class="text-black">Purchasing</option>
              <option value="QC & Engineering" class="text-black">QC & Engineering</option>
              <option value="Maintenance" class="text-black">Maintenance</option>
              <option value="HR & GA" class="text-black">HR & GA</option>
              <option value="Brazing" class="text-black">Brazing</option>
              <option value="Chassis" class="text-black">Chassis</option>
              <option value="Nylon" class="text-black">Nylon</option>
              <option value="PPIC" class="text-black">PPIC</option>
            </select>
            <p v-if="errors.department" class="text-red-600 text-xs mt-1">
              {{ errors.department[0] }}
            </p>
          </div>

          <!-- NIK Field -->
          <div>
            <label for="nik" class="block text-sm font-medium text-gray-700 mb-2"> NIK </label>
            <input
              id="nik"
              v-model="form.nik"
              type="text"
              required
              minlength="6"
              maxlength="9"
              pattern="\d{6,9}"
              title="NIK must be 6-9 digits"
              class="block w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-colors"
              :class="{ 'border-red-300 focus:ring-red-500': errors.nik }"
              style="--focus-ring-color: #0a2856"
              @focus="$event.target.style.setProperty('--tw-ring-color', '#0A2856')"
              placeholder="Enter your 6-9 digit NIK"
            />
            <p v-if="errors.nik" class="text-red-600 text-xs mt-1">
              {{ errors.nik[0] }}
            </p>
            <p class="text-gray-500 text-xs mt-1">Must be 6-9 digits.</p>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm"
          >
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm"
          >
            {{ successMessage }}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full text-white py-2.5 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style="background-color: #0a2856"
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
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { showSuccess, showError } = useNotification()

    const form = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      department: '',
      nik: '',
    })

    const errors = ref({})
    const errorMessage = ref('')
    const successMessage = ref('')
    const loading = ref(false)
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    const handleRegister = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''
      successMessage.value = ''

      // Basic validation
      if (!/^\d{6,9}$/.test(form.value.nik)) {
        errors.value.nik = ['NIK must be 6-9 digits.']
        showError('Validation Error', 'NIK must be 6-9 digits.')
        loading.value = false
        return
      }

      if (form.value.password !== form.value.password_confirmation) {
        errorMessage.value = 'Passwords do not match'
        showError('Validation Error', 'Passwords do not match')
        loading.value = false
        return
      }

      if (form.value.password.length < 8) {
        errorMessage.value = 'Password must be at least 8 characters long'
        showError('Validation Error', 'Password must be at least 8 characters long')
        loading.value = false
        return
      }

      try {
        const result = await authStore.register(form.value)

        if (result.success) {
          successMessage.value = 'Account created successfully! You can now sign in.'
          showSuccess(
            'Registration Successful',
            'Account created successfully! You can now sign in.',
          )

          // Reset form
          form.value = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            department: '',
            nik: '',
          }

          // Redirect to login after 2 seconds
          setTimeout(() => {
            router.push('/login')
          }, 2000)
        } else {
          errorMessage.value = result.message
          errors.value = result.errors || {}
          showError('Registration Failed', result.message)
        }
      } catch (error) {
        console.error('Registration error:', error)
        errorMessage.value = 'An unexpected error occurred'
        showError('Registration Error', 'An unexpected error occurred')
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
      handleRegister,
      showPassword,
      showConfirmPassword,
      showSuccess,
      showError,
    }
  },
}
</script>
