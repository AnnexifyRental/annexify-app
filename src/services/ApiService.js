import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const secureStoreOptions = {
  keychainService: 'myAppKeychain'
};

// Extracted base URL
const BASE_URL = 'http://192.168.1.7:8082/api/app';

const publicApiClient = axios.create({
  baseURL: BASE_URL
});

const apiClient = axios.create({
  baseURL: BASE_URL
});

// Combined request interceptor to add the access token and log the request
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('accessToken', secureStoreOptions);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log the request
    console.log('Request:', config);
  } catch (error) {
    console.error('Access token not found in secure storage: ', error);
  }
  return config;
}, error => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

// Response interceptor to log the response
apiClient.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

export { apiClient, publicApiClient, BASE_URL };