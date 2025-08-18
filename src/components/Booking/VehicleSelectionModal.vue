<!-- src/components/Booking/VehicleSelectionModal.vue -->
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
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
              Select a Vehicle to Book
            </h3>

            <!-- Search and Filter -->
            <div class="mb-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="search" class="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    id="search"
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search by brand, model, or plate..."
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  />
                </div>

                <div>
                  <label for="brand-filter" class="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    id="brand-filter"
                    v-model="brandFilter"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4 pr-10 text-gray-900"
                  >
                    <option value="" class="text-gray-900">All Brands</option>
                    <option v-for="brand in uniqueBrands" :key="brand" :value="brand" class="text-gray-900">
                      {{ brand }}
                    </option>
                  </select>
                </div>

                <div class="flex items-end">
                  <button
                    @click="resetFilters"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            <!-- Vehicle List -->
            <div v-if="loading" class="text-center py-8">
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"
              ></div>
              <p class="mt-2 text-gray-500">Loading available vehicles...</p>
            </div>

            <div v-else-if="filteredVehicles.length === 0" class="text-center py-8">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No vehicles available</h3>
              <p class="mt-1 text-sm text-gray-500">
                {{
                  searchQuery || brandFilter
                    ? 'Try adjusting your search criteria.'
                    : 'There are no vehicles available for booking at the moment.'
                }}
              </p>
            </div>

            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto"
            >
              <div
                v-for="vehicle in filteredVehicles"
                :key="vehicle.vehicle_id"
                class="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer"
                @click="selectVehicle(vehicle)"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span class="text-xs text-green-600 font-medium">Available</span>
                  </div>
                </div>

                <div class="mb-3">
                  <h4 class="text-lg font-medium text-gray-900">
                    {{ vehicle.brand }} {{ vehicle.model }}
                  </h4>
                  <p class="text-sm text-gray-600">{{ vehicle.plat_no }}</p>
                  <p class="text-xs text-gray-500">ID: {{ vehicle.vehicle_id }}</p>
                </div>

                <div class="flex items-center justify-between">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ vehicle.status }}
                  </span>
                  <button
                    class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    @click.stop="selectVehicle(vehicle)"
                  >
                    Select →
                  </button>
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="mt-6 flex justify-end">
              <button
                type="button"
                @click="$emit('close')"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { vehicleAPI } from '@/services/api'

export default {
  name: 'VehicleSelectionModal',
  emits: ['close', 'vehicle-selected'],
  setup(props, { emit }) {
    const vehicles = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const brandFilter = ref('')

    const fetchAvailableVehicles = async () => {
      loading.value = true
      try {
        const response = await vehicleAPI.getAvailable()
        if (response.data.code === 200) {
          // Handle paginated response
          vehicles.value = response.data.data.data || []
        } else {
          console.error('Unexpected API response:', response.data)
          vehicles.value = []
        }
      } catch (error) {
        console.error('Error fetching available vehicles:', error)
        vehicles.value = []
      } finally {
        loading.value = false
      }
    }

    const uniqueBrands = computed(() => {
      return [...new Set(vehicles.value.map((v) => v.brand))].sort()
    })

    const filteredVehicles = computed(() => {
      let filtered = vehicles.value || []

      // Only show active vehicles
      filtered = filtered.filter((v) => v.status === 'active')

      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(
          (v) =>
            (v.brand || '').toLowerCase().includes(search) ||
            (v.model || '').toLowerCase().includes(search) ||
            (v.plat_no || '').toLowerCase().includes(search) ||
            (v.vehicle_id || '').toLowerCase().includes(search),
        )
      }

      if (brandFilter.value) {
        filtered = filtered.filter((v) => v.brand === brandFilter.value)
      }

      return filtered
    })

    const resetFilters = () => {
      searchQuery.value = ''
      brandFilter.value = ''
    }

    const selectVehicle = (vehicle) => {
      emit('vehicle-selected', vehicle)
    }

    onMounted(() => {
      fetchAvailableVehicles()
    })

    return {
      vehicles,
      loading,
      searchQuery,
      brandFilter,
      uniqueBrands,
      filteredVehicles,
      resetFilters,
      selectVehicle,
    }
  },
}
</script>
