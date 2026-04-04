import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
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

export default API;
