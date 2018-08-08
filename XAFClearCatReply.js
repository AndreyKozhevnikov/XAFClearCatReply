/*eslint strict: ["error", "function"]*/
// ==UserScript==
// @name         XAF Bug Subject Validator
// @namespace    http://tampermonkey.net/
// @version      0.1.5
// @description  Validate the ticket Subject according to XAF team rules
// @author       KL
// @match        https://isc.devexpress.com/Thread/WorkplaceDetails*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';


  window.fullViewModel.CatViewModel.selectedReply().value.currentValue('');
})();
