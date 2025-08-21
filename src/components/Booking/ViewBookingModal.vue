<!-- src/components/Booking/ViewBookingModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen px-4 py-8">
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div
        class="relative bg-white rounded-lg shadow-xl transform transition-all w-full max-w-lg overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Booking Details</h3>
          <button
            type="button"
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
          
          <!-- Status Badge -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-600">Status</span>
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getStatusClass(booking.status)"
            >
              {{ booking.status }}
            </span>
          </div>

          <!-- Vehicle Information -->
          <div class="space-y-2">
            <h4 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-1">Vehicle</h4>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="text-gray-500">Model</span>
                <p class="font-medium text-gray-900">{{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}</p>
              </div>
              <div>
                <span class="text-gray-500">Plate</span>
                <p class="font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded text-xs">{{ booking.vehicle?.plat_no }}</p>
              </div>
            </div>
          </div>

          <!-- User Information -->
          <div class="space-y-2">
            <h4 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-1">User</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Name</span>
                <span class="font-medium text-gray-900">{{ booking.user?.name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Department</span>
                <span class="text-gray-900">{{ booking.user?.department }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Email</span>
                <span class="text-gray-900 text-xs">{{ booking.user?.email }}</span>
              </div>
            </div>
          </div>

          <!-- Booking Information -->
          <div class="space-y-2">
            <h4 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-1">Details</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Destination</span>
                <span class="font-medium text-gray-900">{{ booking.destination }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Duration</span>
                <span class="text-gray-900">{{ getDuration(booking.start_time, booking.end_time) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Start</span>
                <span class="text-gray-900">{{ formatDateTime(booking.start_time) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">End</span>
                <span class="text-gray-900">{{ formatDateTime(booking.end_time) }}</span>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="booking.notes" class="space-y-2">
            <h4 class="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-1">Notes</h4>
            <div class="bg-gray-50 p-3 rounded text-sm text-gray-700">
              {{ booking.notes }}
            </div>
          </div>

          <!-- Timestamps -->
          <div class="pt-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Created: {{ formatDateTime(booking.created_at) }}</span>
              <span v-if="booking.updated_at !== booking.created_at">
                Updated: {{ formatDateTime(booking.updated_at) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div class="flex justify-end">
            <button
              @click="$emit('close')"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
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
      return formatDateTimeID(dateString, { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getDuration = (startTime, endTime) => {
      if (!startTime || !endTime) return 'Not available'
      const { hours, minutes } = getDurationParts(startTime, endTime)
      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
      if (hours > 0) return `${hours}h`
      return `${minutes}m`
    }

    const getStatusClass = (status) => {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700',
        completed: 'bg-blue-100 text-blue-700',
        cancelled: 'bg-gray-100 text-gray-700',
      }
      return classes[status] || 'bg-gray-100 text-gray-700'
    }

    return {
      formatDateTime,
      getDuration,
      getStatusClass,
    }
  },
}
</script>