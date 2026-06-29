import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skinwise_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('skinwise_token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Auth
export const authAPI = {
  register:  (data) => api.post('/auth/register', data),
  login:     (data) => api.post('/auth/login', data),
  me:        ()     => api.get('/auth/me'),
  updateMe:  (data) => api.put('/auth/me', data),
}

// Skin Quiz
export const quizAPI = {
  submit: (answers) => api.post('/quiz/submit', { answers }),
  getResult: (userId) => api.get(`/quiz/result/${userId}`),
}

// Skin Library
export const skinAPI = {
  getConcerns: () => api.get('/skin/concerns'),
  getConcern: (slug) => api.get(`/skin/concerns/${slug}`),
}

// Ingredient Library
export const ingredientAPI = {
  getAll: (params) => api.get('/ingredients', { params }),
  getOne: (slug) => api.get(`/ingredients/${slug}`),
}

// Products
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
}

// Dashboard / Routines
export const routineAPI = {
  getSaved: () => api.get('/routines'),
  save: (data) => api.post('/routines', data),
  delete: (id) => api.delete(`/routines/${id}`),
}

export default api
