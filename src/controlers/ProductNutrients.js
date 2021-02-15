"use strict"

const { on } = require("../utils/dom")

/**
 * 
 * @param {HTMLSpanElement} carb 
 * @param {HTMLSpanElement} protein 
 * @param {HTMLSpanElement} fat 
 */
function ProductNutrient(carb, protein, fat) {
  this.carb  = carb
  this.protein  = protein
  this.fat  = fat
}

ProductNutrient.prototype.init = function() {
}

ProductNutrient.prototype.update = function(nutrients) {
  this.carb.textContent = (nutrients.carbohydrate).toFixed(2)
  this.protein.textContent = (nutrients.protein).toFixed(2)
  this.fat.textContent = (nutrients.fattyAcids).toFixed(2)
}

module.exports = ProductNutrient