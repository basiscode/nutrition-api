"use strict"

module.exports.info = function info(fdcId) {
  return Promise.resolve({
    description: "Testprodukt",
    fdcId: "" + fdcId,
    foodNutrients: []
  })
}