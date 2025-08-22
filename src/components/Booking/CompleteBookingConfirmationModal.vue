<!-- src/components/Booking/CompleteBookingConfirmationModal.vue -->
<template>
  <div class="fixed inset-0 z-[9999] overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen px-4 pt-24 pb-8 text-center sm:block sm:pt-20"
    >
      <!-- Background overlay -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        @click="$emit('cancel')"
      ></div>

      <!-- Modal -->
      <div
        class="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Complete Booking</h3>

            <!-- Booking Details -->
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
              <div class="space-y-3">
                <div class="flex items-center">
                  <div class="w-20 text-sm font-medium text-gray-500">Vehicle:</div>
                  <div class="text-sm text-gray-900">
                    {{ booking?.vehicle?.brand }} {{ booking?.vehicle?.model }}
                  </div>
                </div>

                <div class="flex items-center">
                  <div class="w-20 text-sm font-medium text-gray-500">User:</div>
                  <div class="text-sm text-gray-900">{{ booking?.user?.name }}</div>
                </div>

                <div class="flex items-center">
                  <div class="w-20 text-sm font-medium text-gray-500">Time:</div>
                  <div class="text-sm text-gray-900">{{ booking?.time_display }}</div>
                </div>

                <div class="flex items-center">
                  <div class="w-20 text-sm font-medium text-gray-500">Destination:</div>
                  <div class="text-sm text-gray-900">{{ booking?.destination }}</div>
                </div>

                <div class="flex items-center">
                  <div class="w-20 text-sm font-medium text-gray-500">Status:</div>
                  <div class="text-sm">
                    <span
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {{ booking?.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-sm text-gray-500 mb-6">
              Are you sure you want to mark this booking as completed? This action will change the
              status from "approved" to "completed" and update the end time to the current time.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            style="background-color: #059669"
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompleteBookingConfirmationModal',
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  emits: ['confirm', 'cancel'],
}
</script>
