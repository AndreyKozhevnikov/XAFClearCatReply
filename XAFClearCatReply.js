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
  window.fullViewModel.bottomPanelItems.submitButtonClick = performCustomOperationBefore(_submitButtonClick, isSecondLineAssigned);

}
function performCustomOperationBefore(originalFunction, conditionFunction) {
  return function() {
    console.log(conditionFunction);
    if (conditionFunction == undefined || conditionFunction())
      clearCatReply();
    console.log('original');
    originalFunction();
  };
}

function isSecondLineAssigned() {
  return window.supportCenter.viewModel.issueDetails.selectedAssignTo.value.currentValue() == '2f795f88-e3ef-4913-9fdb-66c1e7525766'; // .!Support Reviewed Queue 2f795f88-e3ef-4913-9fdb-66c1e7525766
}


function clearCatReply() {
  console.log('clear cat');
  // window.fullViewModel.CatViewModel.selectedReply().value.currentValue('');
}

subscribeToButtons();

// let ctx= ko.contextFor(document.getElementById('mark-as-reviewed'))
// ctx.$data.bottomPanelItems.markAsReviewed=function(){console.log('newtest55')}
// ko.applyBindings(ctx.$data,document.getElementById('mark-as-reviewed'))
