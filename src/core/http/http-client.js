export class HttpClient {
    #api = 'http://localhost:3000/';
    
    /**
     * Send a GET request to the endpoint
     * @param {string} endpoint
     * @returns Promise<any>
     */
    async get(endpoint) {
        const response = await fetch(`${this.#api}${endpoint}`)
        
        if (!response.ok) {
            throw new Error(`${response.status} : ${response.statusText}`)
        }
        
        return response.json()
    }

    /**
     * Send a POST request to the endpoint
     * @param {string} endpoint
     * @param {object} payload
     * @returns Promise<any>
     */
    async post(endpoint, payload) {
        const init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        
        const response = await fetch(`${this.#api}${endpoint}`, init)
        
        if (!response.ok) {
            throw new Error(`${response.status} : ${response.statusText}`)
        }
        
        return response.json()
    }

    /**
     * Send a PUT request to the endpoint
     * @param {string} endpoint
     * @param {object} payload
     * @returns Promise<Response>
     */
    async put(endpoint, payload) {
        const init = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        
        const response = await fetch(`${this.#api}${endpoint}`, init)
        
        if (!response.ok) {
            throw new Error(`${response.status} : ${response.statusText}`)
        }
        
        return response.json()
    }

    /**
     * Send a DELETE request to the endpoint
     * @param {string} endpoint
     * @returns Promise<Response>
     */
    async delete(endpoint) {
        const init = {
            method: 'DELETE'
        }
        
        const response = await fetch(`${this.#api}${endpoint}`, init)
        
        if (!response.ok) {
            throw new Error(`${response.status} : ${response.statusText}`)
        }
        
        return response
    }
}