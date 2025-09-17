import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68c827615d8d9f5147347bbd.mockapi.io',
  timeout: 10000,
})

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('authToken')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// );


// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = '/login';
//     }
//     return Promise.reject(error)
//   }
// )
 export{api}