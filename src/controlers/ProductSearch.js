"use strict"

const {search} = require('../api/product.js')

/**
 * 
 * @param {HTMLInputElement} inputElement 
 * @param {HTMLButtonElement} buttonElement 
 */
function ProductSearch(inputElement, buttonElement) {
    this.inputElement = inputElement
    this.buttonElement = buttonElement
}

ProductSearch.prototype.init = function() {
    this.buttonElement.addEventListener('click', (event) => {
        const searchTerm = this.inputElement.value
        event.preventDefault()
        this.runSearch(searchTerm)
    })
} 

/**
 * 
 * @param {String} searchTerm 
 */
ProductSearch.prototype.runSearch = function runSearch(searchTerm) {
    search(searchTerm).then((result) => {
        console.log(result)
    })

}

module.exports = ProductSearch