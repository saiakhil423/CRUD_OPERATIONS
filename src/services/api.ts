import axios from 'axios';
import type { Employee } from '../types/employee';
import { getAccessToken, refreshToken, logout } from './auth';

const API_BASE = 'http://127.0.0.1:8000/api/';

const apiClient = axios.create({
  baseURL: API_BASE,
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getEmployees = () => apiClient.get<Employee[]>('employees/');

export const createEmployee = (data: Employee) => apiClient.post('employees/', data);

export const updateEmployee = (id: number, data: Employee) => apiClient.put(`employees/${id}/`, data);

export const deleteEmployee = (id: number) => apiClient.delete(`employees/${id}/`);

// Other API calls

import type { EmployeeStats, LocationStat } from '../types/employee';

export const fetchEmployeeStats = async (): Promise<EmployeeStats> => {
  const response = await apiClient.get('employee-stats/');
  console.log('fetchEmployeeStats response:', response.data);
  return response.data;
};

export const fetchLocationStats = async (): Promise<LocationStat[]> => {
  const response = await apiClient.get('location-stats/');
  console.log('fetchLocationStats response:', response.data);
  return response.data;
};

export const fetchRecentHires = async (): Promise<Employee[]> => {
  const response = await apiClient.get('recent-hires/');
  console.log('fetchRecentHires response:', response.data);
  return response.data;
};
