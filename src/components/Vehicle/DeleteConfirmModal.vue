<!-- src/components/Vehicle/DeleteConfirmModal.vue -->
<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Vehicle</h3>

            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete this vehicle? This action cannot be undone.
              </p>

              <!-- Vehicle Info -->
              <div class="mt-4 p-3 bg-gray-50 rounded-lg">
                <div class="text-sm">
                  <div class="font-medium text-gray-900">
                    {{ vehicle.brand }} {{ vehicle.model }}
                  </div>
                  <div class="text-gray-600">Plate: {{ vehicle.plat_no }}</div>
                  <div class="text-gray-600">ID: {{ vehicle.vehicle_id }}</div>
                  <div class="mt-1">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="
                        vehicle.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ vehicle.status }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Warning about active bookings -->
              <div
                v-if="vehicle.status === 'active'"
                class="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg
                      class="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                      <strong>Warning:</strong> This vehicle is currently active and may have
                      existing bookings. Deleting it will affect those bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
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
              Deleting...
            </span>
            <span v-else>Delete Vehicle</span>
          </button>

          <button
            type="button"
            @click="$emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { vehicleAPI } from '@/services/api'

export default {
  name: 'DeleteConfirmModal',
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  emits: ['close', 'confirmed'],
  setup(props, { emit }) {
    const loading = ref(false)
    const errorMessage = ref('')

    const handleDelete = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        const response = await vehicleAPI.delete(props.vehicle.id)

        if (response.data.code === 200) {
          emit('confirmed')
        } else {
          errorMessage.value = response.data.message || 'Failed to delete vehicle'
        }
      } catch (error) {
        if (error.response?.status === 409) {
          errorMessage.value =
            'Cannot delete vehicle with active bookings. Please complete or cancel all bookings first.'
        } else if (error.response?.status === 404) {
          errorMessage.value = 'Vehicle not found'
        } else {
          errorMessage.value =
            error.response?.data?.message || 'An error occurred while deleting the vehicle'
        }
        console.error('Delete vehicle error:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      errorMessage,
      handleDelete,
    }
  },
}
</script>
