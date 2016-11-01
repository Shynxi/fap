export default class PolymerExample {
  constructor(el) {
    console.log('PolymerExample loaded');
    // Grab a reference to our auto-binding template
    // and give it some initial binding values
    // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
    var app = el;

    // Sets app default base URL
    /*app.baseUrl = '/maxg';
     if (window.location.port === '') {  // if production
     // Uncomment app.baseURL below and
     // set app.baseURL to '/your-pathname/' if running from folder in production
     // app.baseUrl = '/polymer-starter-kit/';
     }*/

    app.displayInstalledToast = function () {
      // Check to make sure caching is actually enabled—it won't be in the dev environment.
      if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
        Polymer.dom(document).querySelector('#caching-complete').show();
      }
    };

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('dom-change', function () {
      console.log('dom-change');
    });

    // See https://github.com/Polymer/polymer/issues/1381
    window.addEventListener('WebComponentsReady', function () {
      // imports are loaded and elements have been registered
      console.log('WebComponentsReady');
    });

    // Scroll page to top and expand header
    app.scrollPageToTop = function () {
      //app.$.headerPanelMain.scrollToTop(true);
    };

    app.closeDrawer = function () {
      //app.$.paperDrawerPanel.closeDrawer();
    };
  }
}
/* string format method */
if (!String.format) {
  String.format = function(format) {
    'use strict';
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  };
}