"use strict"

require("../scss/index.scss")

const ProductSearch = require('./controlers/ProductSearch.js')

const el = {
    'searchInput':  document.getElementById('productSearchInput'),
    'searchBtn':    document.getElementById('btn-search'),
    'resultList':   document.getElementById('product-search-results')
}

const productSearch = new ProductSearch(el.searchInput, el.searchBtn, el.resultList)

productSearch.init()

