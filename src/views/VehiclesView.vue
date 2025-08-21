<!-- src/views/VehiclesView.vue -->
<template>
  <AppLayout>
    <div class="px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Vehicles</h1>
          <p class="mt-2 text-gray-600">
            {{
              authStore.isAdmin
                ? 'Manage all vehicles in the system'
                : 'Browse available vehicles for booking'
            }}
          </p>
        </div>
        <div class="mt-4 sm:mt-0" v-if="authStore.isAdmin">
          <button
            @click="showVehicleModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style="background-color: #0a2856; focus-ring-color: #0a2856"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Vehicle
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-4 py-5 sm:p-6">
          <div v-if="authStore.isAdmin" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
              <input
                id="search"
                v-model="filters.search"
                type="text"
                placeholder="Search by brand, model, or plate..."
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-opacity-50 text-sm h-10 px-4"
                style="focus:ring-color: #0A2856; focus:border-color: #0A2856"
              />
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <div class="relative">
                <select
                  id="status"
                  v-model="filters.status"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-opacity-50 text-sm h-10 px-4 pr-8 text-gray-900 appearance-none"
                  style="focus:ring-color: #0A2856; focus:border-color: #0A2856"
                >
                  <option value="" class="text-gray-900">All Status</option>
                  <option value="active" class="text-gray-900">Active</option>
                  <option value="inactive" class="text-gray-900">Inactive</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex items-end">
              <button
                @click="resetFilters"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
                style="focus:ring-color: #0A2856"
              >
                Reset Filters
              </button>
            </div>
          </div>

          <!-- Availability Search (User only) -->
          <div v-if="!authStore.isAdmin">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  id="startDate"
                  v-model="startDate"
                  type="date"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-opacity-50 text-sm h-10 px-4"
                  style="focus:ring-color: #0A2856; focus:border-color: #0A2856"
                />
              </div>

              <div>
                <label for="endDate" class="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="endDate"
                  v-model="endDate"
                  type="date"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-opacity-50 text-sm h-10 px-4"
                  style="focus:ring-color: #0A2856; focus:border-color: #0A2856"
                />
              </div>

              <div class="flex items-end space-x-2">
                <button
                  @click="applyAvailabilityFilter"
                  class="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
                  style="background-color: #0a2856; focus-ring-color: #0a2856"
                >
                  Check Availability
                </button>
                <button
                  v-if="isAvailabilityFiltered"
                  @click="clearAvailabilityFilter"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
                  style="focus:ring-color: #0A2856"
                >
                  Clear
                </button>
              </div>
            </div>
            <p class="mt-2 text-xs text-gray-500">
              Enter the date range to search for available vehicles.
            </p>
          </div>
        </div>
      </div>

      <!-- Vehicles List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div v-if="loading" class="text-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
              style="border-color: #0a2856"
            ></div>
            <p class="mt-2 text-gray-500">Loading vehicles...</p>
          </div>

          <div v-else-if="paginatedVehicles.length === 0" class="text-center py-8">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{
                authStore.isAdmin
                  ? 'Get started by adding a new vehicle.'
                  : 'No vehicles available at the moment.'
              }}
            </p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="vehicle in paginatedVehicles"
              :key="vehicle.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-4">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {{ vehicle.brand }} {{ vehicle.model }}
                      </h3>
                      <p class="text-sm text-gray-500">{{ vehicle.plat_no }}</p>
                      <p class="text-xs text-gray-400">ID: {{ vehicle.id }}</p>
                    </div>
                    <div>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="getStatusClass(vehicle.status)"
                      >
                        {{ vehicle.status }}
                      </span>
                    </div>
                  </div>

                  <div class="mt-2">
                    <p class="text-sm text-gray-600">
                      <strong>Created:</strong> {{ formatDate(vehicle.created_at) }}
                    </p>
                  </div>
                </div>

                <div class="flex-shrink-0 ml-4">
                  <div class="flex space-x-2">
                    <!-- Book Vehicle (User Only) -->
                    <button
                      v-if="!authStore.isAdmin && vehicle.status === 'active'"
                      @click="bookVehicle(vehicle)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
                      style="background-color: #0a2856; focus-ring-color: #0a2856"
                    >
                      Book Now
                    </button>

                    <!-- Admin Actions -->
                    <template v-if="authStore.isAdmin">
                      <button
                        @click="editVehicle(vehicle)"
                        class="text-sm font-medium hover:opacity-80"
                        style="color: #0a2856"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteVehicle(vehicle)"
                        class="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalCount > itemsPerPage" class="mt-6 flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ startIndex + 1 }}</span>
                  to
                  <span class="font-medium">{{ endIndex }}</span>
                  of
                  <span class="font-medium">{{ totalCount }}</span>
                  results
                </p>
              </div>
              <div>
                <nav
                  class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Previous</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  <template v-for="page in getPageNumbers()" :key="page">
                    <button
                      v-if="page !== '...'"
                      @click="changePage(page)"
                      :class="[
                        page === currentPage
                          ? 'z-10 border text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      ]"
                      :style="
                        page === currentPage
                          ? 'background-color: #0A2856; border-color: #0A2856;'
                          : ''
                      "
                    >
                      {{ page }}
                    </button>
                    <span
                      v-else
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  </template>

                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <!-- Show total count even when pagination is not needed -->
          <div v-else-if="totalCount > 0" class="mt-6 text-center">
            <div class="text-sm text-gray-700">Showing all {{ totalCount }} results</div>
          </div>
        </div>
      </div>

      <!-- Vehicle Modal -->
      <VehicleModal
        v-if="showVehicleModal"
        @close="showVehicleModal = false"
        @saved="handleVehicleSaved"
      />

      <!-- Edit Vehicle Modal -->
      <VehicleModal
        v-if="editingVehicle"
        :vehicle="editingVehicle"
        :is-edit="true"
        @close="editingVehicle = null"
        @saved="handleVehicleUpdated"
      />

      <!-- Delete Confirmation Modal -->
      <DeleteConfirmModal
        v-if="deletingVehicle"
        :vehicle="deletingVehicle"
        @close="deletingVehicle = null"
        @confirmed="handleVehicleDeleted"
      />

      <!-- Booking Modal -->
      <BookingModal
        v-if="showBookingModal"
        :vehicle="selectedVehicle"
        @close="showBookingModal = false"
        @booked="handleBookingCreated"
      />

<!-- Vehicle Schedule Modal -->
<div v-if="selectedVehicle && showSchedule" class="fixed inset-0 z-[9999] overflow-y-auto">
  <div
    class="flex items-center justify-center min-h-screen px-4 pt-24 pb-8 text-center sm:block sm:pt-20"
  >
    <!-- Background overlay -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      @click="closeSchedule"
    ></div>

    <!-- Schedule Modal -->
    <div
      class="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
    >
      <div class="sm:flex sm:items-start">
        <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
            Schedule for {{ selectedVehicle.brand }} {{ selectedVehicle.model }}
          </h3>

          <!-- Date Selection -->
          <div class="mb-6">
            <label for="schedule-date" class="block text-sm font-medium text-gray-700 mb-2">
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
                <span v-else-if="daySchedule.is_tomorrow" class="ml-2 text-sm text-green-600"
                  >(Tomorrow)</span
                >
              </h4>

              <div v-if="daySchedule.bookings.length === 0" class="text-gray-500 text-sm">
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
    </div>
  </AppLayout>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { usePolling } from '@/utils/usePolling'
import { vehicleAPI, bookingAPI } from '@/services/api'
import AppLayout from '@/components/Layout/AppLayout.vue'
import VehicleModal from '@/components/Vehicle/VehicleModal.vue'
import DeleteConfirmModal from '@/components/Vehicle/DeleteConfirmModal.vue'
import BookingModal from '@/components/Booking/BookingModal.vue'
import { useAuthStore } from '@/stores/auth'
import { formatDateID } from '@/utils/datetime'

export default {
  name: 'VehiclesView',
  components: {
    AppLayout,
    VehicleModal,
    DeleteConfirmModal,
    BookingModal,
  },
  setup() {
    const authStore = useAuthStore()

    const vehicles = ref([])
    const loading = ref(false)
    const showVehicleModal = ref(false)
    const editingVehicle = ref(null)
    const deletingVehicle = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const totalCount = ref(0) // New ref for total count

    const filters = ref({
      search: '',
      status: '',
    })

    // Availability inputs (user flow)
    const startDate = ref('')
    const endDate = ref('')
    const isAvailabilityFiltered = ref(false)

    const fetchVehicles = async () => {
      loading.value = true
      try {
        // Build params for server-side filtering and pagination
        const params = {
          per_page: itemsPerPage.value,
          page: currentPage.value,
        }

        if (!authStore.isAdmin) {
          params.status = 'active'
        }

        // Add search filter if provided
        if (filters.value.search) {
          params.search = filters.value.search
        }

        // Add status filter if provided (for admin)
        if (filters.value.status && authStore.isAdmin) {
          params.status = filters.value.status
        }

        const response = await vehicleAPI.getAll(params)
        console.log('🚗 Vehicles API Response:', response.data)
        if (response.data.code === 200) {
          vehicles.value = response.data.data.data
          // Update total count for pagination
          totalCount.value = response.data.data.total
          console.log('📊 Pagination Debug:', {
            totalCount: totalCount.value,
            itemsPerPage: itemsPerPage.value,
            totalPages: Math.ceil(totalCount.value / itemsPerPage.value),
            currentPage: currentPage.value,
            shouldShowPagination: totalCount.value > itemsPerPage.value,
          })
        } else {
          console.error('Unexpected API response format:', response.data)
          vehicles.value = []
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error)
        vehicles.value = []
      } finally {
        loading.value = false
      }
    }

    const applyAvailabilityFilter = async () => {
      if (authStore.isAdmin) return
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
      if (authStore.isAdmin) return
      startDate.value = ''
      endDate.value = ''
      isAvailabilityFiltered.value = false
      await fetchVehicles()
    }

    const filteredVehicles = computed(() => {
      // Since we're now using server-side filtering, just return the vehicles
      // The filtering is handled by the backend
      return vehicles.value
    })

    const totalPages = computed(() => {
      return Math.ceil(totalCount.value / itemsPerPage.value)
    })

    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value
    })

    const endIndex = computed(() => {
      return Math.min(startIndex.value + itemsPerPage.value, totalCount.value)
    })

    const paginatedVehicles = computed(() => {
      return filteredVehicles.value
    })

    const resetFilters = () => {
      filters.value = {
        search: '',
        status: '',
      }
      currentPage.value = 1
      fetchVehicles()
    }

    const formatDate = (dateString) => {
      return formatDateID(dateString, { month: 'short' })
    }

    // Add showBookingModal ref
    const showBookingModal = ref(false)
    const selectedVehicle = ref(null)

    // Schedule functionality
    const showSchedule = ref(false)
    const scheduleDate = ref('')
    const vehicleSchedule = ref([])
    const scheduleLoading = ref(false)

    const bookVehicle = async (vehicle) => {
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
      // Close schedule modal and open booking modal
      showSchedule.value = false
      showBookingModal.value = true
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
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    // Computed for today's date
    const today = computed(() => {
      return new Date().toISOString().split('T')[0]
    })

    // Watch for date changes to reload schedule
    watch(scheduleDate, () => {
      if (selectedVehicle.value && scheduleDate.value) {
        loadVehicleSchedule()
      }
    })

    const editVehicle = (vehicle) => {
      editingVehicle.value = { ...vehicle }
    }

    const handleVehicleSaved = () => {
      showVehicleModal.value = false
      fetchVehicles()
    }

    const handleVehicleUpdated = () => {
      editingVehicle.value = null
      fetchVehicles()
    }

    const deleteVehicle = (vehicle) => {
      deletingVehicle.value = vehicle
    }

    const handleVehicleDeleted = () => {
      deletingVehicle.value = null
      fetchVehicles()
    }

    // Reset to page 1 when filters change
    watch(
      filters,
      () => {
        currentPage.value = 1
        fetchVehicles()
      },
      { deep: true },
    )

    // Auto-apply availability when both inputs are set
    watch([startDate, endDate], async ([s, e]) => {
      if (s && e) {
        currentPage.value = 1
        await applyAvailabilityFilter()
      }
    })

    onMounted(() => {
      fetchVehicles()
    })

    // Auto-refresh vehicle list every 30s while visible (pause when availability filter is active)
    usePolling(
      () => {
        if (!isAvailabilityFiltered.value) {
          return fetchVehicles()
        }
      },
      { intervalMs: 60000, immediate: false },
    )

    const handleBookingCreated = () => {
      showBookingModal.value = false
      // Optionally refresh vehicles list if status might change
      fetchVehicles()
    }

    const changePage = (page) => {
      currentPage.value = Math.max(1, Math.min(page, totalPages.value))
      fetchVehicles()
    }

    const getPageNumbers = () => {
      const pages = []
      const current = currentPage.value
      const last = totalPages.value

      if (last <= 7) {
        for (let i = 1; i <= last; i++) {
          pages.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(last)
        } else if (current >= last - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = last - 4; i <= last; i++) {
            pages.push(i)
          }
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i)
          }
          pages.push('...')
          pages.push(last)
        }
      }

      return pages
    }

    return {
      authStore,
      vehicles,
      loading,
      showVehicleModal,
      editingVehicle,
      deletingVehicle,
      currentPage,
      itemsPerPage,
      totalCount, // Add this
      filters,
      filteredVehicles,
      totalPages,
      startIndex,
      endIndex,
      paginatedVehicles,
      resetFilters,
      formatDate,
      getStatusClass,
      bookVehicle,
      editVehicle,
      handleVehicleSaved,
      handleVehicleUpdated,
      deleteVehicle,
      handleVehicleDeleted,
      showBookingModal,
      selectedVehicle,
      handleBookingCreated,
      // availability controls
      startDate,
      endDate,
      applyAvailabilityFilter,
      isAvailabilityFiltered,
      clearAvailabilityFilter,
      changePage,
      getPageNumbers,
      // schedule functionality
      showSchedule,
      scheduleDate,
      vehicleSchedule,
      scheduleLoading,
      closeSchedule,
      proceedToBooking,
      formatScheduleDate,
      loadVehicleSchedule, // ← TAMBAHKAN INI
      today, // ← TAMBAHKAN INI - ini yang menyebabkan error
    }
  },
}
</script>

<style scoped>
/* Custom CSS untuk focus states yang menggunakan warna kustom */
input:focus,
select:focus {
  border-color: #0a2856 !important;
  box-shadow: 0 0 0 3px rgba(10, 40, 86, 0.1) !important;
}

button:focus {
  box-shadow: 0 0 0 3px rgba(10, 40, 86, 0.3) !important;
}

/* Style untuk select dropdown */
select {
  background-image: none;
}
</style>
