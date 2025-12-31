// Modelo que describe los errores de las respuestas de la API
class ApiResult {
    constructor(success, data = null, error = null) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
}

export default ApiResult;