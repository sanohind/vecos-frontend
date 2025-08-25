<!-- src/components/Vehicle/VehicleScheduleModal.vue -->
<template>
  <div v-if="isVisible" class="fixed inset-0 z-[9999] overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-24 pb-8 text-center sm:block sm:pt-20"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Schedule Modal -->
      <div
        class="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
              Schedule for {{ vehicle?.brand }} {{ vehicle?.model }}
            </h3>

            <!-- Date Selection -->
            <div class="mb-6">
              <label for="schedule-date" class="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                id="schedule-date"
                v-model="scheduleDate"
                type="date"
                :min="today"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
              />
            </div>

            <!-- Schedule Display -->
            <div v-if="scheduleLoading" class="text-center py-8">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"
              ></div>
              <p class="mt-2 text-gray-500">Loading schedule...</p>
            </div>

            <div v-else-if="vehicleSchedule.length === 0" class="text-center py-8">
              <p class="text-gray-500">No bookings for this date</p>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="daySchedule in vehicleSchedule"
                :key="daySchedule.date"
                class="border border-gray-200 rounded-lg p-4"
              >
                <h4 class="text-md font-medium text-gray-900 mb-3">
                  {{ formatScheduleDate(daySchedule.date) }}
                  <span v-if="daySchedule.is_today" class="ml-2 text-sm text-blue-600"
                    >(Today)</span
                  >
                  <span v-else-if="daySchedule.is_tomorrow" class="ml-2 text-sm text-green-600"
                    >(Tomorrow)</span
                  >
                </h4>

                <div v-if="daySchedule.bookings.length === 0" class="text-gray-500 text-sm">
                  No bookings scheduled
                </div>

                <div v-else class="space-y-2">
                  <div
                    v-for="booking in daySchedule.bookings"
                    :key="booking.id"
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex-1">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-medium text-gray-900">
                          {{ booking.time_display }}
                        </span>
                        <span
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                          :class="getStatusClass(booking.status)"
                        >
                          {{ booking.status }}
                        </span>
                      </div>
                      <div class="text-sm text-gray-600">
                        {{ booking.user.name }} - {{ booking.destination }}
                      </div>
                    </div>

                    <!-- Admin Action: Complete Booking -->
                    <div v-if="isAdmin && booking.status === 'approved'" class="ml-4">
                      <button
                        @click="completeBooking(booking)"
                        class="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        style="background-color: #059669"
                        title="Mark as completed"
                      >
                        <svg
                          class="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end space-x-3">
              <button
                @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
              <button
                v-if="!isAdmin && showProceedButton"
                @click="proceedToBooking"
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                style="background-color: #0a2856"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { bookingAPI } from '@/services/api'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'VehicleScheduleModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    vehicle: {
      type: Object,
      required: true,
    },
    showProceedButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'proceed-to-booking', 'booking-completed'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const { showSuccess, showError } = useNotification()

    const scheduleDate = ref('')
    const vehicleSchedule = ref([])
    const scheduleLoading = ref(false)

    const isAdmin = computed(() => authStore.isAdmin)

    const today = computed(() => {
      return new Date().toISOString().split('T')[0]
    })

    const loadVehicleSchedule = async () => {
      if (!props.vehicle || !scheduleDate.value) return

      scheduleLoading.value = true
      try {
        const response = await bookingAPI.getSchedule({
          vehicle_id: props.vehicle.id,
          date: scheduleDate.value,
          days: 1,
        })

        if (response.data.code === 200) {
          vehicleSchedule.value = response.data.data.schedule
        } else {
          vehicleSchedule.value = []
        }
      } catch (error) {
        console.error('Error loading vehicle schedule:', error)
        vehicleSchedule.value = []
      } finally {
        scheduleLoading.value = false
      }
    }

    const closeModal = () => {
      emit('close')
    }

    const proceedToBooking = () => {
      emit('proceed-to-booking')
    }

    const completeBooking = async (booking) => {
      try {
        const response = await bookingAPI.complete(booking.id)

        if (response.data.code === 200) {
          showSuccess('Booking Completed', 'Booking marked as completed successfully!')
          emit('booking-completed', booking)
          await loadVehicleSchedule() // Reload schedule
        } else {
          showError('Error', 'Failed to complete booking. Please try again.')
        }
      } catch (error) {
        console.error('Error completing booking:', error)
        if (error.response?.data?.message) {
          showError('Error', `Error: ${error.response.data.message}`)
        } else {
          showError('Error', 'Error completing booking. Please try again.')
        }
      }
    }

    const formatScheduleDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-gray-100 text-gray-800',
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    // Watch for date changes to reload schedule
    watch(scheduleDate, () => {
      if (props.vehicle && scheduleDate.value) {
        loadVehicleSchedule()
      }
    })

    // Watch for vehicle changes to reset date and load schedule
    watch(
      () => props.vehicle,
      (newVehicle) => {
        if (newVehicle) {
          scheduleDate.value = today.value
          loadVehicleSchedule()
        }
      },
      { immediate: true },
    )

    // Watch for visibility changes
    watch(
      () => props.isVisible,
      (visible) => {
        if (visible && props.vehicle) {
          scheduleDate.value = today.value
          loadVehicleSchedule()
        }
      },
    )

    return {
      scheduleDate,
      vehicleSchedule,
      scheduleLoading,
      isAdmin,
      today,
      closeModal,
      proceedToBooking,
      completeBooking,
      loadVehicleSchedule,
      formatScheduleDate,
      getStatusClass,
    }
  },
}
</script>
