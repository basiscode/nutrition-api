"use strict"

const ProducNutrients = require('./ProductNutrients')

describe("Product Nutrients",  () => {
  let carbEl, proteinEl, fatEl, productNutrients

  beforeEach(() => {
    carbEl = document.createElement("span")
    proteinEl = document.createElement("span")
    fatEl = document.createElement("span")

    productNutrients = new ProducNutrients(carbEl, proteinEl, fatEl);
  })

  test("it should initialize", () => {
    expect(productNutrients).not.toBeNull()
  })
  
  describe("setNutrients", () => {
    test("it should write carbs to DOM", () => {
      productNutrients.update({
        carbohydrate: 100,
        protein: 0,
        fattyAcids: 0
      })
      expect(carbEl.textContent).toBe('100.00')
    })
  })
    
})