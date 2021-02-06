"use strict"

const { isSet } = require('lodash')
const {search} = require('../api/product.js')

/**
 * 
 * @param {HTMLInputElement} inputElement 
 * @param {HTMLButtonElement} buttonElement 
 * @param {HTMLDivElement} resultElement 
 */
function ProductSearch(inputElement, buttonElement, resultElement) {
    this.inputElement = inputElement
    this.buttonElement = buttonElement
    this.resultElement = resultElement
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
  search(searchTerm)
    .then((results) => {
      //clear list
      this.resultElement.innerHTML = ""; 

      console.log(results)
      //add results as list-items
      for (const result of results) {
        const listItem = document.createElement('a')
        listItem.classList.add('list-group-item','list-group-item-action')
        listItem.classList.add('bc-product-search-result-item')
        listItem.setAttribute('href', '#');
        listItem.setAttribute('data-bc-fdcid', result['fdcId']);

        const label = result['description'] 
        if ('brandOwner' in result) {
          label = label + " (" + result['brandOwner'] + ')';
        }
        const itemText = document.createTextNode(label)

        listItem.appendChild(itemText)

        this.resultElement.append(listItem);
      }
    })
}

module.exports = ProductSearch