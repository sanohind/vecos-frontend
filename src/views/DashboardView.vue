<!-- src/views/DashboardView.vue -->
<template>
  <AppLayout>
    <div class="px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">
          Welcome back, {{ authStore.userName }}! Here's an overview of your vehicle bookings.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <!-- Total Vehicles -->
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-lg flex items-center justify-center"
                  style="background-color: #0a2856"
                >
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-600 truncate">Total Vehicles</dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ stats.totalVehicles || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Vehicles -->
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-600 truncate">Available Vehicles</dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ stats.availableVehicles || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- All/My Bookings -->
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-600 truncate">
                    {{ authStore.isAdmin ? 'All Bookings' : 'My Bookings' }}
                  </dt>
                  <dd class="text-2xl font-semibold text-gray-900">{{ stats.myBookings || 0 }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Bookings -->
        <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-600 truncate">Pending Bookings</dt>
                  <dd class="text-2xl font-semibold text-gray-900">
                    {{ stats.pendingBookings || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent Bookings -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Recent Bookings</h3>
          </div>
          <div class="p-6">
            <div v-if="recentBookings.length === 0" class="text-center py-8">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No recent bookings</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by creating a new booking.</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="booking in recentBookings"
                :key="booking.id"
                class="flex items-center space-x-3"
              >
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                    style="background-color: #0a2856"
                  >
                    {{
                      (booking.vehicle.brand + ' ' + booking.vehicle.model).charAt(0).toUpperCase()
                    }}
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ booking.vehicle.brand }} {{ booking.vehicle.model }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(booking.start_time) }} at {{ formatTime(booking.start_time) }}
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusClass(booking.status)"
                  >
                    {{ booking.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Available Vehicles -->
        <div class="bg-white shadow-sm rounded-lg border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Available Vehicles</h3>
            <router-link
                to="/vehicles"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Browse
              </router-link>
          </div>
          <div class="p-6">
            <div v-if="availableVehicles.length === 0" class="text-center py-8">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No vehicles available</h3>
              <p class="mt-1 text-sm text-gray-500">All vehicles are currently booked.</p>
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="vehicle in availableVehicles"
                :key="vehicle.id"
                class="flex items-center space-x-3"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      class="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ vehicle.brand }} {{ vehicle.model }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ vehicle.plat_no }}
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <router-link
                    v-if="!authStore.isAdmin && vehicle.status === 'active'"
                    :to="`/my-bookings?vehicle=${vehicle.id}`"
                    class="text-sm font-medium hover:underline transition-colors"
                    style="color: #0a2856"
                  >
                    Book
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Schedule -->
      <div class="mt-8 bg-white shadow-sm rounded-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Booking Schedule</h3>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">Next 2 days</span>
            <!-- Toggle for showing duplicate bookings (All Users) -->
            <div class="flex items-center space-x-2">
              <label class="text-sm text-gray-600">Show multi-day bookings:</label>
              <input
                type="checkbox"
                v-model="showDuplicateBookings"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <button
              @click="loadCalendarBookings"
              class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg
                class="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                ></path>
              </svg>
              Refresh
            </button>
            <router-link
                v-if="!authStore.isAdmin"
                to="/my-bookings"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                style="background-color: #0a2856; --tw-ring-color: #0a2856"
                @mouseover="$event.target.style.backgroundColor = '#083144'"
                @mouseout="$event.target.style.backgroundColor = '#0A2856'"
              >
                Book Now
              </router-link>
          </div>
        </div>
        <div class="p-6">
          <div v-if="scheduleData.length === 0" class="text-center py-8">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No schedule data</h3>
            <p class="mt-1 text-sm text-gray-500">Schedule data will appear here after refresh.</p>
          </div>
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              v-for="day in filteredScheduleData"
              :key="day.date"
              class="border border-gray-200 rounded-lg p-4"
              :class="{
                'bg-blue-50 border-blue-200': day.is_today,
                'bg-green-50 border-green-200': day.is_tomorrow,
                'bg-gray-50': !day.is_today && !day.is_tomorrow,
              }"
            >
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-lg font-semibold text-gray-900">
                  {{ day.day_name }}, {{ formatDate(day.date) }}
                  <span
                    v-if="day.is_today"
                    class="ml-2 inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    Today
                  </span>
                  <span
                    v-if="day.is_tomorrow"
                    class="ml-2 inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                  >
                    Tomorrow
                  </span>
                </h4>
                <span class="text-sm text-gray-500">
                  {{ day.bookings.length }} booking{{ day.bookings.length !== 1 ? 's' : '' }}
                  <span
                    v-if="!showDuplicateBookings && hasDuplicateBookings(day)"
                    class="ml-2 text-xs text-blue-600"
                  >
                    (filtered)
                  </span>
                </span>
              </div>

              <div
                v-if="day.bookings.length === 0"
                class="text-sm text-gray-500 bg-white p-3 rounded-md border"
              >
                No approved bookings for this day.
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="booking in day.bookings"
                  :key="`${day.date}-${booking.id}`"
                  class="bg-white p-4 rounded-md border border-gray-200 shadow-sm"
                  :class="{
                    'border-blue-300 bg-blue-50': isMultiDayBooking(booking, day.date),
                  }"
                >
                  <!-- Multi-day indicator -->
                  <div v-if="isMultiDayBooking(booking, day.date)" class="mb-3">
                    <span
                      class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      <svg
                        class="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Multi-day Booking
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div class="font-medium text-gray-900 text-lg">
                        {{ booking.vehicle.display_name }}
                      </div>
                      <div class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Plate:</span> {{ booking.vehicle.plat_no }}
                      </div>
                      <div class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Time:</span>
                        {{
                          booking.time_display ||
                          `${formatTimeID(booking.start_time)} - ${formatTimeID(booking.end_time)}`
                        }}
                      </div>
                      <div class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Duration:</span>
                        {{ booking.duration_hours }} hour{{
                          booking.duration_hours !== 1 ? 's' : ''
                        }}
                      </div>
                      <!-- Show full date range for multi-day bookings -->
                      <div
                        v-if="isMultiDayBooking(booking, day.date)"
                        class="text-sm text-gray-600 mt-1"
                      >
                        <span class="font-medium">Full Period:</span>
                        {{ formatFullDateRange(booking.start_time, booking.end_time) }}
                      </div>
                    </div>
                    <div>
                      <!-- Show driver info only for admin -->
                      <div v-if="authStore.isAdmin" class="text-sm text-gray-600">
                        <span class="font-medium">Driver:</span> {{ booking.user.name }}
                      </div>
                      <div v-if="authStore.isAdmin" class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Department:</span> {{ booking.user.department }}
                      </div>
                      <div v-if="booking.destination" class="text-sm text-gray-600 mt-1">
                        <span class="font-medium">Destination:</span> {{ booking.destination }}
                      </div>
                      <div class="mt-3">
                        <span
                          class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                        >
                          Approved
                        </span>
                      </div>
                    </div>
                  </div>
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
import { ref, onMounted, computed } from 'vue'
import AppLayout from '@/components/Layout/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { vehicleAPI, bookingAPI } from '@/services/api'
import {
  formatDateID,
  formatTimeID,
  formatDateTimeID,
  parseDbDateTimeToLocalDate,
} from '@/utils/datetime'

export default {
  name: 'DashboardView',
  components: {
    AppLayout,
  },
  setup() {
    const authStore = useAuthStore()
    const stats = ref({})
    const recentBookings = ref([])
    const availableVehicles = ref([])
    const calendarBookings = ref([])
    const scheduleData = ref([]) // New ref for detailed schedule
    const showDuplicateBookings = ref(true) // New ref for duplicate booking toggle

    // Computed property to filter schedule data
    const filteredScheduleData = computed(() => {
      if (showDuplicateBookings.value) {
        return scheduleData.value
      }

      // Filter out duplicate bookings by keeping only unique booking IDs
      const seenBookings = new Set()
      return scheduleData.value.map((day) => ({
        ...day,
        bookings: day.bookings.filter((booking) => {
          if (seenBookings.has(booking.id)) {
            return false
          }
          seenBookings.add(booking.id)
          return true
        }),
      }))
    })

    const loadStats = async () => {
      try {
        console.log('🔍 Loading dashboard data...')

        // Check if user is authenticated
        if (!authStore.isAuthenticated) {
          console.log('❌ User not authenticated')
          return
        }

        const [vehiclesResponse, bookingsResponse, statsResponse] = await Promise.all([
          vehicleAPI.getAll(),
          bookingAPI.getAll({ limit: 5 }),
          bookingAPI.getStats(),
        ])

        console.log('🚗 Vehicles response:', vehiclesResponse.data)
        console.log('📅 Bookings response:', bookingsResponse.data)
        console.log('📊 Stats response:', statsResponse.data)

        stats.value = {
          totalVehicles: vehiclesResponse.data.data.data.length,
          availableVehicles: vehiclesResponse.data.data.data.filter((v) => v.status === 'active')
            .length,
          myBookings: authStore.isAdmin
            ? statsResponse.data.data.total || 0
            : bookingsResponse.data.data.data.length,
          pendingBookings: statsResponse.data.data.pending || 0,
        }

        recentBookings.value = bookingsResponse.data.data.data

        console.log('✅ Dashboard data loaded successfully:', stats.value)
      } catch (error) {
        console.error('❌ Error loading dashboard data:', error)
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        })
      }
    }

    const loadAvailableVehicles = async () => {
      try {
        console.log('🔍 Loading available vehicles...')

        if (!authStore.isAuthenticated) {
          console.log('❌ User not authenticated for vehicles')
          return
        }

        // Get available vehicles without time constraints for dashboard display
        const response = await vehicleAPI.getAll({ status: 'active' })
        console.log('🚗 Available vehicles response:', response.data)

        availableVehicles.value = response.data.data.data.slice(0, 5)
        console.log('✅ Available vehicles loaded:', availableVehicles.value)
      } catch (error) {
        console.error('❌ Error loading available vehicles:', error)
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        })
      }
    }

    const loadCalendarBookings = async () => {
      try {
        console.log('🔍 Loading schedule data...')

        if (!authStore.isAuthenticated) {
          console.log('❌ User not authenticated for schedule')
          return
        }

        // Use the new schedule endpoint with default 2 days (today + tomorrow)
        const response = await bookingAPI.getSchedule({
          days: 2,
        })

        console.log('📅 Schedule response:', response.data)

        if (response.data.code === 200) {
          // Store the full schedule data for detailed view
          scheduleData.value = response.data.data.schedule

          // Extract bookings from the schedule data for backward compatibility
          const allBookings = []

          scheduleData.value.forEach((day) => {
            day.bookings.forEach((booking) => {
              allBookings.push({
                id: booking.id,
                start_time: booking.start_time,
                end_time: booking.end_time,
                status: 'approved', // Schedule only shows approved bookings
                vehicle: {
                  brand: booking.vehicle.brand,
                  model: booking.vehicle.model,
                  plat_no: booking.vehicle.plat_no,
                },
                user: {
                  name: booking.user.name,
                  department: booking.user.department,
                },
                destination: booking.destination,
              })
            })
          })

          calendarBookings.value = allBookings
          console.log('✅ Schedule data loaded:', scheduleData.value)
          console.log('✅ Extracted bookings:', allBookings)
        } else {
          console.error('❌ Schedule API returned error:', response.data)
          scheduleData.value = []
          calendarBookings.value = []
        }
      } catch (error) {
        console.error('❌ Error loading schedule data:', error)
        calendarBookings.value = []
      }
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

    const formatDate = (date) => {
      if (!date) return ''
      try {
        // For schedule dates, format them nicely
        const dateObj = new Date(date)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)

        if (dateObj.toDateString() === today.toDateString()) {
          return 'Today'
        } else if (dateObj.toDateString() === tomorrow.toDateString()) {
          return 'Tomorrow'
        } else {
          return formatDateID(date)
        }
      } catch (error) {
        return formatDateID(date)
      }
    }

    const formatTime = (time) => {
      if (!time) return ''
      try {
        return formatTimeID(time)
      } catch (error) {
        return time
      }
    }

    const isMultiDayBooking = (booking, dayDate) => {
      try {
        const startDate = new Date(booking.start_time)
        const endDate = new Date(booking.end_time)
        const dayDateObj = new Date(dayDate)

        // Check if booking spans multiple days
        const startDay = startDate.getDate()
        const endDay = endDate.getDate()
        const startMonth = startDate.getMonth()
        const endMonth = endDate.getMonth()
        const startYear = startDate.getFullYear()
        const endYear = endDate.getFullYear()

        // Return true if booking spans multiple days
        return !(startDay === endDay && startMonth === endMonth && startYear === endYear)
      } catch (error) {
        console.error('Error checking multi-day booking:', error)
        return false
      }
    }

    const formatFullDateRange = (start, end) => {
      try {
        // Use the parseDbDateTimeToLocalDate to handle timezone correctly
        const startDate = parseDbDateTimeToLocalDate(start)
        const endDate = parseDbDateTimeToLocalDate(end)

        if (!startDate || !endDate) {
          return `${start} - ${end}`
        }

        // Format using the datetime utility functions for consistency
        const startFormatted = `${formatDateID(startDate)}, ${formatTimeID(startDate)}`
        const endFormatted = `${formatDateID(endDate)}, ${formatTimeID(endDate)}`

        return `${startFormatted} - ${endFormatted}`
      } catch (error) {
        console.error('Error formatting date range:', error)
        // Fallback: use the time_display from API if available
        return `${start} - ${end}`
      }
    }

    const getMonthName = (monthIndex) => {
      const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ]
      return months[monthIndex]
    }

    const hasDuplicateBookings = (day) => {
      // Check if this day has bookings that appear in other days
      const allBookings = scheduleData.value.flatMap((d) => d.bookings)
      const bookingIds = allBookings.map((b) => b.id)
      const uniqueIds = new Set(bookingIds)

      return bookingIds.length > uniqueIds.size
    }

    const bookingsToday = computed(() => {
      const today = new Date()
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
      return calendarBookings.value
        .filter((b) => {
          const s = parseDbDateTimeToLocalDate(b.start_time)
          return s >= start && s <= end
        })
        .sort(
          (a, b) =>
            parseDbDateTimeToLocalDate(a.start_time) - parseDbDateTimeToLocalDate(b.start_time),
        )
    })

    const bookingsTomorrow = computed(() => {
      const today = new Date()
      const tmr = new Date(today)
      tmr.setDate(today.getDate() + 1)
      const start = new Date(tmr.getFullYear(), tmr.getMonth(), tmr.getDate(), 0, 0, 0)
      const end = new Date(tmr.getFullYear(), tmr.getMonth(), tmr.getDate(), 23, 59, 59)
      return calendarBookings.value
        .filter((b) => {
          const s = parseDbDateTimeToLocalDate(b.start_time)
          return s >= start && s <= end
        })
        .sort(
          (a, b) =>
            parseDbDateTimeToLocalDate(a.start_time) - parseDbDateTimeToLocalDate(b.start_time),
        )
    })

    onMounted(() => {
      console.log('🎯 Dashboard mounted')
      console.log('🔐 Auth status:', {
        isAuthenticated: authStore.isAuthenticated,
        token: authStore.token ? 'Present' : 'Missing',
        user: authStore.user,
      })

      loadStats()
      loadAvailableVehicles()
      loadCalendarBookings()
    })

    return {
      authStore,
      stats,
      recentBookings,
      availableVehicles,
      getStatusClass,
      formatDate,
      formatTime,
      formatDateTimeID,
      calendarBookings,
      bookingsToday,
      bookingsTomorrow,
      scheduleData, // Expose scheduleData to template
      isMultiDayBooking,
      formatFullDateRange,
      getMonthName,
      showDuplicateBookings, // Expose showDuplicateBookings to template
      filteredScheduleData, // Expose filteredScheduleData to template
      hasDuplicateBookings, // Expose hasDuplicateBookings to template
    }
  },
}
</script>
