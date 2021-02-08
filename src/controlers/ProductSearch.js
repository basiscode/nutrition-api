"use strict"

const { isSet } = require('lodash')
const {search} = require('../api/product')
const {on} = require('../utils/dom')
const EventEmitter = require('EventEmitter3' )

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

  this.events = new EventEmitter()
}

ProductSearch.prototype.init = function() {
  
  this.buttonElement.addEventListener('click', (event) => {
    const searchTerm = this.inputElement.value
    event.preventDefault()
    this.runSearch(searchTerm)
 })

 on('.bc-product-search-result-item', 'click', (event) => {
   const fdcId = event.handleObj.getAttribute('data-bc-fdcid')
   event.originalEvent.preventDefault()
   this.events.emit('productSelected', fdcId)
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
      this.resultElement.innerHTML = ""

      //add results as list-items
      for (const result of results) {
        const listItem = document.createElement('a')
        listItem.classList.add('list-group-item','list-group-item-action')
        listItem.classList.add('bc-product-search-result-item')
        listItem.setAttribute('href', '#')
        listItem.setAttribute('data-bc-fdcid', result['fdcId'])

        const label = result['description'] 
        if ('brandOwner' in result) {
          label = label + " (" + result['brandOwner'] + ')'
        }
        const itemText = document.createTextNode(label)

        listItem.appendChild(itemText)

        this.resultElement.append(listItem)
      }
    })
}

module.exports = ProductSearch