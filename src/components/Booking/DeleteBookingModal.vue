<!-- src/components/Booking/DeleteBookingModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Cancel Booking
            </h3>
            
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              
              <!-- Booking Info -->
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <div class="text-sm">
                  <div class="font-medium text-gray-900">{{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}</div>
                  <div class="text-gray-600">Plate: {{ booking.vehicle?.plat_no }}</div>
                  <div class="text-gray-600 mt-2">
                    <div><strong>Start:</strong> {{ formatDateTime(booking.start_time) }}</div>
                    <div><strong>End:</strong> {{ formatDateTime(booking.end_time) }}</div>
                  </div>
                  <div class="mt-1">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>

        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            @click="handleDelete"
            :disabled="loading"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
          >
            <span v-if="loading">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cancelling...
            </span>
            <span v-else>Cancel Booking</span>
          </button>
          
          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Keep Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { bookingAPI } from '@/services/api'

export default {
  name: 'DeleteBookingModal',
  props: {
    booking: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'confirmed'],
  setup(props, { emit }) {
    const loading = ref(false)
    const errorMessage = ref('')

    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const handleDelete = async () => {
      loading.value = true
      errorMessage.value = ''
      
      try {
        const response = await bookingAPI.delete(props.booking.id)
        
        if (response.data.code === 200) {
          emit('confirmed')
        } else {
          errorMessage.value = response.data.message || 'Failed to cancel booking'
        }
      } catch (error) {
        if (error.response?.status === 403) {
          errorMessage.value = 'You can only cancel pending bookings'
        } else if (error.response?.status === 404) {
          errorMessage.value = 'Booking not found'
        } else {
          errorMessage.value = error.response?.data?.message || 'An error occurred while cancelling the booking'
        }
        console.error('Delete booking error:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      errorMessage,
      formatDateTime,
      getStatusClass,
      handleDelete
    }
  }
}
</script>