// ==UserScript==
// @name         XAF Clear Cat Reply
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  clear CAT reply when a ticked is assigned to 2nd line
// @author       AndreyK
// @match        https://isc.devexpress.com/Thread/WorkplaceDetails*
// @grant        none
// ==/UserScript==
/*eslint strict: ["error", "global"]*/
/* global ko*/
'use strict';

function subscribeToButtons() {
  window.fullViewModel.bottomPanelItems_submitButtonClick = window.fullViewModel.bottomPanelItems.submitButtonClick;
  window.fullViewModel.bottomPanelItems.submitButtonClick = customSubmitButtonClick();

  let _originalMarkAsReviewed = window.fullViewModel.bottomPanelItems.markAsReviewed;
  window.fullViewModel.bottomPanelItems.markAsReviewed = customMarkAsReviewed(_originalMarkAsReviewed);

  let markAsReviewedButton = document.getElementById('mark-as-reviewed');
  ko.cleanNode(markAsReviewedButton);
  ko.applyBindings(window.fullViewModel, markAsReviewedButton); // without this code the 'mark-as-reviewed' button stil call the original markAsReviewed method. some kind of magic I suppose (don't want to research)
}

function customMarkAsReviewed(originalMarkAsReviewed) {
  return function() {
    originalMarkAsReviewed();
    clearCatReply();
    setTimeout(window.fullViewModel.bottomPanelItems.submitButtonClick, 0);
  };
}

function customSubmitButtonClick() {
  return function() {
    if (isSecondLineAssigned()) {
      clearCatReply();
    }
    window.fullViewModel.bottomPanelItems_submitButtonClick();
  };
}

function isSecondLineAssigned() {
  return window.supportCenter.viewModel.issueDetails.selectedAssignTo.value.currentValue() == '2f795f88-e3ef-4913-9fdb-66c1e7525766'; // .!Support Reviewed Queue 2f795f88-e3ef-4913-9fdb-66c1e7525766
}

function clearCatReply() {
  window.fullViewModel.CatViewModel.selectedReply().value.currentValue('');
}
window.onload = function() {
  subscribeToButtons();
};
