import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://chakroun-portfolio.onrender.com/api';

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const hero = {
  get: () => API.get('/hero'),
};

export const skills = {
  getAll: () => API.get('/skills'),
};

export const projects = {
  getAll: () => API.get('/projects'),
};

export const experience = {
  getAll: () => API.get('/experience'),
};

export const training = {
  get: () => API.get('/training'),
};

export const education = {
  get: () => API.get('/education'),
};

export const messages = {
  send: (data) => API.post('/messages', data),
};

export const quote = {
  get: () => API.get('/quote'),
};

export const contactInfo = {
  get: () => API.get('/contact'),
};

export const portfolio = {
  bootstrap: () => API.get('/portfolio/bootstrap'),
};

export default API;
