<!-- src/components/Booking/ViewBookingModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-middle bg-white rounded-xl shadow-2xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full overflow-hidden"
      >
        <!-- Header -->
        <div class="bg-white px-8 py-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-semibold text-gray-900">Booking Details</h3>
            <button
              type="button"
              @click="$emit('close')"
              class="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style="focus:ring-color: #0A2856;"
              onfocus="this.style.boxShadow='0 0 0 2px #0A2856'"
              onblur="this.style.boxShadow='none'"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="px-8 py-6 max-h-[70vh] overflow-y-auto">
          <div class="space-y-8">
            <!-- Vehicle Info -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style="background-color: #0a2856"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h4 class="text-lg font-medium text-gray-900">Vehicle Information</h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Vehicle</span>
                  <span class="text-base text-gray-900"
                    >{{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}</span
                  >
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Plate Number</span>
                  <span
                    class="text-base text-gray-900 font-mono bg-white px-2 py-1 rounded border"
                    >{{ booking.vehicle?.plat_no }}</span
                  >
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Vehicle ID</span>
                  <span class="text-base text-gray-900">{{ booking.vehicle?.vehicle_id }}</span>
                </div>
              </div>
            </div>

            <!-- User Info -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style="background-color: #0a2856"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h4 class="text-lg font-medium text-gray-900">User Information</h4>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Name</span>
                  <span class="text-base text-gray-900">{{ booking.user?.name }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Email</span>
                  <span class="text-base text-gray-900">{{ booking.user?.email }}</span>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">NIK</span>
                  <span class="text-base text-gray-900">{{ booking.user?.nik }}</span>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Department</span>
                  <span class="text-base text-gray-900">{{ booking.user?.department }}</span>
                </div>
              </div>
            </div>

            <!-- Booking Info -->
            <div class="bg-gray-50 rounded-lg p-6">
              <div class="flex items-center mb-4">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style="background-color: #0a2856"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-9 4h10a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <h4 class="text-lg font-medium text-gray-900">Booking Information</h4>
              </div>
              <div class="space-y-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Status</span>
                  <div>
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      :class="getStatusClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">Start Time</span>
                    <span class="text-base text-gray-900">{{
                      formatDateTime(booking.start_time)
                    }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">End Time</span>
                    <span class="text-base text-gray-900">{{
                      formatDateTime(booking.end_time)
                    }}</span>
                  </div>
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Duration</span>
                  <span class="text-base font-semibold" style="color: #0a2856">{{
                    getDuration(booking.start_time, booking.end_time)
                  }}</span>
                </div>
                <div v-if="booking.notes" class="flex flex-col">
                  <span class="text-sm font-medium text-gray-500 mb-1">Notes</span>
                  <div class="bg-white p-3 rounded-lg border">
                    <span class="text-base text-gray-900">{{ booking.notes }}</span>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">Created At</span>
                    <span class="text-sm text-gray-600">{{
                      formatDateTime(booking.created_at)
                    }}</span>
                  </div>
                  <div v-if="booking.updated_at !== booking.created_at" class="flex flex-col">
                    <span class="text-sm font-medium text-gray-500 mb-1">Last Updated</span>
                    <span class="text-sm text-gray-600">{{
                      formatDateTime(booking.updated_at)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div class="flex justify-end">
            <button
              @click="$emit('close')"
              class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style="focus:ring-color: #0A2856;"
              onfocus="this.style.boxShadow='0 0 0 2px #0A2856'"
              onblur="this.style.boxShadow='none'"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateTimeID, getDurationParts } from '@/utils/datetime'
export default {
  name: 'ViewBookingModal',
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    const formatDateTime = (dateString) => {
      if (!dateString) return 'Not set'
      return formatDateTimeID(dateString, { month: 'long' })
    }

    const getDuration = (startTime, endTime) => {
      if (!startTime || !endTime) return 'Not available'
      const { hours, minutes } = getDurationParts(startTime, endTime)
      if (hours > 0 && minutes > 0) return `${hours} hours ${minutes} minutes`
      if (hours > 0) return `${hours} hours`
        return `${minutes} minutes`
    }

    const getStatusClass = (status) => {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        approved: 'bg-green-100 text-green-800 border border-green-200',
        rejected: 'bg-red-100 text-red-800 border border-red-200',
        completed: 'bg-blue-100 text-blue-800 border border-blue-200',
        cancelled: 'bg-gray-100 text-gray-800 border border-gray-200',
      }
      return classes[status] || 'bg-gray-100 text-gray-800 border border-gray-200'
    }

    return {
      formatDateTime,
      getDuration,
      getStatusClass,
    }
  },
}
</script>
