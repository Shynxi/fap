/*
 Automatically instantiates modules based on data-attrubiutes
 specifying module file-names.
 */

const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  //split by comma to deal with multiple modules
  const moduleNames = name.split(',')
  for(var j = 0; j < moduleNames.length; j++) {
    const Module = require(`./${moduleNames[j]}`).default
    new Module(el)
  }
}

/*
 Usage:
 ======

 html
 ----
 <button data-nws-module="disappear">disappear!</button>

 js
 --
 // modules/disappear.js
 export default class Disappear {
 constructor(el) {
 el.style.display = none
 }
 }
 */
