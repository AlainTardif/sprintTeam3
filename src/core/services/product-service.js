import { HttpClient } from '../http/http-client.js'

export class ProductService {
    #httpClient
    #endPoint = 'users'

    constructor() {
        this.#httpClient = new HttpClient()
    }

    /**
     * Get all products
     * @returns Promise<Array<any>>
     */
    async getAll() {
        try {
            return await this.#httpClient.get(this.#endPoint)
        } catch (error) {
            console.error('Cannot fetch products')
            throw error
        }
    }

    /**
     * Get one product by id
     * @param {string} id
     * @returns Promise<any>
     */
    async getOne(id) {
        try {
            return await this.#httpClient.get(`${this.#endPoint}/${id}`)
        } catch (error) {
            console.error(`Product with id ${id} not found`)
            throw error
        }
    }

    /**
     * Add a new product
     * @param {object} product
     * @returns Promise<any>
     */
    async add(product) {
        try {
            return await this.#httpClient.post(this.#endPoint, product)
        } catch (error) {
            console.error('Cannot add product')
            throw error
        }
    }

    /**
     * Update a product
     * @param {string} id
     * @param {object} product
     * @returns Promise<Response>
     */
    async update(id, product) {
        try {
            return await this.#httpClient.put(`${this.#endPoint}/${id}`, product)
        } catch (error) {
            console.error(`Cannot update: product with id ${id} not found`)
            throw error
        }
    }

    /**
     * Delete a product
     * @param {string} id
     * @returns Promise<Response>
     */
    async delete(id) {
        try {
            return await this.#httpClient.delete(`${this.#endPoint}/${id}`)
        } catch (error) {
            console.error(`Cannot delete: product with id ${id} not found`)
            throw error
        }
    }
}