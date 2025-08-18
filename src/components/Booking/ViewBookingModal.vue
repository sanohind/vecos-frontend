<!-- src/components/Booking/ViewBookingModal.vue -->
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
        <div class="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            @click="$emit('close')"
            class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Close</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Booking Details</h3>

            <!-- Vehicle Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Vehicle Information</h4>
              <div class="text-sm text-gray-600">
                <div>
                  <strong>Vehicle:</strong> {{ booking.vehicle?.brand }}
                  {{ booking.vehicle?.model }}
                </div>
                <div><strong>Plate Number:</strong> {{ booking.vehicle?.plat_no }}</div>
                <div><strong>Vehicle ID:</strong> {{ booking.vehicle?.vehicle_id }}</div>
              </div>
            </div>

            <!-- User Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-2">User Information</h4>
              <div class="text-sm text-gray-600">
                <div><strong>Name:</strong> {{ booking.user?.name }}</div>
                <div><strong>Email:</strong> {{ booking.user?.email }}</div>
              </div>
            </div>

            <!-- Booking Info -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Booking Information</h4>
              <div class="text-sm text-gray-600">
                <div>
                  <strong>Status:</strong>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2"
                    :class="getStatusClass(booking.status)"
                  >
                    {{ booking.status }}
                  </span>
                </div>
                <div><strong>Start Time:</strong> {{ formatDateTime(booking.start_time) }}</div>
                <div><strong>End Time:</strong> {{ formatDateTime(booking.end_time) }}</div>
                <div>
                  <strong>Duration:</strong> {{ getDuration(booking.start_time, booking.end_time) }}
                </div>
                <div v-if="booking.notes"><strong>Notes:</strong> {{ booking.notes }}</div>
                <div><strong>Created At:</strong> {{ formatDateTime(booking.created_at) }}</div>
                <div v-if="booking.updated_at !== booking.created_at">
                  <strong>Last Updated:</strong> {{ formatDateTime(booking.updated_at) }}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-6 flex justify-end">
              <button
                @click="$emit('close')"
                class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      return new Date(dateString).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }

    const getDuration = (startTime, endTime) => {
      if (!startTime || !endTime) return 'Not available'
      const start = new Date(startTime)
      const end = new Date(endTime)
      const diff = end - start

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours > 0 && minutes > 0) {
        return `${hours} hours ${minutes} minutes`
      } else if (hours > 0) {
        return `${hours} hours`
      } else {
        return `${minutes} minutes`
      }
    }

    const getStatusClass = (status) => {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-gray-100 text-gray-800',
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    return {
      formatDateTime,
      getDuration,
      getStatusClass,
    }
  },
}
</script>
