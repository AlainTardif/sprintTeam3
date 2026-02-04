import { ProductService } from '../src/core/services/product-service.js'

/**
 * ProductForm component - Manages the modal form for create/update
 * @class ProductForm
 */
export class ProductForm {
    #productService
    #isEditMode
    #currentProductId

    constructor() {
        this.#productService = new ProductService()
        this.#isEditMode = false
        this.#currentProductId = null
    }

    /**
     * Open modal in create mode (empty form)
     */
    openCreate() {
        this.#isEditMode = false
        this.#currentProductId = null
        this.#resetForm()
        document.getElementById('modalTitle').textContent = 'Ajouter un produit'
        document.getElementById('submitBtnText').textContent = 'Enregistrer'
        document.getElementById('modalBackdrop').classList.add('active')
    }

    /**
     * Open modal in edit mode (pre-filled form)
     * @param {object} product - Product data to edit
     */
    openEdit(product) {
        this.#isEditMode = true
        this.#currentProductId = product.id
        document.getElementById('productId').value = product.id
        document.getElementById('productName').value = product.name
        document.getElementById('productPrice').value = product.price
        document.getElementById('productCategory').value = product.category
        document.getElementById('productDescription').value = product.detail || ''
        document.getElementById('modalTitle').textContent = 'Modifier le produit'
        document.getElementById('submitBtnText').textContent = 'Mettre à jour'
        document.getElementById('modalBackdrop').classList.add('active')
    }

    /**
     * Close the modal
     */
    close() {
        document.getElementById('modalBackdrop').classList.remove('active')
        this.#resetForm()
    }

    /**
     * Validate form fields
     * @returns {boolean} True if form is valid
     */
    validate() {
        const name = document.getElementById('productName').value.trim()
        const price = document.getElementById('productPrice').value
        const category = document.getElementById('productCategory').value

        if (!name || !price || !category) {
            alert('Veuillez remplir tous les champs obligatoires.')
            return false
        }

        if (parseFloat(price) < 0) {
            alert('Le prix doit être positif.')
            return false
        }

        return true
    }

    /**
     * Submit the form (create or update)
     * @returns {Promise<object|null>} Created or updated product
     */
    async submit() {
        if (!this.validate()) {
            return null
        }

        const productData = {
            name: document.getElementById('productName').value.trim(),
            price: parseFloat(document.getElementById('productPrice').value),
            category: document.getElementById('productCategory').value,
            detail: document.getElementById('productDescription').value.trim()
        }

        try {
            let result
            if (this.#isEditMode) {
                result = await this.#productService.update(this.#currentProductId, productData)
            } else {
                result = await this.#productService.add(productData)
            }
            this.close()
            return result
        } catch (error) {
            console.error('Failed to save product:', error)
            alert('Erreur lors de la sauvegarde.')
            return null
        }
    }

    /**
     * Reset all form fields
     */
    #resetForm() {
        document.getElementById('productForm').reset()
        document.getElementById('productId').value = ''
        this.#isEditMode = false
        this.#currentProductId = null
    }
}