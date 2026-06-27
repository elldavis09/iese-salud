import axios from 'axios';

// Crear una instancia de Axios con la URL base y los encabezados predeterminados
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

// Interceptor para agregar el token de autenticación a cada solicitud
apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
})

export default apiClient;