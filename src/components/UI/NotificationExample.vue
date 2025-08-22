<template>
  <div class="p-6 bg-white rounded-lg shadow">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Notification Examples</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Success Notifications -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-gray-700">Success Notifications</h3>
        <button
          @click="showBasicSuccess"
          class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Basic Success
        </button>
        <button
          @click="showSuccessWithMessage"
          class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Success with Message
        </button>
        <button
          @click="showSuccessCustomDuration"
          class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Success (10s duration)
        </button>
      </div>

      <!-- Error Notifications -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-gray-700">Error Notifications</h3>
        <button
          @click="showBasicError"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Basic Error
        </button>
        <button
          @click="showErrorWithMessage"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Error with Message
        </button>
        <button
          @click="showErrorNoAutoClose"
          class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Error (No Auto-close)
        </button>
      </div>

      <!-- Warning Notifications -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-gray-700">Warning Notifications</h3>
        <button
          @click="showBasicWarning"
          class="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Basic Warning
        </button>
        <button
          @click="showWarningWithMessage"
          class="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Warning with Message
        </button>
      </div>

      <!-- Info Notifications -->
      <div class="space-y-3">
        <h3 class="text-lg font-medium text-gray-700">Info Notifications</h3>
        <button
          @click="showBasicInfo"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Basic Info
        </button>
        <button
          @click="showInfoWithMessage"
          class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Info with Message
        </button>
      </div>
    </div>

    <!-- Custom Notification -->
    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-medium text-gray-700 mb-3">Custom Notification</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          v-model="customNotification.title"
          type="text"
          placeholder="Title"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="customNotification.message"
          type="text"
          placeholder="Message (optional)"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          v-model="customNotification.type"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>
      <button
        @click="showCustomNotification"
        class="mt-3 w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Show Custom Notification
      </button>
    </div>

    <!-- Utility Buttons -->
    <div class="mt-6 flex space-x-3">
      <button
        @click="clearAllNotifications"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Clear All Notifications
      </button>
      <button
        @click="showMultipleNotifications"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Show Multiple Notifications
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useNotification } from '@/composables/useNotification'

export default {
  name: 'NotificationExample',
  setup() {
    const { showSuccess, showError, showWarning, showInfo, showNotification, clearAll } =
      useNotification()

    const customNotification = ref({
      title: 'Custom Title',
      message: 'This is a custom message',
      type: 'info',
    })

    // Success Examples
    const showBasicSuccess = () => {
      showSuccess('Success!')
    }

    const showSuccessWithMessage = () => {
      showSuccess('Operation Completed', 'Your data has been saved successfully!')
    }

    const showSuccessCustomDuration = () => {
      showNotification({
        type: 'success',
        title: 'Long Success',
        message: 'This notification will stay for 10 seconds',
        duration: 10000,
      })
    }

    // Error Examples
    const showBasicError = () => {
      showError('Error!')
    }

    const showErrorWithMessage = () => {
      showError('Operation Failed', 'Something went wrong. Please try again.')
    }

    const showErrorNoAutoClose = () => {
      showNotification({
        type: 'error',
        title: 'Manual Close Required',
        message: 'This error notification will not auto-close. You must close it manually.',
        autoClose: false,
      })
    }

    // Warning Examples
    const showBasicWarning = () => {
      showWarning('Warning!')
    }

    const showWarningWithMessage = () => {
      showWarning('Attention Required', 'Please review your input before proceeding.')
    }

    // Info Examples
    const showBasicInfo = () => {
      showInfo('Information')
    }

    const showInfoWithMessage = () => {
      showInfo('System Update', 'Your system has been updated to the latest version.')
    }

    // Custom Examples
    const showCustomNotification = () => {
      showNotification({
        type: customNotification.value.type,
        title: customNotification.value.title,
        message: customNotification.value.message,
      })
    }

    const clearAllNotifications = () => {
      clearAll()
    }

    const showMultipleNotifications = () => {
      showSuccess('First Notification', 'This is the first one')
      setTimeout(() => showError('Second Notification', 'This is the second one'), 500)
      setTimeout(() => showWarning('Third Notification', 'This is the third one'), 1000)
      setTimeout(() => showInfo('Fourth Notification', 'This is the fourth one'), 1500)
    }

    return {
      customNotification,
      showBasicSuccess,
      showSuccessWithMessage,
      showSuccessCustomDuration,
      showBasicError,
      showErrorWithMessage,
      showErrorNoAutoClose,
      showBasicWarning,
      showWarningWithMessage,
      showBasicInfo,
      showInfoWithMessage,
      showCustomNotification,
      clearAllNotifications,
      showMultipleNotifications,
    }
  },
}
</script>
