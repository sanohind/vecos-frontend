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
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6"
      >
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
              Select a Vehicle to Book
            </h3>

            <!-- Availability Time Range -->
            <div class="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Check Vehicle Availability</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    id="startDate"
                    v-model="startDate"
                    type="date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  />
                </div>

                <div>
                  <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    id="endDate"
                    v-model="endDate"
                    type="date"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm h-10 px-4"
                  />
                </div>

                <div class="flex items-end space-x-2">
                  <button
                    @click="applyAvailabilityFilter"
                    class="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    style="background-color: #0a2856"
                  >
                    Check Availability
                  </button>
                  <button
                    v-if="isAvailabilityFiltered"
                    @click="clearAvailabilityFilter"
                    class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <p class="mt-2 text-xs text-gray-500">
                Enter the date range to search for available vehicles.
              </p>
            </div>

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
                    <option
                      v-for="brand in uniqueBrands"
                      :key="brand"
                      :value="brand"
                      class="text-gray-900"
                    >
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
                  searchQuery || brandFilter || isAvailabilityFiltered
                    ? 'Try adjusting your search criteria or time range.'
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
                    <span class="text-xs text-green-600 font-medium">
                      {{ isAvailabilityFiltered ? 'Available for selected time' : 'Available' }}
                    </span>
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

            <!-- Vehicle Schedule Modal -->
            <div v-if="selectedVehicle && showSchedule" class="fixed inset-0 z-60 overflow-y-auto">
              <div
                class="flex items-center justify-center min-h-screen pt-16 pb-20 text-center sm:block sm:p-0"
              >
                <!-- Background overlay -->
                <div
                  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  @click="closeSchedule"
                ></div>

                <!-- Schedule Modal -->
                <div
                  class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
                >
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                        Schedule for {{ selectedVehicle.brand }} {{ selectedVehicle.model }}
                      </h3>

                      <!-- Date Selection -->
                      <div class="mb-6">
                        <label
                          for="schedule-date"
                          class="block text-sm font-medium text-gray-700 mb-2"
                        >
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
                            <span
                              v-else-if="daySchedule.is_tomorrow"
                              class="ml-2 text-sm text-green-600"
                              >(Tomorrow)</span
                            >
                          </h4>

                          <div
                            v-if="daySchedule.bookings.length === 0"
                            class="text-gray-500 text-sm"
                          >
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
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Action Buttons -->
                      <div class="mt-6 flex justify-end space-x-3">
                        <button
                          @click="closeSchedule"
                          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Close
                        </button>
                        <button
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
import { ref, computed, onMounted, watch } from 'vue'
import { vehicleAPI, bookingAPI } from '@/services/api'

export default {
  name: 'VehicleSelectionModal',
  emits: ['close', 'vehicle-selected'],
  setup(props, { emit }) {
    const vehicles = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const brandFilter = ref('')

    // Availability inputs
    const startDate = ref('')
    const endDate = ref('')
    const isAvailabilityFiltered = ref(false)

    // Schedule functionality
    const selectedVehicle = ref(null)
    const showSchedule = ref(false)
    const scheduleDate = ref('')
    const vehicleSchedule = ref([])
    const scheduleLoading = ref(false)

    const toMySqlDateTime = (val) => {
      if (!val) return ''
      // v-model date returns 'YYYY-MM-DD'
      // Convert to 'YYYY-MM-DD 00:00:00' for start time and 'YYYY-MM-DD 23:59:59' for end time
      return val
    }

    const fetchAvailableVehicles = async () => {
      loading.value = true
      try {
        const response = await vehicleAPI.getAll({ status: 'active' })
        if (response.data.code === 200) {
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

    const applyAvailabilityFilter = async () => {
      loading.value = true
      try {
        const params = {
          start_date: startDate.value,
          end_date: endDate.value,
        }
        if (!params.start_date || !params.end_date) {
          console.warn('Start and end date are required for availability check')
          loading.value = false
          return
        }
        const response = await vehicleAPI.getAvailable(params)
        if (response.data.code === 200) {
          vehicles.value = response.data.data?.vehicles || []
          isAvailabilityFiltered.value = true
        } else {
          vehicles.value = []
        }
      } catch (error) {
        console.error('Error applying availability filter:', error)
        vehicles.value = []
      } finally {
        loading.value = false
      }
    }

    const clearAvailabilityFilter = async () => {
      startDate.value = ''
      endDate.value = ''
      isAvailabilityFiltered.value = false
      await fetchAvailableVehicles()
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

    const selectVehicle = async (vehicle) => {
      selectedVehicle.value = vehicle
      showSchedule.value = true

      // Set default date to today
      const today = new Date()
      scheduleDate.value = today.toISOString().split('T')[0]

      // Load schedule for today
      await loadVehicleSchedule()
    }

    const loadVehicleSchedule = async () => {
      if (!selectedVehicle.value || !scheduleDate.value) return

      scheduleLoading.value = true
      try {
        const response = await bookingAPI.getSchedule({
          vehicle_id: selectedVehicle.value.id,
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

    const closeSchedule = () => {
      showSchedule.value = false
      selectedVehicle.value = null
      vehicleSchedule.value = []
    }

    const proceedToBooking = () => {
      // Emit the selected vehicle and close both modals
      emit('vehicle-selected', selectedVehicle.value)
      closeSchedule()
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
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    // Watch for date changes to reload schedule
    watch(scheduleDate, () => {
      if (selectedVehicle.value && scheduleDate.value) {
        loadVehicleSchedule()
      }
    })

    // Computed for today's date
    const today = computed(() => {
      return new Date().toISOString().split('T')[0]
    })

    // Auto-apply availability when both inputs are set
    watch([startDate, endDate], async ([s, e]) => {
      if (s && e) {
        await applyAvailabilityFilter()
      }
    })

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
      // availability controls
      startDate,
      endDate,
      applyAvailabilityFilter,
      isAvailabilityFiltered,
      clearAvailabilityFilter,
      // schedule functionality
      selectedVehicle,
      showSchedule,
      scheduleDate,
      vehicleSchedule,
      scheduleLoading,
      loadVehicleSchedule,
      closeSchedule,
      proceedToBooking,
      formatScheduleDate,
      getStatusClass,
      today,
    }
  },
}
</script>
