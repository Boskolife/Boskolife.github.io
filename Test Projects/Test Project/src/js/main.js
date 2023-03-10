
const sidePanel = document.querySelector('.side_panel');
const sideBtnOpen = document.querySelector('.btn_open');
const sideBtnClose = document.querySelector('.btn_close');


function showPanel(){
    sidePanel.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hidePanel() {
    sidePanel.classList.remove('show');
    document.body.style.overflow = '';
}

sideBtnOpen.addEventListener('click', showPanel);
sideBtnClose.addEventListener('click', hidePanel);

