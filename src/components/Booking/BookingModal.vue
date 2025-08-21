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
        class="inline-block align-bottom bg-white rounded-xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8"
      >
        <div class="w-full">
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">
              Book Vehicle: {{ vehicle?.brand }} {{ vehicle?.model }}
            </h3>

            <!-- Vehicle Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div class="text-sm text-gray-600 space-y-1">
                <div>
                  <span class="font-medium text-gray-700">Plate Number:</span>
                  {{ vehicle?.plat_no }}
                </div>
                <div>
                  <span class="font-medium text-gray-700">Brand:</span> {{ vehicle?.brand }}
                </div>
                <div>
                  <span class="font-medium text-gray-700">Model:</span> {{ vehicle?.model }}
                </div>
              </div>
            </div>

            <!-- Booking Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Start Date & Time -->
              <div>
                <label for="start_time" class="block text-sm font-medium text-gray-700 mb-2">
                  Start Date & Time
                </label>
                <flat-pickr
                  id="start_time"
                  v-model="form.start_time"
                  :config="startConfig"
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
                <flat-pickr
                  id="end_time"
                  v-model="form.end_time"
                  :config="endConfig"
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
                  placeholder="Enter destination..."
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                />
              </div>

              <!-- Purpose/Notes (Optional) -->
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
                    Booking...
                  </span>
                  <span v-else>Book Vehicle</span>
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
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { bookingAPI } from '@/services/api'

export default {
  name: 'BookingModal',
  components: { 'flat-pickr': flatPickr },
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
      destination: '',
      notes: '',
    })

    const errors = ref({})
    const errorMessage = ref('')
    const loading = ref(false)

    const getNextHalfHour = () => {
      const d = new Date()
      const m = d.getMinutes()
      if (m === 0 || m === 30) {
        d.setSeconds(0, 0)
      } else if (m < 30) {
        d.setMinutes(30, 0, 0)
      } else {
        d.setHours(d.getHours() + 1)
        d.setMinutes(0, 0, 0)
      }
      return d
    }

    const startMin = ref(getNextHalfHour())
    const endMin = ref(null)

    const commonPickerOptions = {
      enableTime: true,
      time_24hr: true,
      minuteIncrement: 30,
      dateFormat: 'Y-m-d H:i',
      altInput: true,
      altFormat: 'F j, Y H:i',
    }

    const startConfig = ref({
      ...commonPickerOptions,
      minDate: startMin.value,
    })

    const endConfig = ref({
      ...commonPickerOptions,
      minDate: startMin.value,
    })

    const duration = computed(() => {
      if (!form.value.start_time || !form.value.end_time) return null
      const start = new Date(form.value.start_time)
      const end = new Date(form.value.end_time)
      const diff = end - start
      if (diff <= 0) return 'Invalid duration'
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      if (hours > 0 && minutes > 0) return `${hours} hours ${minutes} minutes`
      if (hours > 0) return `${hours} hours`
      return `${minutes} minutes`
    })

    // Keep end >= start + 30m and update end minDate
    watch(
      () => form.value.start_time,
      (val) => {
        if (!val) return
        const start = new Date(val)
        const minEnd = new Date(start.getTime() + 30 * 60000)
        endMin.value = minEnd
        endConfig.value = { ...endConfig.value, minDate: minEnd }
        if (form.value.end_time) {
          const currentEnd = new Date(form.value.end_time)
          if (currentEnd < minEnd) {
            form.value.end_time = formatForSubmit(minEnd)
          }
        }
      },
    )

    const formatForSubmit = (dateObj) => {
      const yyyy = dateObj.getFullYear()
      const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
      const dd = String(dateObj.getDate()).padStart(2, '0')
      const hh = String(dateObj.getHours()).padStart(2, '0')
      const mi = String(dateObj.getMinutes()).padStart(2, '0')
      return `${yyyy}-${mm}-${dd} ${hh}:${mi}:00`
    }

    const handleSubmit = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''

      try {
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

        const bookingData = {
          vehicle_id: props.vehicle.id,
          start_time: formatForSubmit(startDate),
          end_time: formatForSubmit(endDate),
          notes: form.value.notes,
          destination: form.value.destination,
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

    // Initialize start minimum on mount
    startConfig.value = { ...startConfig.value, minDate: startMin.value }
    endConfig.value = { ...endConfig.value, minDate: startMin.value }

    return {
      form,
      errors,
      errorMessage,
      loading,
      duration,
      handleSubmit,
      startConfig,
      endConfig,
    }
  },
}
</script>
