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
        class="inline-block align-bottom bg-white rounded-xl px-6 pt-6 pb-6 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8"
      >
        <div class="w-full">
          <div class="text-center sm:text-left">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">
              {{ isEdit ? 'Edit Vehicle' : 'Add New Vehicle' }}
            </h3>

            <!-- Vehicle Form -->
            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Plate Number -->
              <div>
                <label for="plat_no" class="block text-sm font-medium text-gray-700 mb-2">
                  Plate Number
                </label>
                <input
                  id="plat_no"
                  v-model="form.plat_no"
                  type="text"
                  required
                  placeholder="e.g., B 1234 ABC"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.plat_no }"
                />
                <span v-if="errors.plat_no" class="text-red-500 text-xs mt-1 block">
                  {{ errors.plat_no[0] }}
                </span>
              </div>

              <!-- Brand -->
              <div>
                <label for="brand" class="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <div class="relative">
                  <div class="relative">
                    <select
                      id="brand"
                      v-model="form.brand"
                      required
                      class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm appearance-none cursor-pointer bg-white pr-10 transition-colors"
                      :class="{ 'border-red-500 focus:ring-red-500': errors.brand }"
                      @focus="openBrandSelect"
                    >
                      <option value="" disabled>Select a brand</option>
                      <option v-for="brand in filteredBrands" :key="brand" :value="brand">
                        {{ brand }}
                      </option>
                    </select>
                    <div
                      class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"
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
                    <div v-show="isSearching" class="absolute inset-x-0 top-0 z-10">
                      <input
                        type="text"
                        v-model="brandSearchQuery"
                        placeholder="Type to search brands..."
                        class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                        @input="filterBrandSuggestions"
                        ref="searchInput"
                      />
                    </div>
                  </div>
                </div>
                <span v-if="errors.brand" class="text-red-500 text-xs mt-1 block">
                  {{ errors.brand[0] }}
                </span>
              </div>

              <!-- Model -->
              <div>
                <label for="model" class="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <input
                  id="model"
                  v-model="form.model"
                  type="text"
                  required
                  placeholder="e.g., Avanza, Civic, Pajero"
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.model }"
                />
                <span v-if="errors.model" class="text-red-500 text-xs mt-1 block">
                  {{ errors.model[0] }}
                </span>
              </div>

              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  required
                  class="w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm pr-10 transition-colors"
                  :class="{ 'border-red-500 focus:ring-red-500': errors.status }"
                >
                  <option value="" class="text-gray-900">Select Status</option>
                  <option value="active" class="text-gray-900">Active</option>
                  <option value="inactive" class="text-gray-900">Inactive</option>
                </select>
                <span v-if="errors.status" class="text-red-500 text-xs mt-1 block">
                  {{ errors.status[0] }}
                </span>
                <p class="text-xs text-gray-500 mt-1">Only active vehicles can be booked</p>
              </div>

              <!-- Error Message -->
              <div
                v-if="errorMessage"
                class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
              >
                {{ errorMessage }}
              </div>

              <!-- Success Message -->
              <div
                v-if="successMessage"
                class="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm"
              >
                {{ successMessage }}
              </div>

              <!-- Form Actions -->
              <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0 pt-4">
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
                  style="background-color: #0A2856; focus:ring-color: #0A2856;"
                  :style="{ 'background-color': loading ? '#6B7280' : '#0A2856', 'hover:background-color': loading ? '#6B7280' : '#08204A' }"
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
                    {{ isEdit ? 'Updating...' : 'Creating...' }}
                  </span>
                  <span v-else>{{ isEdit ? 'Update Vehicle' : 'Create Vehicle' }}</span>
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
          // Create new vehicle - tidak perlu vehicle_id karena auto increment
          response = await vehicleAPI.create({
            plat_no: form.value.plat_no,
            brand: form.value.brand,
            model: form.value.model,
            status: form.value.status,
          })
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
          errorMessage.value = 'Plate number already exists'
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