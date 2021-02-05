"use strict"

const axios = require("axios")

const auth = {
  username: "f30b8Dr9qFteNLSfCtaOIQX1SHHJSxOIrwfb87Vo"
}

module.exports.search = function search(term) {
  return axios
    .post("https://api.nal.usda.gov/fdc/v1/search", {
      generalSearchInput: term
    }, {auth})
    .then((response) => response.data['foods'])
}

module.exports.info = function info(fdcId) {
  return axios
    .get("https://api.nal.usda.gov/fdc/v1/" + fdcId, {auth})
    .then((response) => response.data)
}

