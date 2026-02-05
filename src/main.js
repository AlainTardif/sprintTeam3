import { ProductList } from '../components/ProductList.js'
import { ProductForm } from '../components/ProductForm.js'
import { ProductService } from './core/services/product-service.js'
import { Toast } from '../components/Toast.js'

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
        // I open the create modal from header button
        document.getElementById('addProductBtn').addEventListener('click', () => {
            this.#productForm.openCreate()
        })

        // I open the create modal from empty state button
        document.getElementById('addFirstProductBtn').addEventListener('click', () => {
            this.#productForm.openCreate()
        })

        // I close modal via close button
        document.getElementById('modalCloseBtn').addEventListener('click', () => {
            this.#productForm.close()
        })

        // I close modal via cancel button
        document.getElementById('modalCancelBtn').addEventListener('click', () => {
            this.#productForm.close()
        })

        // I close modal via backdrop click
        document.getElementById('modalBackdrop').addEventListener('click', (e) => {
            if (e.target.id === 'modalBackdrop') {
                this.#productForm.close()
            }
        })

        // I handle form submission and notify user
        document.getElementById('productForm').addEventListener('submit', async (e) => {
            e.preventDefault()
            const result = await this.#productForm.submit()
            if (result) {
                await this.#productList.init()
                Toast.success('Produit enregistré avec succès')
            }
        })

        // I refresh the product list
        document.getElementById('refreshBtn').addEventListener('click', async () => {
            await this.#productList.init()
            Toast.info('Liste actualisée')
        })

        // I handle sort changes
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
            Toast.error('Impossible de charger le produit')
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
            Toast.success('Produit supprimé avec succès')
        } catch (error) {
            console.error('Failed to delete product:', error)
            Toast.error('Échec de la suppression')
        }
    }
}

// I start the application and expose it globally for card onclick handlers
const app = new App()
window.app = app
app.init()