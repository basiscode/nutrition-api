"use strict"

require("../scss/index.scss")

const ProductSearch = require('./controlers/ProductSearch.js')
const ProductList   = require('./controlers/ProductList.js')

const el = {
    'searchInput':  document.getElementById('bc-product-search-input'),
    'searchBtn':    document.getElementById('btn-search'),
    'resultList':   document.getElementById('bc-product-search-results'),
    'productList':  document.getElementById('bc-product-list')
}

const productSearch = new ProductSearch(el.searchInput, el.searchBtn, el.resultList)
const productList = new ProductList(el.productList)
 
productSearch.init()
productList.init()
productList.addProduct(1006981);

productSearch.events.on('productSelected', (fbcId) => {
    productList.addProduct(fbcId);
})

