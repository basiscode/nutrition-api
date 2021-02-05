"use strict"

require("../scss/index.scss")

const ProductSearch = require('./controlers/ProductSearch.js')

const el = {
    'searchInput':  document.getElementById('productSearchInput'),
    'searchBtn':    document.getElementById('btn-search')
}

const productSearch = new ProductSearch(el.searchInput, el.searchBtn);

productSearch.init();

