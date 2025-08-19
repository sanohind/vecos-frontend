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

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
        <!-- Book Vehicle (User Only) -->
        <div
          v-if="!authStore.isAdmin"
          class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div
                  class="w-12 h-12 rounded-lg flex items-center justify-center"
                  style="background-color: #0a2856"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Book Vehicle</h3>
                <p class="text-sm text-gray-600">Reserve a vehicle for your needs</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
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
        </div>

        <!-- Manage Bookings (Admin Only) -->
        <div
          v-if="authStore.isAdmin"
          class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Manage Bookings</h3>
                <p class="text-sm text-gray-600">Review and approve user bookings</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/bookings"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Manage
              </router-link>
            </div>
          </div>
        </div>

        <!-- View Vehicles -->
        <div
          class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">View Vehicles</h3>
                <p class="text-sm text-gray-600">Browse available vehicles</p>
              </div>
            </div>
            <div class="mt-4">
              <router-link
                to="/vehicles"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                Browse
              </router-link>
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
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Available Vehicles</h3>
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

      <!-- Booking Schedule (Bottom Section) -->
      <div class="mt-8 bg-white shadow-sm rounded-lg border border-gray-200">
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Booking Schedule</h3>
          <span class="text-sm text-gray-500">Next 30 days</span>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Today -->
          <div>
            <h4 class="text-md font-semibold text-gray-900 mb-3">Book Today</h4>
            <div v-if="bookingsToday.length === 0" class="text-sm text-gray-500">
              No booking today.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="b in bookingsToday"
                :key="`today-${b.id}`"
                class="text-sm text-gray-800 flex items-start"
              >
                <span class="flex-1">
                  <strong
                    >{{ b.vehicle?.brand }} {{ b.vehicle?.model }} {{ b.vehicle?.plat_no }}</strong
                  >
                  <span class="block text-gray-600">
                    {{ formatDateTimeID(b.start_time) }} - {{ formatDateTimeID(b.end_time) }}
                  </span>
                </span>
                <span
                  class="ml-3 inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(b.status)"
                >
                  {{ b.status }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Tomorrow -->
          <div>
            <h4 class="text-md font-semibold text-gray-900 mb-3">Book Tomorrow</h4>
            <div v-if="bookingsTomorrow.length === 0" class="text-sm text-gray-500">
              No booking tomorrow.
            </div>
            <ul v-else class="space-y-2">
              <li
                v-for="b in bookingsTomorrow"
                :key="`tmr-${b.id}`"
                class="text-sm text-gray-800 flex items-start"
              >
                <span class="flex-1">
                  <strong
                    >{{ b.vehicle?.brand }} {{ b.vehicle?.model }} {{ b.vehicle?.plat_no }}</strong
                  >
                  <span class="block text-gray-600">
                    {{ formatDateTimeID(b.start_time) }} - {{ formatDateTimeID(b.end_time) }}
                  </span>
                </span>
                <span
                  class="ml-3 inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(b.status)"
                >
                  {{ b.status }}
                </span>
              </li>
            </ul>
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

    const toDbDateTime = (d) => {
      const pad = (n) => String(n).padStart(2, '0')
      const y = d.getFullYear()
      const m = pad(d.getMonth() + 1)
      const day = pad(d.getDate())
      const hh = pad(d.getHours())
      const mm = pad(d.getMinutes())
      const ss = pad(d.getSeconds())
      return `${y}-${m}-${day} ${hh}:${mm}:${ss}`
    }

    const loadCalendarBookings = async () => {
      try {
        // Fetch bookings in a range (today to +30 days)
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        const end = new Date(start)
        end.setDate(start.getDate() + 30)
        end.setHours(23, 59, 59)

        const response = await bookingAPI.getAll({
          start_date: toDbDateTime(start),
          end_date: toDbDateTime(end),
          per_page: 1000,
        })
        calendarBookings.value = response.data?.data?.data || []
      } catch (error) {
        console.error('Error loading calendar bookings:', error)
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
      return formatDateID(date)
    }

    const formatTime = (time) => {
      if (!time) return ''
      try {
        return formatTimeID(time)
      } catch (error) {
        return time
      }
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
    }
  },
}
</script>
