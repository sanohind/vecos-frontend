<!-- src/views/BookingsView.vue -->
<template>
  <AppLayout>
    <div class="px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-2xl font-semibold text-gray-900">All Bookings</h1>
          <p class="mt-2 text-sm text-gray-700">
            Manage and monitor all vehicle bookings in the system
          </p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            @click="showStats = true"
            class="inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
            style="background-color: #0A2856; hover:background-color: #083147; focus:ring-color: #0A2856;"
            onmouseover="this.style.backgroundColor='#083147'"
            onmouseout="this.style.backgroundColor='#0A2856'"
          >
            View Statistics
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div>
          <label for="status-filter" class="block text-sm font-medium text-gray-700">Status</label>
          <div class="relative">
            <select
              id="status-filter"
              v-model="filters.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm h-10 px-4 pr-8 text-gray-900 appearance-none"
              style="border-color: #0A2856; focus:border-color: #0A2856; focus:ring-color: #0A2856;"
              onfocus="this.style.borderColor='#0A2856'; this.style.boxShadow='0 0 0 1px #0A2856'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
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
          <label for="date-filter" class="block text-sm font-medium text-gray-700"
            >Date Range</label
          >
          <div class="relative">
            <select
              id="date-filter"
              v-model="filters.dateRange"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm h-10 px-4 pr-8 text-gray-900 appearance-none"
              style="border-color: #0A2856; focus:border-color: #0A2856; focus:ring-color: #0A2856;"
              onfocus="this.style.borderColor='#0A2856'; this.style.boxShadow='0 0 0 1px #0A2856'"
              onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
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
            style="border-color: #0A2856; focus:border-color: #0A2856; focus:ring-color: #0A2856;"
            onfocus="this.style.borderColor='#0A2856'; this.style.boxShadow='0 0 0 1px #0A2856'"
            onblur="this.style.borderColor='#d1d5db'; this.style.boxShadow='none'"
          />
        </div>

        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style="focus:ring-color: #0A2856;"
            onfocus="this.style.boxShadow='0 0 0 2px #0A2856'"
            onblur="this.style.boxShadow='none'"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <!-- Bookings Table -->
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Vehicle
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date & Time
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Purpose
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                          <div
                            class="h-10 w-10 rounded-full flex items-center justify-center"
                            style="background-color: #0a2856"
                          >
                            <span class="text-sm font-medium leading-none text-white">
                              {{ booking.user?.name?.charAt(0).toUpperCase() || '?' }}
                            </span>
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {{ booking.user?.name || 'Unknown User' }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ booking.user?.nik || 'No email' }}
                          </div>
                          <div class="text-sm text-gray-500">
                            {{ booking.user?.department || 'No department' }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ booking.vehicle?.brand }} {{ booking.vehicle?.model }}
                      </div>
                      <div class="text-sm text-gray-500">{{ booking.vehicle?.plat_no }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ formatDate(booking.start_time) }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ formatTime(booking.start_time) }} - {{ formatTime(booking.end_time) }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getStatusClass(booking.status)"
                      >
                        {{ booking.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="text-sm text-gray-900 max-w-xs truncate">
                        {{ booking.notes }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <button
                          @click="viewBooking(booking)"
                          class="hover:underline"
                          style="color: #0a2856"
                          onmouseover="this.style.color='#083147'"
                          onmouseout="this.style.color='#0A2856'"
                        >
                          View
                        </button>
                        <button
                          v-if="booking.status === 'pending'"
                          @click="confirmAction(booking, 'approve')"
                          class="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          v-if="booking.status === 'pending'"
                          @click="confirmAction(booking, 'reject')"
                          class="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination.total > pagination.per_page"
        class="mt-6 flex items-center justify-between"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="changePage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="changePage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ pagination.from }}</span>
              to
              <span class="font-medium">{{ pagination.to }}</span>
              of
              <span class="font-medium">{{ pagination.total }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="changePage(pagination.current_page - 1)"
                :disabled="pagination.current_page === 1"
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
                    page === pagination.current_page
                      ? 'z-10 border text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  ]"
                  :style="
                    page === pagination.current_page
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
                @click="changePage(pagination.current_page + 1)"
                :disabled="pagination.current_page === pagination.last_page"
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
    </div>

    <!-- Statistics Modal -->
    <div
      v-if="showStats"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Booking Statistics</h3>
          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Total Bookings:</span>
              <span class="text-sm font-medium text-gray-900">{{ stats.total || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Pending:</span>
              <span class="text-sm font-medium text-yellow-600">{{ stats.pending || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Approved:</span>
              <span class="text-sm font-medium text-green-600">{{ stats.approved || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Rejected:</span>
              <span class="text-sm font-medium text-red-600">{{ stats.rejected || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Completed:</span>
              <span class="text-sm font-medium" style="color: #0a2856">{{
                stats.completed || 0
              }}</span>
            </div>
          </div>
          <div class="mt-6">
            <button
              @click="showStats = false"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm"
              style="background-color: #0A2856; focus:ring-color: #0A2856;"
              onmouseover="this.style.backgroundColor='#083147'"
              onmouseout="this.style.backgroundColor='#0A2856'"
              onfocus="this.style.boxShadow='0 0 0 2px #0A2856'"
              onblur="this.style.boxShadow='none'"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Booking Modal -->
    <ViewBookingModal
      v-if="selectedBooking && !confirmActionType"
      :booking="selectedBooking"
      @close="selectedBooking = null"
    />

    <!-- Confirm Action Modal -->
    <ConfirmActionModal
      v-if="confirmActionType"
      :type="confirmActionType"
      @close="
        () => {
          confirmActionType = null
          selectedBooking = null
        }
      "
      @confirm="handleConfirm"
    />
  </AppLayout>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { usePolling } from '@/utils/usePolling'
import AppLayout from '@/components/Layout/AppLayout.vue'
import ViewBookingModal from '@/components/Booking/ViewBookingModal.vue'
import ConfirmActionModal from '@/components/Booking/ConfirmActionModal.vue'
import { bookingAPI } from '@/services/api'
import { formatDateID, formatTimeID, parseDbDateTimeToLocalDate } from '@/utils/datetime'

export default {
  name: 'BookingsView',
  components: {
    AppLayout,
    ViewBookingModal,
    ConfirmActionModal,
  },
  setup() {
    const loading = ref(false)
    const allBookings = ref([]) // Store all bookings
    const bookings = ref([]) // Store filtered bookings
    const stats = ref({})
    const showStats = ref(false)
    const filters = ref({
      status: '',
      dateRange: '',
      search: '',
    })
    const pagination = ref({
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
      from: 0,
      to: 0,
    })

    const loadBookings = async () => {
      loading.value = true
      try {
        const response = await bookingAPI.getAll()
        if (response.data.code === 200) {
          allBookings.value = response.data.data.data || []
          applyFilters() // Initial filter application
        } else {
          console.error('Unexpected API response:', response.data)
          allBookings.value = []
          bookings.value = []
        }
      } catch (error) {
        console.error('Error loading bookings:', error)
        allBookings.value = []
        bookings.value = []
      } finally {
        loading.value = false
      }
    }

    const applyFilters = () => {
      let filteredBookings = [...allBookings.value]

      // Apply search filter
      if (filters.value.search) {
        const searchTerm = filters.value.search.toLowerCase()
        filteredBookings = filteredBookings.filter(
          (booking) =>
            booking.user?.name?.toLowerCase().includes(searchTerm) ||
            booking.user?.email?.toLowerCase().includes(searchTerm) ||
            booking.vehicle?.brand?.toLowerCase().includes(searchTerm) ||
            booking.vehicle?.model?.toLowerCase().includes(searchTerm) ||
            booking.vehicle?.plat_no?.toLowerCase().includes(searchTerm) ||
            booking.notes?.toLowerCase().includes(searchTerm),
        )
      }

      // Apply status filter
      if (filters.value.status) {
        filteredBookings = filteredBookings.filter(
          (booking) => booking.status === filters.value.status,
        )
      }

      // Apply date range filter
      if (filters.value.dateRange) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay())
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        filteredBookings = filteredBookings.filter((booking) => {
          const bookingDate = parseDbDateTimeToLocalDate(booking.start_time)
          switch (filters.value.dateRange) {
            case 'today':
              return bookingDate >= today
            case 'week':
              return bookingDate >= startOfWeek
            case 'month':
              return bookingDate >= startOfMonth
            default:
              return true
          }
        })
      }

      // Update pagination
      const total = filteredBookings.length
      const lastPage = Math.ceil(total / pagination.value.per_page)
      pagination.value = {
        ...pagination.value,
        total,
        last_page: lastPage,
        from: (pagination.value.current_page - 1) * pagination.value.per_page + 1,
        to: Math.min(pagination.value.current_page * pagination.value.per_page, total),
      }

      // Apply pagination
      const start = (pagination.value.current_page - 1) * pagination.value.per_page
      const end = start + pagination.value.per_page
      bookings.value = filteredBookings.slice(start, end)
    }

    const loadStats = async () => {
      try {
        const response = await bookingAPI.getStats()
        stats.value = response.data.data
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    }

    // Watch for any filter changes to apply client-side filtering
    let filterTimeout
    watch(
      () => ({
        search: filters.value.search,
        status: filters.value.status,
        dateRange: filters.value.dateRange,
      }),
      () => {
        clearTimeout(filterTimeout)
        filterTimeout = setTimeout(() => {
          pagination.value.current_page = 1
          applyFilters()
        }, 300)
      },
      { deep: true },
    )

    // Watch page changes
    watch(
      () => pagination.value.current_page,
      () => {
        applyFilters()
      },
    )

    const confirmAction = (booking, type) => {
      selectedBooking.value = booking
      confirmActionType.value = type
    }

    const resetFilters = () => {
      filters.value = {
        status: '',
        dateRange: '',
        search: '',
      }
      pagination.value.current_page = 1
      applyFilters()
    }

    const handleConfirm = async () => {
      try {
        const bookingId = selectedBooking.value.id
        if (confirmActionType.value === 'approve') {
          await bookingAPI.approve(bookingId)
          // Show success message or notification here if needed
        } else if (confirmActionType.value === 'reject') {
          await bookingAPI.reject(bookingId)
          // Show success message or notification here if needed
        }
        await loadBookings() // Reload all bookings to get updated data
        // Reset state
        selectedBooking.value = null
        confirmActionType.value = null
      } catch (error) {
        console.error('Error processing booking:', error)
        // Show error message or notification here if needed
      }
    }

    const selectedBooking = ref(null)
    const confirmActionType = ref(null)

    const viewBooking = (booking) => {
      selectedBooking.value = booking
    }

    const changePage = (page) => {
      pagination.value.current_page = page
      loadBookings()
    }

    const getPageNumbers = () => {
      const pages = []
      const current = pagination.value.current_page
      const last = pagination.value.last_page

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

    const getStatusClass = (status) => {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-gray-100 text-gray-800',
      }
      return classes[status] || 'bg-gray-100 text-gray-800'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'No date'
      try {
        return formatDateID(dateString)
      } catch (error) {
        console.error('Error formatting date:', error)
        return dateString
      }
    }

    const formatTime = (dateString) => {
      if (!dateString) return '--:--'
      try {
        return formatTimeID(dateString)
      } catch (error) {
        console.error('Error formatting time:', error)
        return dateString
      }
    }

    // Remove unused debounceSearch since we're using watch
    onMounted(() => {
      loadBookings()
      loadStats()
    })

    // Auto-refresh via polling every 30s when tab visible
    usePolling(
      async () => {
        await Promise.all([loadBookings(), loadStats()])
      },
      { intervalMs: 30000, immediate: false },
    )

    return {
      loading,
      bookings,
      stats,
      showStats,
      filters,
      pagination,
      loadBookings,
      loadStats,
      viewBooking,
      changePage,
      getPageNumbers,
      getStatusClass,
      formatDate,
      formatTime,
      selectedBooking,
      confirmActionType,
      confirmAction,
      handleConfirm,
      resetFilters,
    }
  },
}
</script>
