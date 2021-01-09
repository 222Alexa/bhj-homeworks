'use strict';
const form = document.getElementById('signin');
const formAuth = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userId = document.getElementById('user_id');
const btnExit = document.getElementById('btn__exit');

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.userId) {
        welcome.classList.add('welcome_active');
        userId.textContent = localStorage.userId;
    }
    else {
        form.classList.add('signin_active');
    }
});

formAuth.addEventListener('submit', e => {
    e.preventDefault();
    shippingRequest();
});

btnExit.addEventListener('click', () => {
    localStorage.removeItem('userId');
    formAuth.reset();
    document.location.reload();
});

function shippingRequest() {
    const xhr = new XMLHttpRequest();
    const formData = new FormData(formAuth);
    xhr.open('POST', ' https://netology-slow-rest.herokuapp.com/auth.php');
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (data.success) {
                localStorage.userId = data.user_id;
                userId.textContent = localStorage.user_id;
                form.classList.remove('signin_active');
                welcome.classList.add('welcome_active');
            }
            else {
                alert('Неверный логин/пароль');
                formAuth.reset();
            }
        }
    });
    xhr.send(formData);
}