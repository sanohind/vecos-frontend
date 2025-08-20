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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <p class="text-xs text-gray-400">ID: {{ vehicle.vehicle_id }}</p>
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
          <div
            v-if="filteredVehicles.length > itemsPerPage"
            class="mt-6 flex items-center justify-between"
          >
            <div class="text-sm text-gray-700">
              Showing {{ startIndex + 1 }} to {{ endIndex }} of
              {{ filteredVehicles.length }} results
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
    </div>
  </AppLayout>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { usePolling } from '@/utils/usePolling'
import { vehicleAPI } from '@/services/api'
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

    const filters = ref({
      search: '',
      status: '',
    })

    const fetchVehicles = async () => {
      loading.value = true
      try {
        const response = await (authStore.isAdmin ? vehicleAPI.getAll() : vehicleAPI.getAvailable())
        console.log('🚗 Vehicles API Response:', response.data)
        if (response.data.code === 200) {
          vehicles.value = response.data.data.data
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

    const filteredVehicles = computed(() => {
      let filtered = vehicles.value

      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(
          (vehicle) =>
            vehicle.brand?.toLowerCase().includes(search) ||
            vehicle.model?.toLowerCase().includes(search) ||
            vehicle.plat_no?.toLowerCase().includes(search) ||
            vehicle.vehicle_id?.toLowerCase().includes(search),
        )
      }

      if (filters.value.status) {
        filtered = filtered.filter((vehicle) => vehicle.status === filters.value.status)
      }

      return filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredVehicles.value.length / itemsPerPage.value)
    })

    const startIndex = computed(() => {
      return (currentPage.value - 1) * itemsPerPage.value
    })

    const endIndex = computed(() => {
      return Math.min(startIndex.value + itemsPerPage.value, filteredVehicles.value.length)
    })

    const paginatedVehicles = computed(() => {
      return filteredVehicles.value.slice(startIndex.value, endIndex.value)
    })

    const resetFilters = () => {
      filters.value = {
        search: '',
        status: '',
      }
      currentPage.value = 1
    }

    const formatDate = (dateString) => {
      return formatDateID(dateString, { month: 'short' })
    }

    const getStatusClass = (status) => {
      const statusClasses = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-red-100 text-red-800',
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    // Add showBookingModal ref
    const showBookingModal = ref(false)
    const selectedVehicle = ref(null)

    const bookVehicle = (vehicle) => {
      selectedVehicle.value = vehicle
      showBookingModal.value = true
    }

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
      },
      { deep: true },
    )

    onMounted(() => {
      fetchVehicles()
    })

    // Auto-refresh vehicle list every 30s while visible
    usePolling(() => fetchVehicles(), { intervalMs: 30000, immediate: false })

    const handleBookingCreated = () => {
      showBookingModal.value = false
      // Optionally refresh vehicles list if status might change
      fetchVehicles()
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
