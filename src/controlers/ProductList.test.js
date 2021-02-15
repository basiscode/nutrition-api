"use strict"

jest.mock("../api/product")

const ProductList = require("./ProductList")

describe("Product List", () => {

  let productHtmlList, productList
  
  beforeEach(() => {
    productHtmlList = document.createElement("tbody")
    productList = new ProductList(productHtmlList)
  })

  describe("AddProduct", () => {
    test("it shoul add a product", done => {
      productList.addFetchedProduct = function(product) {
        expect(product["fdcId"]).toBe("555")
        done()
      }
      productList.addProduct("555")
    })
  });

  describe("AddFetchedProduct", () => {
    const product = {
      description: "Testprodukt",
      fdcId: "12345",
      foodNutrients: []
    }
    test("It should add product to this.productList", () => {
      productList.addFetchedProduct(product);
      expect(productList.products.length).toBe(1);
      expect(productList.products[0].amount).toBe(100);
      expect(productList.products[0].product).toBe(product);
    })

    test("It should generate correct HTML", () => {
      productList.addFetchedProduct(product);
      console.log(productHtmlList.innerHTML)
      const htmlTitle = productHtmlList.querySelector("[data-testid='description']")
      const htmlAmount = productHtmlList.querySelector(".bc-product-list-amount")
      const htmlButton = productHtmlList.querySelector(".bc-product-list-remove-button")

      expect(htmlTitle.textContent).toBe("Testprodukt")
      expect(htmlAmount.getAttribute("data-bc-fdcid")).toBe("12345")
      expect(htmlButton.getAttribute("data-bc-fdcid")).toBe("12345")
    })

    test("It should emit nutrients", done => {
      productList.events.on("nutrientChange", (nutrients) => {
        done()
      });
      productList.addFetchedProduct(product);
    })
    
  })
})