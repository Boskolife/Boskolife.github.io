"use strict";

var sidePanel = document.querySelector('.side_panel');
var sideBtnOpen = document.querySelector('.btn_open');
var sideBtnClose = document.querySelector('.btn_close');

function showPanel() {
  sidePanel.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function hidePanel() {
  sidePanel.classList.remove('show');
  document.body.style.overflow = '';
}

sideBtnOpen.addEventListener('click', showPanel);
sideBtnClose.addEventListener('click', hidePanel);
//# sourceMappingURL=main.js.map
