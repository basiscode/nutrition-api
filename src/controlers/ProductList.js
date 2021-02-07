"use strict"

const { info } = require("../api/product")
const addProductTemplate = require("../templates/productlist/productitem.ejs")

/**
 * 
 * @param {HTMLElement} productList 
 */
function ProductList(productList) {
    this.producList = productList
}

ProductList.prototype.addProduct = function(fbcId) {
  info(fbcId)
    .then((productInfo) => {
      const productHtml = addProductTemplate({productname: productInfo["description"]})
      this.producList.insertAdjacentHTML("beforeend", productHtml)
    })
}

ProductList.prototype.init = function() {}

module.exports = ProductList