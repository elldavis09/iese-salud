// En esta clase se define la lógica para interactuar con una API externa.

class ApiService {
    // API_URL = import.meta.env.VITE_API_URL;
    //API_URL = 'http://192.168.1.79:8000/api';
    // API_URL = 'http://localhost:8000/api';
    API_URL = import.meta.env('VITE_API_URL');

    async fetchData(endpoint) {
        try {
            const response = await fetch(`${this.API_URL}/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
                }
            });
            console.log(`API_SERVICE_GET: ${response}`);
            /*if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }*/
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

export default ApiService;