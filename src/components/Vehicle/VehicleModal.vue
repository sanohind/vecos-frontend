<!-- src/components/Vehicle/VehicleModal.vue -->
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
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
              {{ isEdit ? 'Edit Vehicle' : 'Add New Vehicle' }}
            </h3>

            <!-- Vehicle Form -->
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Vehicle ID (only for create) -->
              <div v-if="!isEdit">
                <label for="vehicle_id" class="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle ID
                </label>
                <input
                  id="vehicle_id"
                  v-model="form.vehicle_id"
                  type="text"
                  required
                  placeholder="Enter unique vehicle ID"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  :class="{ 'border-red-500': errors.vehicle_id }"
                />
                <span v-if="errors.vehicle_id" class="text-red-500 text-xs mt-1">
                  {{ errors.vehicle_id[0] }}
                </span>
                <p class="text-xs text-gray-500 mt-1">Must be unique across all vehicles</p>
              </div>

              <!-- Plate Number -->
              <div>
                <label for="plat_no" class="block text-sm font-medium text-gray-700 mb-1">
                  Plate Number
                </label>
                <input
                  id="plat_no"
                  v-model="form.plat_no"
                  type="text"
                  required
                  placeholder="e.g., B 1234 ABC"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  :class="{ 'border-red-500': errors.plat_no }"
                />
                <span v-if="errors.plat_no" class="text-red-500 text-xs mt-1">
                  {{ errors.plat_no[0] }}
                </span>
              </div>

              <!-- Brand -->
              <div>
                <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <div class="relative">
                  <div class="relative">
                    <select
                      id="brand"
                      v-model="form.brand"
                      required
                      class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 appearance-none cursor-pointer bg-white px-4 pr-12 text-gray-900"
                      :class="{ 'border-red-500': errors.brand }"
                      @focus="openBrandSelect"
                    >
                      <option value="" disabled>Select a brand</option>
                      <option v-for="brand in filteredBrands" :key="brand" :value="brand">
                        {{ brand }}
                      </option>
                    </select>
                    <div
                      class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none mt-1"
                    >
                      <svg
                        class="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div v-show="isSearching" class="absolute inset-x-0 top-0 mt-1">
                      <input
                        type="text"
                        v-model="brandSearchQuery"
                        placeholder="Type to search brands..."
                        class="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-11 px-4"
                        @input="filterBrandSuggestions"
                        ref="searchInput"
                      />
                    </div>
                  </div>
                </div>
                <span v-if="errors.brand" class="text-red-500 text-xs mt-1">
                  {{ errors.brand[0] }}
                </span>
              </div>

              <!-- Model -->
              <div>
                <label for="model" class="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  id="model"
                  v-model="form.model"
                  type="text"
                  required
                  placeholder="e.g., Avanza, Civic, Pajero"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  :class="{ 'border-red-500': errors.model }"
                />
                <span v-if="errors.model" class="text-red-500 text-xs mt-1">
                  {{ errors.model[0] }}
                </span>
              </div>

              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  required
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4 pr-10 text-gray-900"
                  :class="{ 'border-red-500': errors.status }"
                >
                  <option value="" class="text-gray-900">Select Status</option>
                  <option value="active" class="text-gray-900">Active</option>
                  <option value="inactive" class="text-gray-900">Inactive</option>
                </select>
                <span v-if="errors.status" class="text-red-500 text-xs mt-1">
                  {{ errors.status[0] }}
                </span>
                <p class="text-xs text-gray-500 mt-1">Only active vehicles can be booked</p>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              >
                {{ errorMessage }}
              </div>

              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              >
                {{ successMessage }}
              </div>

              <!-- Form Actions -->
              <div class="mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
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
                    {{ isEdit ? 'Updating...' : 'Creating...' }}
                  </span>
                  <span v-else>{{ isEdit ? 'Update Vehicle' : 'Create Vehicle' }}</span>
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
import { ref, watch, nextTick } from 'vue'
import { vehicleAPI } from '@/services/api'

export default {
  name: 'VehicleModal',
  props: {
    vehicle: {
      type: Object,
      default: null,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'saved'],
  setup(props, { emit }) {
    const form = ref({
      vehicle_id: '',
      plat_no: '',
      brand: '',
      model: '',
      status: 'active',
    })

    const errors = ref({})
    const errorMessage = ref('')
    const successMessage = ref('')
    const loading = ref(false)

    // Common vehicle brands for suggestions
    const commonBrands = [
      'Toyota',
      'Honda',
      'Mitsubishi',
      'Suzuki',
      'Daihatsu',
      'Nissan',
      'Ford',
      'Chevrolet',
      'Hyundai',
      'Kia',
      'Mazda',
      'BMW',
      'Mercedes-Benz',
      'Audi',
      'Volkswagen',
      'Isuzu',
      'Hino',
      'UD Trucks',
    ]

    const searchInput = ref(null)
    const brandSearchQuery = ref('')
    const isSearching = ref(false)
    const filteredBrands = ref([...commonBrands])

    const openBrandSelect = () => {
      isSearching.value = true
      nextTick(() => {
        if (searchInput.value) {
          searchInput.value.focus()
        }
      })
    }

    const filterBrandSuggestions = (event) => {
      const query = event.target.value.toLowerCase()
      if (query) {
        filteredBrands.value = commonBrands.filter((brand) => brand.toLowerCase().includes(query))
      } else {
        filteredBrands.value = [...commonBrands]
      }
    }

    // Watch for brand selection to close search
    watch(
      () => form.value.brand,
      (newBrand) => {
        if (newBrand) {
          isSearching.value = false
          brandSearchQuery.value = ''
          filteredBrands.value = [...commonBrands]
        }
      },
    )

    // Initialize form with vehicle data if editing
    watch(
      () => props.vehicle,
      (newVehicle) => {
        if (newVehicle && props.isEdit) {
          form.value = {
            vehicle_id: newVehicle.vehicle_id,
            plat_no: newVehicle.plat_no,
            brand: newVehicle.brand,
            model: newVehicle.model,
            status: newVehicle.status,
          }
        }
      },
      { immediate: true },
    )

    const handleSubmit = async () => {
      loading.value = true
      errors.value = {}
      errorMessage.value = ''
      successMessage.value = ''

      try {
        // Basic validation
        if (!form.value.vehicle_id && !props.isEdit) {
          errorMessage.value = 'Vehicle ID is required'
          return
        }
        if (!form.value.plat_no) {
          errorMessage.value = 'Plate number is required'
          return
        }
        if (!form.value.brand) {
          errorMessage.value = 'Brand is required'
          return
        }
        if (!form.value.model) {
          errorMessage.value = 'Model is required'
          return
        }
        if (!form.value.status) {
          errorMessage.value = 'Status is required'
          return
        }

        let response
        if (props.isEdit) {
          // Update existing vehicle
          response = await vehicleAPI.update(props.vehicle.id, {
            plat_no: form.value.plat_no,
            brand: form.value.brand,
            model: form.value.model,
            status: form.value.status,
          })
        } else {
          // Create new vehicle
          response = await vehicleAPI.create(form.value)
        }

        if (response.data.code === (props.isEdit ? 200 : 201)) {
          successMessage.value = props.isEdit
            ? 'Vehicle updated successfully!'
            : 'Vehicle created successfully!'

          // Emit saved event after short delay to show success message
          setTimeout(() => {
            emit('saved', response.data.data)
          }, 1000)
        } else {
          errorMessage.value =
            response.data.message || `Failed to ${props.isEdit ? 'update' : 'create'} vehicle`
        }
      } catch (error) {
        if (error.response?.status === 422) {
          errors.value = error.response.data.errors || {}
          errorMessage.value = error.response.data.message || 'Validation failed'
        } else if (error.response?.status === 409) {
          errorMessage.value = 'Vehicle ID or plate number already exists'
        } else {
          errorMessage.value =
            error.response?.data?.message ||
            `An error occurred while ${props.isEdit ? 'updating' : 'creating'} the vehicle`
        }
        console.error('Vehicle save error:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      errorMessage,
      successMessage,
      loading,
      filterBrandSuggestions,
      handleSubmit,
      isSearching,
      brandSearchQuery,
      searchInput,
      filteredBrands,
      openBrandSelect,
    }
  },
}
</script>
