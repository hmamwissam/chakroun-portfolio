import axios from 'axios';

const API = axios.create({
  baseURL: 'https://chakroun-portfolio.onrender.com/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      // Only redirect if not already on the login page to avoid loops
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (credentials) => API.post('/auth/login', credentials),
};

export const hero = {
  get: () => API.get('/hero'),
  update: (data) => API.put('/hero', data),
};

export const skills = {
  getAll: () => API.get('/skills'),
  create: (data) => API.post('/skills', data),
  update: (id, data) => API.put(`/skills/${id}`, data),
  delete: (id) => API.delete(`/skills/${id}`),
};

export const projects = {
  getAll: () => API.get('/projects'),
  create: (data) => API.post('/projects', data),
  update: (id, data) => API.put(`/projects/${id}`, data),
  delete: (id) => API.delete(`/projects/${id}`),
};

export const experience = {
  getAll: () => API.get('/experience'),
  create: (data) => API.post('/experience', data),
  update: (id, data) => API.put(`/experience/${id}`, data),
  delete: (id) => API.delete(`/experience/${id}`),
};

export const training = {
  get: () => API.get('/training'),
  update: (data) => API.put('/training', data),
};

export const education = {
  get: () => API.get('/education'),
  update: (data) => API.put('/education', data),
};

export const messages = {
  getAll: () => API.get('/messages'),
  markRead: (id) => API.put(`/messages/${id}/read`),
  delete: (id) => API.delete(`/messages/${id}`),
};

export const quote = {
  get: () => API.get('/quote'),
  update: (data) => API.put('/quote', data),
};

export const contactInfo = {
  get: () => API.get('/contact'),
  update: (data) => API.put('/contact', data),
};

export const upload = {
  post: (formData) => API.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default API;
