import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  const showNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      duration: notification.duration || 5000,
      autoClose: notification.autoClose !== false,
    }

    notifications.value.push(newNotification)

    // Auto remove after duration
    if (newNotification.autoClose && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const showSuccess = (title, message = '') => {
    return showNotification({
      type: 'success',
      title,
      message,
    })
  }

  const showError = (title, message = '') => {
    return showNotification({
      type: 'error',
      title,
      message,
    })
  }

  const showWarning = (title, message = '') => {
    return showNotification({
      type: 'warning',
      title,
      message,
    })
  }

  const showInfo = (title, message = '') => {
    return showNotification({
      type: 'info',
      title,
      message,
    })
  }

  const clearAll = () => {
    notifications.value = []
  }

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeNotification,
    clearAll,
  }
}
