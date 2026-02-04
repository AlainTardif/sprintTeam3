/**
 * Product model class
 * @class Product
 */
export class Product {
    /**
     * Create a product
     * @param {number} id - Product unique identifier
     * @param {string} name - Product name
     * @param {number} price - Product price in euros
     * @param {string} category - Product category
     * @param {string} detail - Product description
     */
    constructor(id, name, price, category, detail) {
        this.id = id
        this.name = name
        this.price = price
        this.category = category
        this.detail = detail
    }
}