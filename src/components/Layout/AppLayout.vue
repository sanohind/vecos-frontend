<!-- src/components/Layout/AppLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <!-- Left side - Logo & Navigation -->
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <img src="@/assets/sanoh-logo.png" alt="Sanoh Logo" class="h-8 w-auto mr-4" />
              <h1 class="text-lg font-semibold text-gray-900">Vehicle Control System</h1>
            </div>

            <!-- Navigation Menu -->
            <div class="hidden md:ml-8 md:flex md:space-x-1">
              <router-link
                to="/dashboard"
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="
                  $route.name === 'dashboard'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                "
                :style="$route.name === 'dashboard' ? 'background-color: #0A2856' : ''"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                  ></path>
                </svg>
                Dashboard
              </router-link>

              <router-link
                to="/vehicles"
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="
                  $route.name === 'vehicles'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                "
                :style="$route.name === 'vehicles' ? 'background-color: #0A2856' : ''"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
                {{ authStore.isAdmin ? 'Manage Vehicles' : 'View Vehicles' }}
              </router-link>

              <router-link
                v-if="authStore.isAdmin"
                to="/bookings"
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="
                  $route.name === 'bookings'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                "
                :style="$route.name === 'bookings' ? 'background-color: #0A2856' : ''"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                All Bookings
              </router-link>

              <router-link
                v-if="!authStore.isAdmin"
                to="/my-bookings"
                class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="
                  $route.name === 'my-bookings'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                "
                :style="$route.name === 'my-bookings' ? 'background-color: #0A2856' : ''"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                My Bookings
              </router-link>
            </div>
          </div>

          <!-- Right side - User menu -->
          <div class="hidden md:ml-6 md:flex md:items-center">
            <div class="ml-3 relative">
              <Menu as="div" class="relative inline-block text-left">
                <div>
                  <MenuButton
                    class="bg-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div
                      class="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium"
                      style="background-color: #0a2856"
                    >
                      {{ authStore.userName.charAt(0).toUpperCase() }}
                    </div>
                  </MenuButton>
                </div>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div class="py-1">
                      <MenuItem v-slot="{ active }">
                        <div class="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                          <div class="font-medium">{{ authStore.userName }}</div>
                          <div class="text-xs text-gray-500 mt-1">{{ authStore.userEmail }}</div>
                          <div class="text-xs mt-1" style="color: #0a2856">
                            {{ authStore.isAdmin ? 'Administrator' : 'User' }}
                          </div>
                        </div>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          @click="handleLogout"
                          :class="[
                            active ? 'bg-gray-50' : '',
                            'block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-50',
                          ]"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200">
          <router-link
            to="/dashboard"
            class="block pl-3 pr-4 py-2 text-base font-medium rounded-md mx-2"
            :class="
              $route.name === 'dashboard'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            "
            :style="$route.name === 'dashboard' ? 'background-color: #0A2856' : ''"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                ></path>
              </svg>
              Dashboard
            </div>
          </router-link>

          <router-link
            to="/vehicles"
            class="block pl-3 pr-4 py-2 text-base font-medium rounded-md mx-2"
            :class="
              $route.name === 'vehicles'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            "
            :style="$route.name === 'vehicles' ? 'background-color: #0A2856' : ''"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              {{ authStore.isAdmin ? 'Manage Vehicles' : 'View Vehicles' }}
            </div>
          </router-link>

          <router-link
            v-if="authStore.isAdmin"
            to="/bookings"
            class="block pl-3 pr-4 py-2 text-base font-medium rounded-md mx-2"
            :class="
              $route.name === 'bookings'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            "
            :style="$route.name === 'bookings' ? 'background-color: #0A2856' : ''"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              All Bookings
            </div>
          </router-link>

          <router-link
            v-if="!authStore.isAdmin"
            to="/my-bookings"
            class="block pl-3 pr-4 py-2 text-base font-medium rounded-md mx-2"
            :class="
              $route.name === 'my-bookings'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            "
            :style="$route.name === 'my-bookings' ? 'background-color: #0A2856' : ''"
            @click="mobileMenuOpen = false"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              My Bookings
            </div>
          </router-link>
        </div>

        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="px-4">
            <div class="text-base font-medium text-gray-800">{{ authStore.userName }}</div>
            <div class="text-sm text-gray-600">{{ authStore.userEmail }}</div>
          </div>
          <div class="mt-3 space-y-1">
            <button
              @click="handleLogout"
              class="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'AppLayout',
  components: {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { showSuccess } = useNotification()
    const mobileMenuOpen = ref(false)

    const handleLogout = async () => {
      await authStore.logout()
      showSuccess('Logged Out', 'You have been logged out successfully!')
      router.push('/login')
    }

    return {
      authStore,
      mobileMenuOpen,
      handleLogout,
      showSuccess,
    }
  },
}
</script>
