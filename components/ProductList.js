import { ProductService } from '../src/core/services/product-service.js'

/**
 * ProductList component - Displays and manages the product grid
 * @class ProductList
 */
export class ProductList {
    #productService
    #products

    constructor() {
        this.#productService = new ProductService()
        this.#products = []
    }

    /**
     * Load products from API and render the grid
     * @returns {Promise<void>}
     */
    async init() {
        try {
            this.#products = await this.#productService.getAll()
            this.render()
        } catch (error) {
            console.error('Failed to load products:', error)
        }
    }

    /**
     * Render all product cards into the grid
     */
    render() {
        const grid = document.getElementById('productsGrid')
        const emptyState = document.getElementById('emptyState')

        if (this.#products.length === 0) {
            grid.style.display = 'none'
            emptyState.style.display = 'block'
            return
        }

        emptyState.style.display = 'none'
        grid.style.display = 'grid'
        grid.innerHTML = this.#products.map(product => this.#createCard(product)).join('')
    }

    /**
     * Create HTML for a single product card
     * @param {object} product - Product data
     * @returns {string} HTML string
     */
    #createCard(product) {
        return `
            <div class="product-card" data-id="${product.id}">
                <div class="product-card-header">
                    <div>
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-category">${product.category}</span>
                    </div>
                </div>
                <div class="product-price">${product.price}</div>
                <p class="product-description">${product.detail || ''}</p>
                <div class="product-actions">
                    <button class="btn btn-secondary btn-sm" onclick="app.handleEdit(${product.id})">
                        ✏️ Modifier
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="app.handleDelete(${product.id})">
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        `
    }

    /**
     * Sort products by field and order
     * @param {string} field - Field to sort by
     * @param {string} order - Sort order (asc/desc)
     */
    sortProducts(field, order = 'asc') {
        this.#products.sort((a, b) => {
            if (typeof a[field] === 'string') {
                return order === 'asc'
                    ? a[field].localeCompare(b[field])
                    : b[field].localeCompare(a[field])
            }
            return order === 'asc' ? a[field] - b[field] : b[field] - a[field]
        })
        this.render()
    }
}