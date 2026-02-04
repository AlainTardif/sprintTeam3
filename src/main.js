import { ProductList } from '../components/ProductList.js'
import { ProductForm } from '../components/ProductForm.js'
import { ProductService } from './core/services/product-service.js'

/**
 * Main application controller
 * @class App
 */
class App {
    #productList
    #productForm
    #productService

    constructor() {
        this.#productList = new ProductList()
        this.#productForm = new ProductForm()
        this.#productService = new ProductService()
    }

    /**
     * Initialize application and bind all events
     * @returns {Promise<void>}
     */
    async init() {
        await this.#productList.init()
        this.#bindEvents()
    }

    /**
     * Bind all DOM events
     */
    #bindEvents() {
        // Add product buttons
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.#productForm.openCreate()
        })

        document.getElementById('addFirstProductBtn').addEventListener('click', () => {
            this.#productForm.openCreate()
        })

        // Modal controls
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            this.#productForm.close()
        })

        document.getElementById('modalCancelBtn').addEventListener('click', () => {
            this.#productForm.close()
        })

        document.getElementById('modalBackdrop').addEventListener('click', (e) => {
            if (e.target.id === 'modalBackdrop') {
                this.#productForm.close()
            }
        })

        // Form submit
        document.getElementById('productForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            const result = await this.#productForm.submit()
            if (result) {
                await this.#productList.init()
            }
        })

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', async () => {
            await this.#productList.init()
        })

        // Sort controls
        document.getElementById('sortField').addEventListener('change', () => {
            this.#handleSort()
        })

        document.getElementById('sortOrder').addEventListener('change', () => {
            this.#handleSort()
        })
    }

    /**
     * Handle sort field/order change
     */
    #handleSort() {
        const field = document.getElementById('sortField').value
        const order = document.getElementById('sortOrder').value
        this.#productList.sortProducts(field, order)
    }

    /**
     * Handle edit product (called from card button)
     * @param {number} id - Product ID to edit
     */
    async handleEdit(id) {
        try {
            const product = await this.#productService.getOne(id)
            this.#productForm.openEdit(product)
        } catch (error) {
            console.error('Failed to load product:', error)
        }
    }

    /**
     * Handle delete product (called from card button)
     * @param {number} id - Product ID to delete
     */
    async handleDelete(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            return
        }

        try {
            await this.#productService.delete(id)
            await this.#productList.init()
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }
}

// Start application
const app = new App()
window.app = app
app.init()