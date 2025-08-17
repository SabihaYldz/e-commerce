import axios from 'axios';

// API base URL'ini buraya ekleyin
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Rolleri getirme
const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    console.error('Roller yüklenirken hata oluştu:', error);
    throw error;
  }
};

// Ürünleri getirme
const getProducts = async (params = {}) => {
  try {
    const { limit = 25, offset = 0, filter = '' } = params;
    const response = await api.get('/products', {
      params: {
        limit,
        offset,
        filter,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ürünler yüklenirken hata oluştu:', error);
    throw error;
  }
};

// Kategorileri getirme
const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Kategoriler yüklenirken hata oluştu:', error);
    throw error;
  }
};

export const apiService = {
  getRoles,
  getProducts,
  getCategories,
};

export default apiService;