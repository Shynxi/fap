//get my own path
var scriptPath = (function () {
  var scripts = document.getElementsByTagName('script'), script = scripts[scripts.length - 1]
  if (script.getAttribute.length !== undefined) return script.getAttribute('src')
  return script.getAttribute('src', 2)
}())
__webpack_public_path__ = scriptPath.substring(0, scriptPath.lastIndexOf("/") + 1)

import './modules'
//load bootstrap
require('bootstrap-loader');
//load styles
require('./../stylesheets/app.sass')
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


//testing
console.log(`app.js has loaded!`)
$(document).ready(function () {
  console.log('jquery loaded!')
});