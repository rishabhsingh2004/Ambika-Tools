// src/services/api.js
// Central API layer — all backend calls go through here

import axios from 'axios';
import { clearToken } from '../pages/admin/utils/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_KEY = 'ambika_admin_token';

// ── Axios instance ────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request (admin routes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration/401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────

export const adminLogin = (credentials) =>
  api.post('/api/auth/login', credentials);

export const adminMe = () =>
  api.get('/api/auth/me');

// ── Products ──────────────────────────────────────────────

export const getProducts = (params) =>
  api.get('/api/products', { params });

export const getProductById = (id) =>
  api.get(`/api/products/${id}`);

export const addProduct = (data) => {
  // data may contain a File — use multipart if image file present
  if (data instanceof FormData) {
    return api.post('/api/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return api.post('/api/products', data);
};

export const updateProduct = (id, data) => {
  if (data instanceof FormData) {
    return api.put(`/api/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  return api.put(`/api/products/${id}`, data);
};

export const deleteProduct = (id) =>
  api.delete(`/api/products/${id}`);

// ── Categories ────────────────────────────────────────────

export const getCategories = () =>
  api.get('/api/categories');

// ── Enquiries ─────────────────────────────────────────────

export const submitEnquiry = (data) =>
  api.post('/api/enquiries', data);

export const getEnquiries = (params) =>
  api.get('/api/enquiries', { params });

export const updateEnquiryStatus = (id, status) =>
  api.put(`/api/enquiries/${id}`, { status });

export const deleteEnquiry = (id) =>
  api.delete(`/api/enquiries/${id}`);

export default api;
