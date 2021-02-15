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
    test("it should add a product", () => {
      productList.addFetchedProduct = jest.fn()
      return productList.addProduct("555").then(() => {
        expect(productList.addFetchedProduct).toBeCalled()
        expect(productList.addFetchedProduct.mock.calls.length).toBe(1)
      })

      
    })
    test("it should add a product", done => {
      productList.addFetchedProduct = function(product) {
        expect(product["fdcId"]).toBe("555")
        done()
      }
      productList.addProduct("555")
    })

    test("it should not add a product if it already exists", () => {
      productList.addFetchedProduct({
        description: "Testprodukt",
        fdcId: "12345",
        foodNutrients: []
      })
      
      productList.addFetchedProduct = jest.fn()
      return productList.addProduct("12345")
        .then(() => {
          expect(productList.addFetchedProduct).not.toBeCalled()
        })
    })
  });

  describe("UpdateAmount", () => {

    beforeEach(() => {
      productList.products = [ 
        {
          amount: 100,
          product: {
            fdcId: "12345",
            foodNutrients: []
          }
        },
        {
          amount: 200,
          product: {
            fdcId: "2345",
            foodNutrients: []
          }
        }
      ]
    })
    
    const testAmount = "123"
    const falseFdcId = "9839284123"
    
    test("It should update amount in productlist", () => {
      
      productList.updateAmount("12345", testAmount);
      
      expect(productList.products.length).toBe(2);
      expect(productList.products[0].amount).toBe(testAmount);
      expect(productList.products[1].amount).toBe(200);
    })

    test("It should ignore a fdcId that can't be found", () => {
      productList.updateAmount(falseFdcId, testAmount);
      
      expect(productList.products.length).toBe(2);
      expect(productList.products[0].amount).toBe(100);
      expect(productList.products[1].amount).toBe(200);
    })

    test("It should trigger a nutrientChange event", done => {
      productList.events.on("nutrientChange", (nutrients) => {
        done()
      });
      productList.updateAmount(falseFdcId, testAmount);
    })
  })
  
  
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