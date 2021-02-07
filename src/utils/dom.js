"use strict"

module.exports.on = function on(selector, eventType, cb) {
  document.addEventListener(eventType, (event) => {
    let el = event.target
    while (el) {
      if (el.matches(selector)) {
        return cb({
          handleObj: el,
          originalEvent : event
        })
      }
      el = el.parentElement
    }
  })
}