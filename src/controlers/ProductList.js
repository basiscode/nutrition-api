"use strict"

const { info } = require("../api/product")
const { on } = require("../utils/dom")
const addProductTemplate = require("../templates/productlist/productitem.ejs")
const EventEmitter = require('EventEmitter3')

const PROTEIN = "203";
const FATTY_ACIDS = "204";
const CARBOHYDRATE = "205";

/**
 * 
 * @param {HTMLElement} producHtmlList 
 */
function ProductList(producHtmlList) {
  this.products = []
  this.producHtmlList = producHtmlList
  this.events = new EventEmitter()
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

ProductList.prototype.emitNutrients = function() {
  const nutrients = this.getNutrients()
  this.events.emit('nutrientChange', nutrients)
}

ProductList.prototype.updateAmount = function(productId, newAmount) {
  for (const item of this.products) {
    if(item.product['fdcId'] == productId) {
      item['amount'] = newAmount 
      break
    }
  }
  this.emitNutrients()  
}

ProductList.prototype.getNutrients = function() {
  const returnNutrients = {
    carbohydrate : 0,
    protein: 0,
    fattyAcids : 0
  }

  for (const productitem of this.products) {
    const productNutrients = this.getNutrientsForProduct(productitem)
    returnNutrients.carbohydrate += productNutrients.carbohydrate
    returnNutrients.protein += productNutrients.protein
    returnNutrients.fattyAcids += productNutrients.fattyAcids
  }
  return returnNutrients;
}

ProductList.prototype.getNutrientsForProduct = function(productitem) {

  const returnNutrients = {
    carbohydrate : 0,
    protein: 0,
    fattyAcids : 0
  }
  
  const amount = productitem.amount;
  
  // in case some values from API are not complete
  if (productitem.product.hasOwnProperty('foodNutrients')) {
    const nutrients = productitem.product['foodNutrients'];
  
    // get nutrients for 100g
    for (const nutrient of nutrients) {
      switch (nutrient.nutrient.number) {
        case FATTY_ACIDS:
          returnNutrients['fattyAcids'] = nutrient.amount
          break;
        case PROTEIN:
          returnNutrients['protein'] = nutrient.amount
          break;
        case CARBOHYDRATE:
          returnNutrients['carbohydrate'] = nutrient.amount
          break;
      }
    } 
  }

  // calculate nutrients for real amount
  returnNutrients['carbohydrate'] = (returnNutrients['carbohydrate']/100) * amount
  returnNutrients['protein'] = (returnNutrients['protein']/100) * amount
  returnNutrients['fattyAcids'] = (returnNutrients['fattyAcids']/100) * amount

  return returnNutrients;
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

  this.emitNutrients()  
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
      this.emitNutrients()  
    })
}

module.exports = ProductList