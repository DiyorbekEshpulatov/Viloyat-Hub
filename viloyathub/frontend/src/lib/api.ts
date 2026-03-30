// frontend/src/lib/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  login: (phone: string, password: string) =>
    apiClient.post('/auth/login', { phone, password }),
  
  register: (data: any) =>
    apiClient.post('/auth/register', data),
  
  verifyOTP: (phone: string, code: string) =>
    apiClient.post('/auth/verify-otp', { phone, code }),
  
  // Grants
  getGrants: (filters?: any) =>
    apiClient.get('/grants', { params: filters }).then(res => res.data),
  
  getMatchedGrants: () =>
    apiClient.get('/grants/match').then(res => res.data),
  
  getGrant: (id: string) =>
    apiClient.get(`/grants/${id}`).then(res => res.data),
  
  applyForGrant: (id: string, notes?: string) =>
    apiClient.post(`/grants/${id}/apply`, { notes }),
  
  // AI Mentor
  sendMessage: (message: string, sessionId?: string) =>
    apiClient.post('/mentor/chat', { message, sessionId }).then(res => res.data),
  
  getChatHistory: () =>
    apiClient.get('/mentor/chats').then(res => res.data),
  
  // Map
  getMapPoints: (type?: string) =>
    apiClient.get('/map/points', { params: { type } }).then(res => res.data),
  
  getUserLocation: () =>
    apiClient.get('/map/location').then(res => res.data),
  
  // User
  getUserProfile: () =>
    apiClient.get('/users/profile').then(res => res.data),
  
  updateProfile: (data: any) =>
    apiClient.put('/users/profile', data).then(res => res.data),
  
  getUserStats: () =>
    apiClient.get('/users/stats').then(res => res.data),
  
  // Marketplace
  getProducts: (filters?: any) =>
    apiClient.get('/marketplace/products', { params: filters }).then(res => res.data),
  
  createProduct: (data: any) =>
    apiClient.post('/marketplace/products', data).then(res => res.data),
  
  getOrders: () =>
    apiClient.get('/marketplace/orders').then(res => res.data),
};