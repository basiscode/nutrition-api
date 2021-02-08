"use strict"

const { info } = require("../api/product")
const { on } = require("../utils/dom")
const addProductTemplate = require("../templates/productlist/productitem.ejs")

/**
 * 
 * @param {HTMLElement} producHtmlList 
 */
function ProductList(producHtmlList) {
  this.products = []
  this.producHtmlList = producHtmlList
}

ProductList.prototype.init = function() {

  //event: Click on Remove-Button
  on('.bc-product-list-remove-button','click', (event) => {
    const productId = parseInt(event.handleObj.getAttribute("data-bc-fdcid"), 10)
    this.removeProduct(productId)
  })

  //event: Change amount of product
  on('.bc-product-list-amount', 'change', (event) => {
    const productId = parseInt(event.handleObj.getAttribute("data-bc-fdcid"), 10)
    const value = event.handleObj.value
    this.updateAmount(productId, value)
  })
}

ProductList.prototype.updateAmount = function(productId, newAmount) {
  console.log("update", productId, "to", newAmount)

  for (const item of this.products) {
    if(item.product['fdcId'] == productId) {
      item['amount'] = newAmount 
      break
    }
  }
  console.log(this.products)
}

ProductList.prototype.removeProduct = function(productId) {
    
  //remove from products
  for(const index in this.products) {
    const item = this.products[index]
    if (item.product['fdcId'] == productId) {
      this.products.splice(index, 1)
      break
    }
  }
  
  // remove from productHtmlList
  const htmlListItem = document.querySelector("#bc-product-list tr[data-bc-fdcid='"+productId+"']")
  htmlListItem.remove()

  console.log(this.products)
}

ProductList.prototype.addProduct = function(fdcId) {
  info(fdcId)
    .then((product) => {
      const productHtml = addProductTemplate({
        productname: product["description"],
        productid: product["fdcId"]
      })
      this.producHtmlList.insertAdjacentHTML("beforeend", productHtml)
      this.products.push({
        product,
        amount: 100
      })
    })
}

module.exports = ProductList