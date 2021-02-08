"use strict"

require("../scss/index.scss")

const ProductSearch     = require('./controlers/ProductSearch.js')
const ProductList       = require('./controlers/ProductList.js')
const ProductNutrients  = require('./controlers/ProductNutrients.js')

const el = {
  'searchInput':  document.getElementById('bc-product-search-input'),
  'searchBtn':    document.getElementById('btn-search'),
  'resultList':   document.getElementById('bc-product-search-results'),
  'productList':  document.getElementById('bc-product-list'),
  'nutrientProtein':  document.getElementById('bc-nutrient-protein'),
  'nutrientCarb':  document.getElementById('bc-nutrient-carb'),
  'nutrientFat':  document.getElementById('bc-nutrient-fat'),
  
}

const productSearch = new ProductSearch(el.searchInput, el.searchBtn, el.resultList)
const productList = new ProductList(el.productList)
const productNutrients = new ProductNutrients(el.nutrientCarb, el.nutrientProtein, el.nutrientFat)
 
productSearch.init()
productList.init()
productNutrients.init()

productSearch.events.on('productSelected', (fbcId) => {
    productList.addProduct(fbcId)
})

productList.events.on('nutrientChange', (nutrients) => {
  productNutrients.update(nutrients)
})


