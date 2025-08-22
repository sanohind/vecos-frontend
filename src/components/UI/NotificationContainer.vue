<template>
  <div class="fixed top-4 right-4 z-[9999] space-y-4">
    <TransitionGroup
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      move-class="transition-transform duration-300"
    >
      <NotificationToast
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.type"
        :title="notification.title"
        :message="notification.message"
        :duration="notification.duration"
        :auto-close="notification.autoClose"
        @close="removeNotification(notification.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import { useNotification } from '@/composables/useNotification'
import NotificationToast from './NotificationToast.vue'

export default {
  name: 'NotificationContainer',
  components: {
    NotificationToast,
  },
  setup() {
    const { notifications, removeNotification } = useNotification()

    return {
      notifications,
      removeNotification,
    }
  },
}
</script>
