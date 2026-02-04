describe('Product Manager - CRUD', () => {

    beforeEach(() => {
        cy.visit('http://localhost:5500')
    })

    it('should display the product list on load', () => {
        cy.get('.product-card').should('have.length.greaterThan', 0)
        cy.get('.product-name').first().should('not.be.empty')
        cy.get('.product-price').first().should('not.be.empty')
        cy.get('.product-category').first().should('not.be.empty')
    })

    it('should open the add modal and create a product', () => {
        cy.get('#addProductBtn').click()
        cy.get('.modal-backdrop').should('have.class', 'active')

        cy.get('#productName').type('Produit Test Cypress')
        cy.get('#productPrice').type('42.99')
        cy.get('#productCategory').select('Informatique')
        cy.get('#productDescription').type('Créé par Cypress e2e')

        cy.get('#modalSubmitBtn').click()
        cy.get('.modal-backdrop').should('not.have.class', 'active')
        cy.contains('Produit Test Cypress').should('exist')
    })

    it('should edit a product', () => {
        cy.contains('Produit Test Cypress')
            .parents('.product-card')
            .find('.btn-secondary')
            .click()

        cy.get('.modal-backdrop').should('have.class', 'active')
        cy.get('#productName').clear().type('Produit Modifié Cypress')
        cy.get('#modalSubmitBtn').click()

        cy.get('.modal-backdrop').should('not.have.class', 'active')
        cy.contains('Produit Modifié Cypress').should('exist')
    })

    it('should delete a product', () => {
        cy.contains('Produit Modifié Cypress')
            .parents('.product-card')
            .find('.btn-danger')
            .click()

        cy.on('window:confirm', () => true)
        cy.contains('Produit Modifié Cypress').should('not.exist')
    })

    it('should sort products by price', () => {
        cy.get('#sortField').select('price')
        cy.get('#sortOrder').select('asc')
        cy.get('.product-price').then(($prices) => {
            const prices = [...$prices].map(el => parseFloat(el.textContent))
            for (let i = 1; i < prices.length; i++) {
                expect(prices[i]).to.be.at.least(prices[i - 1])
            }
        })
    })
})