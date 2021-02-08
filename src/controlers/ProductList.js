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
  on('.bc-product-list-remove-button','click', (event) => {
    const productId = parseInt(event.handleObj.getAttribute("data-bc-fdcid"))
    this.removeProduct(productId)
  })
}
ProductList.prototype.removeProduct = function(productId) {
    
  //remove from products
  for(const index in this.products) {
    const product = this.products[index]
    if (product['fdcId'] == productId) {
      this.products.splice(index, 1);
      break
    }
  }
  
  // remove from productHtmlList
  const htmlListItem = document.querySelector("#bc-product-list tr[data-bc-fdcid='"+productId+"']")
  htmlListItem.remove()
}

ProductList.prototype.addProduct = function(fdcId) {
  info(fdcId)
    .then((productInfo) => {
      const productHtml = addProductTemplate({
        productname: productInfo["description"],
        productid: productInfo["fdcId"]
      })
      this.producHtmlList.insertAdjacentHTML("beforeend", productHtml)
      this.products.push(productInfo)
    })
}

module.exports = ProductList