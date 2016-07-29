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
$(document).ready(function() {
    console.log('jquery loaded!')
});
