"use strict"

function ProductSearch(inputElement, buttonElement) {
    this.inputElement = inputElement;
    this.buttonElement = buttonElement;
}

ProductSearch.prototype.init = function() {
    this.buttonElement.addEventListener('click', (event) => {
        const searchValue = this.inputElement.value;
        console.log('PS: click mit', searchValue)
        event.preventDefault();
        this.runSearch(searchValue)
    })
    console.log('PS: init!')
} 

ProductSearch.prototype.runSearch = function runSearch(searchValue) {
    console.log('Jetzt API Aufruf mit', searchValue);

}

module.exports = ProductSearch;