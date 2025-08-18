<!-- src/views/NotFoundView.vue -->
<template>
  <div class="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h1 class="text-6xl font-bold text-gray-900">404</h1>
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Page not found
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <router-link
              to="/dashboard"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go back to dashboard
            </router-link>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-1 gap-3">
              <router-link
                to="/login"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Sign in to your account
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="hidden lg:block relative w-0 flex-1">
      <div class="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
        <div class="text-center text-white">
          <svg class="mx-auto h-32 w-32 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <h3 class="mt-4 text-xl font-medium">Vehicle Control System</h3>
          <p class="mt-2 text-indigo-200">Manage your fleet efficiently</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>