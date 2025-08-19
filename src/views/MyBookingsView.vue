<!-- src/views/MyBookingsView.vue -->
<template>
  <AppLayout>
    <div class="px-4 sm:px-0">
      <!-- Header -->
      <div class="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p class="mt-2 text-gray-600">View and manage your vehicle bookings</p>
        </div>
        <div class="mt-4 sm:mt-0">
          <button
            @click="showBookingModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50"
            style="background-color: #0a2856; focus-ring-color: #0a2856"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            New Booking
          </button>
        </div>
      </div>

      <!-- Booking Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-8 h-8 rounded-md flex items-center justify-center"
                  style="background-color: #0a2856"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ bookings.length }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ pendingBookings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Approved</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ approvedBookings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Rejected</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ rejectedBookings }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="mt-6">
        <div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
              <div class="relative">
                <select
                  id="status"
                  v-model="filters.status"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm h-10 px-4 pr-8 text-gray-900 appearance-none"
                >
                  <option value="" class="text-gray-900">All Status</option>
                  <option value="pending" class="text-gray-900">Pending</option>
                  <option value="approved" class="text-gray-900">Approved</option>
                  <option value="rejected" class="text-gray-900">Rejected</option>
                  <option value="completed" class="text-gray-900">Completed</option>
                  <option value="cancelled" class="text-gray-900">Cancelled</option>
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

            <div>
              <label for="date-from" class="block text-sm font-medium text-gray-700"
                >Date Range</label
              >
              <div class="relative">
                <select
                  id="date-from"
                  v-model="filters.dateFrom"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm h-10 px-4 pr-8 text-gray-900 appearance-none"
                >
                  <option value="" class="text-gray-900">All Time</option>
                  <option value="today" class="text-gray-900">Today</option>
                  <option value="week" class="text-gray-900">This Week</option>
                  <option value="month" class="text-gray-900">This Month</option>
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

            <div>
              <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
              <input
                id="search"
                v-model="filters.search"
                type="text"
                placeholder="Search bookings..."
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm h-10 px-4"
              />
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
        </div>
      </div>

      <!-- Bookings List -->
      <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div v-if="loading" class="text-center py-8">
            <div
              class="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto"
              style="border-color: #0a2856"
            ></div>
            <p class="mt-2 text-gray-500">Loading bookings...</p>
          </div>

          <div v-else-if="filteredBookings.length === 0" class="text-center py-8">
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
                d="M8 7V3a4 4 0 118 0v4m-8 0h8m-8 0H3v10a2 2 0 002 2h14a2 2 0 002-2V7h-3"
              />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p class="mt-1 text-sm text-gray-500">Get started by creating a new booking.</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <!-- Header with Vehicle Info and Status -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ booking.vehicle?.plat_no }}</p>
                  </div>
                  <div>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(booking.status)"
                    >
                      {{ booking.status }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons - Only show if pending -->
                <div v-if="booking.status === 'pending'" class="flex space-x-3">
                  <button
                    @click="editBooking(booking)"
                    class="text-sm font-medium hover:opacity-80"
                    style="color: #0a2856"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteBooking(booking)"
                    class="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <!-- Booking Details Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <!-- Time Information -->
                <div class="space-y-1">
                  <p class="text-sm text-gray-600">
                    <strong>Start:</strong> {{ formatDateTime(booking.start_time) }}
                  </p>
                  <p class="text-sm text-gray-600">
                    <strong>End:</strong> {{ formatDateTime(booking.end_time) }}
                  </p>
                </div>

                <!-- Duration and Purpose -->
                <div class="space-y-1">
                  <p class="text-sm text-gray-600">
                    <strong>Duration:</strong>
                    {{ getDuration(booking.start_time, booking.end_time) }}
                  </p>
                  <p v-if="booking.purpose" class="text-sm text-gray-600">
                    <strong>Purpose:</strong> {{ booking.purpose }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="filteredBookings.length > itemsPerPage"
            class="mt-6 flex items-center justify-between"
          >
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of
              {{ filteredBookings.length }} results
            </div>
            <div class="flex space-x-2">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="px-3 py-1 text-sm text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Vehicle Selection Modal -->
      <VehicleSelectionModal
        v-if="showBookingModal"
        @close="showBookingModal = false"
        @vehicle-selected="handleVehicleSelected"
      />

      <!-- Booking Form Modal -->
      <BookingModal
        v-if="selectedVehicle && !editingBooking"
        :vehicle="selectedVehicle"
        @close="closeBookingModal"
        @booked="handleBookingSuccess"
      />

      <!-- Edit Booking Modal -->
      <EditBookingModal
        v-if="editingBooking"
        :booking="editingBooking"
        @close="editingBooking = null"
        @updated="handleBookingUpdated"
      />

      <!-- Delete Confirmation Modal -->
      <DeleteBookingModal
        v-if="deletingBooking"
        :booking="deletingBooking"
        @close="deletingBooking = null"
        @confirmed="handleBookingDeleted"
      />
    </div>
  </AppLayout>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { bookingAPI } from '@/services/api'
import { parseDbDateTimeToLocalDate, formatDateTimeID, getDurationParts } from '@/utils/datetime'
import AppLayout from '@/components/Layout/AppLayout.vue'
import BookingModal from '@/components/Booking/BookingModal.vue'
import VehicleSelectionModal from '@/components/Booking/VehicleSelectionModal.vue'
import EditBookingModal from '@/components/Booking/EditBookingModal.vue'
import DeleteBookingModal from '@/components/Booking/DeleteBookingModal.vue'

export default {
  name: 'MyBookingsView',
  components: {
    AppLayout,
    BookingModal,
    VehicleSelectionModal,
    EditBookingModal,
    DeleteBookingModal,
  },
  setup() {
    const bookings = ref([])
    const loading = ref(false)
    const showBookingModal = ref(false)
    const selectedVehicle = ref(null)
    const editingBooking = ref(null)
    const deletingBooking = ref(null)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    const filters = ref({
      search: '',
      status: '',
      dateFrom: '',
    })

    const fetchBookings = async () => {
      loading.value = true
      try {
        const response = await bookingAPI.getAll()
        console.log('📅 Bookings API Response:', response.data)
        console.log('📊 Data Structure:', {
          level1: response.data.data,
          level2: response.data.data.data,
          isArray: Array.isArray(response.data.data.data),
        })
        bookings.value = response.data.data.data
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        loading.value = false
      }
    }

    const filteredBookings = computed(() => {
      let filtered = bookings.value

      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(
          (booking) =>
            booking.vehicle?.brand?.toLowerCase().includes(search) ||
            booking.vehicle?.model?.toLowerCase().includes(search) ||
            booking.vehicle?.plat_no?.toLowerCase().includes(search),
        )
      }

      if (filters.value.status) {
        filtered = filtered.filter((booking) => booking.status === filters.value.status)
      }

      if (filters.value.dateFrom) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        let fromDate = null
        switch (filters.value.dateFrom) {
          case 'today':
            fromDate = today
            break
          case 'week':
            fromDate = startOfWeek
            break
          case 'month':
            fromDate = startOfMonth
            break
          default:
            fromDate = null
        }

        if (fromDate) {
          filtered = filtered.filter(
            (booking) => parseDbDateTimeToLocalDate(booking.start_time) >= fromDate,
          )
        }
      }

      return filtered.sort(
        (a, b) =>
          parseDbDateTimeToLocalDate(b.start_time) - parseDbDateTimeToLocalDate(a.start_time),
      )
    })

    const pendingBookings = computed(() => {
      return bookings.value.filter((b) => b.status === 'pending').length
    })

    const approvedBookings = computed(() => {
      return bookings.value.filter((b) => b.status === 'approved').length
    })

    const rejectedBookings = computed(() => {
      return bookings.value.filter((b) => b.status === 'rejected').length
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredBookings.value.length / itemsPerPage.value)
    })

    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value
    })

    const endIndex = computed(() => {
      return Math.min(startIndex.value + itemsPerPage.value, filteredBookings.value.length)
    })

    const paginatedBookings = computed(() => {
      return filteredBookings.value.slice(startIndex.value, endIndex.value)
    })

    const resetFilters = () => {
      filters.value = {
        search: '',
        status: '',
        dateFrom: '',
      }
      currentPage.value = 1
    }

    const formatDateTime = (dateString) => {
      return formatDateTimeID(dateString)
    }

    const getDuration = (startTime, endTime) => {
      const { hours, minutes } = getDurationParts(startTime, endTime)
      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
      if (hours > 0) return `${hours}h`
      return `${minutes}m`
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const handleVehicleSelected = (vehicle) => {
      selectedVehicle.value = vehicle
      showBookingModal.value = false
    }

    const closeBookingModal = () => {
      selectedVehicle.value = null
    }

    const handleBookingSuccess = () => {
      selectedVehicle.value = null
      fetchBookings()
    }

    const editBooking = (booking) => {
      editingBooking.value = { ...booking }
    }

    const handleBookingUpdated = () => {
      editingBooking.value = null
      fetchBookings()
    }

    const deleteBooking = (booking) => {
      deletingBooking.value = booking
    }

    const handleBookingDeleted = () => {
      deletingBooking.value = null
      fetchBookings()
    }

    // Reset to page 1 when filters change
    watch(
      filters,
      () => {
        currentPage.value = 1
      },
      { deep: true },
    )

    onMounted(() => {
      fetchBookings()
    })

    return {
      bookings,
      loading,
      showBookingModal,
      selectedVehicle,
      editingBooking,
      deletingBooking,
      currentPage,
      itemsPerPage,
      filters,
      filteredBookings,
      pendingBookings,
      approvedBookings,
      rejectedBookings,
      totalPages,
      startIndex,
      endIndex,
      paginatedBookings,
      resetFilters,
      formatDateTime,
      getDuration,
      getStatusClass,
      handleVehicleSelected,
      closeBookingModal,
      handleBookingSuccess,
      editBooking,
      handleBookingUpdated,
      deleteBooking,
      handleBookingDeleted,
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
