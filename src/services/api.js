// src/services/api.js
import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor untuk menambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  me: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  logoutAll: () => api.post('/auth/logout-all'),
}

// Vehicle API calls
export const vehicleAPI = {
  getAll: (params = {}) => api.get('/vehicles', { params }),
  getAvailable: (params = {}) => api.get('/vehicles', { params: { ...params, status: 'active' } }),
  getById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
}

// Booking API calls
export const bookingAPI = {
  getAll: (params = {}) => api.get('/bookings', { params }),
  getStats: () => api.get('/bookings/stats'),
  getSchedule: (params = {}) => api.get('/bookings/schedule', { params }),
  getAvailableSlots: (params = {}) => api.get('/bookings/available-slots', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  approve: (id) => api.post(`/bookings/${id}/approve`),
  reject: (id) => api.post(`/bookings/${id}/reject`),
}

export default api
