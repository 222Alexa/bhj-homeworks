'use strict';
const modal = document.getElementById('subscribe-modal');
const btnClose = document.querySelector('.modal__close');
btnClose.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.cookie = 'status = active';
    alert(document.cookie);
});
window.addEventListener('DOMContentLoaded', () => {
    if (!document.cookie.includes('status = active')) {
        modal.classList.add('modal_active');
    }
    else {
        document.cookie = '';
        return;
    }
});