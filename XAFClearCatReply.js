/*eslint strict: ["error", "global"]*/
/* global ko*/
'use strict';
// ==UserScript==
// @name         XAF Clear Cat Reply
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  clear CAT reply when a ticked is assigned to 2nd line
// @author       AndreyK
// @match        https://isc.devexpress.com/Thread/WorkplaceDetails*
// @grant        none
// ==/UserScript==

function subscribeToButtons() {
  let _originalMarkAsReviewed = window.fullViewModel.bottomPanelItems.markAsReviewed;
  window.fullViewModel.bottomPanelItems.markAsReviewed = performCustomOperationBefore(_originalMarkAsReviewed);
  ko.applyBindings(window.fullViewModel, document.getElementById('mark-as-reviewed')); // wihtout this code the 'mark-as-reviewed' button stil call the original markAsReviewed method. some kind of magic I suppose (don't want to research)

  let _submitButtonClick = window.fullViewModel.bottomPanelItems.submitButtonClick;
  window.fullViewModel.bottomPanelItems.markAsReviewed = performCustomOperationBefore(_submitButtonClick);

}
function performCustomOperationBefore(originalFunction) {
  return function() {
    clearCatReply();
    console.log('original');
    originalFunction();
  };
}

function clearCatReply() {
  console.log('clear cat');
  // window.fullViewModel.CatViewModel.selectedReply().value.currentValue('');
}

subscribeToButtons();

// let ctx= ko.contextFor(document.getElementById('mark-as-reviewed'))
// ctx.$data.bottomPanelItems.markAsReviewed=function(){console.log('newtest55')}
// ko.applyBindings(ctx.$data,document.getElementById('mark-as-reviewed'))
