"use strict"

const ProductList = require("./ProductList")

describe("Product List", () => {

  let productHtmlList, productList
  
  beforeEach(() => {
    productHtmlList = document.createElement("tbody")
    productList = new ProductList(productHtmlList)
  })

  describe("AddFetchedProduct", () => {
    const product = {
      title: "Testprodukt",
      fdcId: "12345"
    }
    test("It should add product to this.productList", () => {
      productList.addFetchedProduct(product);
      expect(productList.products.length).toBe(1);
      expect(productList.products[0].amount).toBe(100);
      expect(productList.products[0].product).toBe(product);
    })
  })
})