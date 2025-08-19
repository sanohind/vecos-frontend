<!-- src/components/Booking/EditBookingModal.vue -->
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
        class="inline-block align-bottom bg-white rounded-xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8"
      >
        <div class="w-full">
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Edit Booking</h3>

            <!-- Vehicle Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div class="text-sm text-gray-600 space-y-1">
                <div>
                  <span class="font-medium text-gray-700">Vehicle:</span>
                  {{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}
                </div>
                <div>
                  <span class="font-medium text-gray-700">Plate:</span>
                  {{ booking.vehicle?.plat_no }}
                </div>
              </div>
            </div>

            <!-- Edit Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Start Date & Time -->
              <div>
                <label for="start_time" class="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time
                </label>
                <input
                  id="start_time"
                  v-model="form.start_time"
                  type="datetime-local"
                  required
                  :min="minDateTime"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.start_time }"
                />
                <span v-if="errors.start_time" class="text-red-500 text-xs mt-1 block">
                  {{ errors.start_time[0] }}
                </span>
              </div>

              <!-- End Date & Time -->
              <div>
                <label for="end_time" class="block text-sm font-medium text-gray-700 mb-2">
                  End Date & Time
                </label>
                <input
                  id="end_time"
                  v-model="form.end_time"
                  type="datetime-local"
                  required
                  :min="form.start_time || minDateTime"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.end_time }"
                />
                <span v-if="errors.end_time" class="text-red-500 text-xs mt-1 block">
                  {{ errors.end_time[0] }}
                </span>
              </div>

              <!-- Destination -->
              <div>
                <label for="destination" class="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <input
                  id="destination"
                  v-model="form.destination"
                  type="text"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.destination }"
                  placeholder="Enter destination"
                />
                <span v-if="errors.destination" class="text-red-500 text-xs mt-1 block">
                  {{ errors.destination[0] }}
                </span>
              </div>

              <!-- Purpose/Notes -->
              <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors resize-none"
                  placeholder="Enter the purpose of booking..."
                ></textarea>
              </div>

              <!-- Duration Info -->
              <div v-if="duration" class="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div class="text-sm text-blue-800">
                  <span class="font-medium">Duration:</span> {{ duration }}
                </div>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
              >
                {{ errorMessage }}
              </div>

              <!-- Form Actions -->
              <div
                class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0 pt-4"
              >
                <button
                  type="button"
                  @click="$emit('close')"
                  class="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style="background-color: #0a2856"
                  :style="{ 'background-color': loading ? '#6B7280' : '#0A2856' }"
                  @mouseover="!loading && ($event.target.style.backgroundColor = '#08204A')"
                  @mouseout="!loading && ($event.target.style.backgroundColor = '#0A2856')"
                >
                  <span v-if="loading" class="flex items-center justify-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                    Updating...
                  </span>
                  <span v-else>Update Booking</span>
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
import { toInputLocal, getDurationParts } from '@/utils/datetime'

export default {
  name: 'EditBookingModal',
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const form = ref({
      start_time: '',
      end_time: '',
      notes: '',
      destination: '',
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
      const { hours, minutes } = getDurationParts(form.value.start_time, form.value.end_time)
      if (hours < 0 || (hours === 0 && minutes <= 0)) return 'Invalid duration'
      if (hours > 0 && minutes > 0) return `${hours} hours ${minutes} minutes`
      if (hours > 0) return `${hours} hours`
      return `${minutes} minutes`
    })

    // Initialize form with booking data
    watch(
      () => props.booking,
      (newBooking) => {
        if (newBooking) {
          // Convert datetime strings to local datetime format for input (YYYY-MM-DDTHH:mm)
          form.value = {
            start_time: toInputLocal(newBooking.start_time),
            end_time: toInputLocal(newBooking.end_time),
            notes: newBooking.notes || '',
            destination: newBooking.destination || '',
          }
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
          return
        }

        const startDate = new Date(form.value.start_time)
        const endDate = new Date(form.value.end_time)

        if (endDate <= startDate) {
          errorMessage.value = 'End time must be after start time'
          return
        }

        if (startDate < new Date()) {
          errorMessage.value = 'Start time cannot be in the past'
          return
        }

        const response = await bookingAPI.update(props.booking.id, form.value)

        if (response.data.code === 200) {
          emit('updated', response.data.data)
        } else {
          errorMessage.value = response.data.message || 'Update failed'
        }
      } catch (error) {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors || {}
          errorMessage.value = error.response.data.message || 'Validation failed'
        } else if (error.response?.status === 409) {
          errorMessage.value = 'Vehicle is already booked for the selected time period'
        } else {
          errorMessage.value = error.response?.data?.message || 'An error occurred while updating'
        }
        console.error('Update booking error:', error)
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
