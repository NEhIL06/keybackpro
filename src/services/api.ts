import axios from 'axios';

const getBaseURL = () => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    return 'http://localhost:3001/api';
  }
  
  // In production, use relative URLs since frontend and backend are on the same domain
  return '/api';
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiKeyData {
  name: string;
  keyValue: string;
  category: string;
  description?: string;
  service?: string;
}

export interface ApiKeyUpdateData {
  name?: string;
  category?: string;
  description?: string;
  service?: string;
}

export const authAPI = {
  login: (data: LoginData) => api.post('/auth/login', data),
  register: (data: RegisterData) => api.post('/auth/register', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const apiKeysAPI = {
  getAll: (params?: { category?: string; search?: string }) => 
    api.get('/keys', { params }),
  getById: (id: string) => api.get(`/keys/${id}`),
  create: (data: ApiKeyData) => api.post('/keys', data),
  update: (id: string, data: ApiKeyUpdateData) => api.put(`/keys/${id}`, data),
  delete: (id: string) => api.delete(`/keys/${id}`),
  getStats: () => api.get('/keys/stats/categories'),
};

export default api;