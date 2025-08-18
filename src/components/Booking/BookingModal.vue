<!-- src/components/Booking/BookingModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Book Vehicle: {{ vehicle?.brand }} {{ vehicle?.model }}
            </h3>

            <!-- Vehicle Info -->
            <div class="mb-4 p-3 bg-gray-50 rounded-lg">
              <div class="text-sm text-gray-600">
                <div><strong>Plate Number:</strong> {{ vehicle?.plat_no }}</div>
                <div><strong>Brand:</strong> {{ vehicle?.brand }}</div>
                <div><strong>Model:</strong> {{ vehicle?.model }}</div>
              </div>
            </div>

            <!-- Booking Form -->
            <form @submit.prevent="handleSubmit">
              <!-- Start Date & Time -->
              <div class="mb-4">
                <label for="start_time" class="block text-sm font-medium text-gray-700 mb-1">
                  Start Date & Time
                </label>
                <input
                  id="start_time"
                  v-model="form.start_time"
                  type="datetime-local"
                  required
                  :min="minDateTime"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  :class="{ 'border-red-500': errors.start_time }"
                />
                <span v-if="errors.start_time" class="text-red-500 text-xs mt-1">
                  {{ errors.start_time[0] }}
                </span>
              </div>

              <!-- End Date & Time -->
              <div class="mb-4">
                <label for="end_time" class="block text-sm font-medium text-gray-700 mb-1">
                  End Date & Time
                </label>
                <input
                  id="end_time"
                  v-model="form.end_time"
                  type="datetime-local"
                  required
                  :min="form.start_time || minDateTime"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  :class="{ 'border-red-500': errors.end_time }"
                />
                <span v-if="errors.end_time" class="text-red-500 text-xs mt-1">
                  {{ errors.end_time[0] }}
                </span>
              </div>

              <!-- Purpose/Notes (Optional) -->
              <div class="mb-4">
                <label for="purpose" class="block text-sm font-medium text-gray-700 mb-1">
                  Purpose/Notes (Optional)
                </label>
                <textarea
                  id="purpose"
                  v-model="form.purpose"
                  rows="3"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Enter the purpose of booking..."
                ></textarea>
              </div>

              <!-- Duration Info -->
              <div v-if="duration" class="mb-4 p-3 bg-blue-50 rounded-lg">
                <div class="text-sm text-blue-800"><strong>Duration:</strong> {{ duration }}</div>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {{ errorMessage }}
              </div>

              <!-- Form Actions -->
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm disabled:opacity-50"
                >
                  <span v-if="loading">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    Booking...
                  </span>
                  <span v-else>Book Vehicle</span>
                </button>

                <button
                  type="button"
                  @click="$emit('close')"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { bookingAPI } from '@/services/api'

export default {
  name: 'BookingModal',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  emits: ['close', 'booked'],
  setup(props, { emit }) {
    const form = ref({
      start_time: '',
      end_time: '',
      purpose: '', // Will be sent as 'notes' to the API
    })

    const errors = ref({})
    const errorMessage = ref('')
    const loading = ref(false)

    // Set minimum datetime to current time
    const minDateTime = computed(() => {
      const now = new Date()
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
      return now.toISOString().slice(0, 16)
    })

    // Calculate duration between start and end time
    const duration = computed(() => {
      if (!form.value.start_time || !form.value.end_time) return null

      const start = new Date(form.value.start_time)
      const end = new Date(form.value.end_time)
      const diff = end - start

      if (diff <= 0) return 'Invalid duration'

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 0 && minutes > 0) {
        return `${hours} hours ${minutes} minutes`
      } else if (hours > 0) {
        return `${hours} hours`
      } else {
        return `${minutes} minutes`
      }
    })

    // Update vehicle_id when vehicle prop changes
    watch(
      () => props.vehicle,
      (newVehicle) => {
        if (newVehicle) {
          form.value.vehicle_id = newVehicle.vehicle_id
        }
      },
      { immediate: true },
    )

    const handleSubmit = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''

      try {
        // Validate form
        if (!form.value.start_time || !form.value.end_time) {
          errorMessage.value = 'Please select both start and end time'
          loading.value = false
          return
        }

        const startDate = new Date(form.value.start_time)
        const endDate = new Date(form.value.end_time)

        if (endDate <= startDate) {
          errorMessage.value = 'End time must be after start time'
          loading.value = false
          return
        }

        if (startDate < new Date()) {
          errorMessage.value = 'Start time cannot be in the past'
          loading.value = false
          return
        }

        // Create booking with the proper data structure
        const bookingData = {
          vehicle_id: props.vehicle.id, // Use the numeric ID instead of vehicle_id string
          start_time: form.value.start_time,
          end_time: form.value.end_time,
          notes: form.value.purpose, // Backend expects 'notes' instead of 'purpose'
        }

        const response = await bookingAPI.create(bookingData)

        if (response.data.code === 201) {
          emit('booked', response.data.data)
          emit('close')
        } else {
          errorMessage.value = response.data.message || 'Booking failed'
        }
      } catch (error) {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors || {}
          errorMessage.value = error.response.data.message || 'Validation failed'
        } else if (error.response?.status === 409) {
          errorMessage.value = 'Vehicle is already booked for the selected time period'
        } else {
          errorMessage.value = error.response?.data?.message || 'An error occurred while booking'
        }
        console.error('Booking error:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      loading,
      minDateTime,
      duration,
      handleSubmit,
    }
  },
}
</script>
