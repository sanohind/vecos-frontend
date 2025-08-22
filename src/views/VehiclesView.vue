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
                        @click="viewSchedule(vehicle)"
                        class="text-sm font-medium hover:opacity-80 mr-2"
                        style="color: #0a2856"
                      >
                        View Schedule
                      </button>
                      <button
                        @click="editVehicle(vehicle)"
                        class="text-sm font-medium hover:opacity-80 mr-2"
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
      <VehicleScheduleModal
        :is-visible="showSchedule"
        :vehicle="selectedVehicle"
        :show-proceed-button="!authStore.isAdmin"
        @close="closeSchedule"
        @proceed-to-booking="proceedToBooking"
        @booking-completed="handleBookingCompleted"
      />

      <!-- Complete Booking Confirmation Modal -->
      <CompleteBookingConfirmationModal
        v-if="showCompleteConfirmation"
        :booking="bookingToComplete"
        @confirm="confirmCompleteBooking"
        @cancel="cancelCompleteBooking"
      />
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
import CompleteBookingConfirmationModal from '@/components/Booking/CompleteBookingConfirmationModal.vue'
import VehicleScheduleModal from '@/components/Vehicle/VehicleScheduleModal.vue'

import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'
import { formatDateID } from '@/utils/datetime'

export default {
  name: 'VehiclesView',
  components: {
    AppLayout,
    VehicleModal,
    DeleteConfirmModal,
    BookingModal,
    CompleteBookingConfirmationModal,
    VehicleScheduleModal,
  },
  setup() {
    const authStore = useAuthStore()
    const { showSuccess, showError } = useNotification()

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

    // Custom confirmation modal state
    const showCompleteConfirmation = ref(false)
    const bookingToComplete = ref(null)

    const bookVehicle = async (vehicle) => {
      selectedVehicle.value = vehicle
      showSchedule.value = true
    }

    const viewSchedule = async (vehicle) => {
      selectedVehicle.value = vehicle
      showSchedule.value = true
    }

    const handleBookingCompleted = (booking) => {
      // Handle when a booking is completed from the schedule modal
      console.log('✅ Booking completed from schedule modal:', booking)
      // Optionally refresh vehicles list if needed
      fetchVehicles()
    }

    const closeSchedule = () => {
      showSchedule.value = false
      selectedVehicle.value = null
    }

    const proceedToBooking = () => {
      // Close schedule modal and open booking modal
      showSchedule.value = false
      showBookingModal.value = true
    }

    const completeBooking = async (booking) => {
      // Set booking to complete and show custom modal
      bookingToComplete.value = booking
      showCompleteConfirmation.value = true
    }

    const confirmCompleteBooking = async () => {
      try {
        const booking = bookingToComplete.value

        // Debug info - Log sebelum action
        console.log('🚀 Complete Booking Debug - START:', {
          bookingId: booking.id,
          currentStatus: booking.status,
          user: booking.user.name,
          vehicle: selectedVehicle.value.brand + ' ' + selectedVehicle.value.model,
          timeDisplay: booking.time_display,
          destination: booking.destination,
          authUser: JSON.parse(localStorage.getItem('user')),
          token: localStorage.getItem('token') ? 'EXISTS' : 'MISSING',
          tokenLength: localStorage.getItem('token')?.length || 0,
          isAdmin: authStore.isAdmin,
          timestamp: new Date().toISOString(),
        })

        console.log('✅ User confirmed, proceeding with API call...')

        // Call API to complete booking
        console.log('📡 Making API call to:', `POST /api/bookings/${booking.id}/complete`)
        const response = await bookingAPI.complete(booking.id)

        console.log('✅ API Response received:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          headers: response.headers,
        })

        if (response.data.code === 200) {
          console.log('🎉 Booking completed successfully!')
          // Show success message
          showSuccess('Booking Completed', 'Booking marked as completed successfully!')

          // Close modal and reload schedule
          showCompleteConfirmation.value = false
          bookingToComplete.value = null

          // Reload schedule to show updated status
          console.log('🔄 Reloading schedule...')
          await loadVehicleSchedule()
          console.log('✅ Schedule reloaded successfully')
        } else {
          console.error('❌ API returned non-200 code:', response.data)
          showError('Error', 'Failed to complete booking. Please try again.')
        }
      } catch (error) {
        console.error('❌ Error completing booking:', error)
        console.error('❌ Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          response: {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
          },
          request: {
            method: error.request?.method,
            url: error.request?.url,
            headers: error.request?.headers,
          },
          config: {
            url: error.config?.url,
            method: error.config?.method,
            baseURL: error.config?.baseURL,
            headers: error.config?.headers,
          },
        })

        // Handle specific error messages from backend
        if (error.response?.data?.message) {
          showError('Error', `Error: ${error.response.data.message}`)
        } else {
          showError('Error', 'Error completing booking. Please try again.')
        }
      }
    }

    const cancelCompleteBooking = () => {
      showCompleteConfirmation.value = false
      bookingToComplete.value = null
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

    const editVehicle = (vehicle) => {
      editingVehicle.value = { ...vehicle }
    }

    const handleVehicleSaved = () => {
      showVehicleModal.value = false
      fetchVehicles()
      showSuccess('Vehicle Added', 'Vehicle has been added successfully!')
    }

    const handleVehicleUpdated = () => {
      editingVehicle.value = null
      fetchVehicles()
      showSuccess('Vehicle Updated', 'Vehicle has been updated successfully!')
    }

    const deleteVehicle = (vehicle) => {
      deletingVehicle.value = vehicle
    }

    const handleVehicleDeleted = () => {
      deletingVehicle.value = null
      fetchVehicles()
      showSuccess('Vehicle Deleted', 'Vehicle has been deleted successfully!')
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
      viewSchedule,
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
      closeSchedule,
      proceedToBooking,
      completeBooking,
      handleBookingCompleted,
      // Custom confirmation modal state
      showCompleteConfirmation,
      bookingToComplete,
      confirmCompleteBooking,
      cancelCompleteBooking,
      // notification functions
      showSuccess,
      showError,
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
