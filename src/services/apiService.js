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

/*class ApiService {
    API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.API_URL}/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`
                }
            });
            console.log(`API_SERVICE_GET: ${response}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || response.statusText);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postData(endpoint, data) {
        try {
            const response = await fetch(`${this.API_URL}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                },
                body: JSON.stringify(data),
            });
            // Imprimir la respuesta para depuración
            console.log(`API_SERVICE_POST: ${response.statusText}`);

            if (!response.ok) {
                const errorData = await response.json();
                const error = new Error(errorData.message || response.statusText);
                error.data = errorData;
                throw error;
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    async deleteData(endpoint) {
        try {
            const response = await fetch(`${this.API_URL}/${endpoint}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                }
            });
            console.log(`API_SERVICE_DELETE: ${response}`);
            if (!response.ok) {
                throw new Error(`Error deleting data: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default ApiService; */