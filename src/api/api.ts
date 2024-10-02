import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7206/api', // Corrige a URL da API para o endereço correto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
