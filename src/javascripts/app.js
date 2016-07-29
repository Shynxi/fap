import './modules'

console.log(`app.js has loaded!`)
$(document).ready(function() {
    console.log('jquery loaded!')
});
require('bootstrap')
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})