// src/stores/auth.js
import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles?.includes('Admin'),
    isUser: (state) => state.user?.roles?.includes('User'),
    userName: (state) => state.user?.name || '',
    userEmail: (state) => state.user?.email || '',
  },

  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const response = await authAPI.login(credentials)
        const { user, token } = response.data.data

        this.user = user
        this.token = token

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)

        return { success: true }
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Login failed',
          errors: error.response?.data?.errors || {},
        }
      } finally {
        this.loading = false
      }
    },

    async register(userData) {
      this.loading = true
      try {
        const response = await authAPI.register(userData)
        return { success: true, data: response.data }
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || 'Registration failed',
          errors: error.response?.data?.errors || {},
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await authAPI.logout()
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.clearAuth()
      }
    },

    async logoutAll() {
      try {
        await authAPI.logoutAll()
      } catch (error) {
        console.error('Logout all error:', error)
      } finally {
        this.clearAuth()
      }
    },

    async fetchUser() {
      try {
        const response = await authAPI.me()
        this.user = response.data.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        console.error('Fetch user error:', error)
        this.clearAuth()
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
