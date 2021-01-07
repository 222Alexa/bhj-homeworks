'use strict ';
let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com', true);
xhr.send();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        document.getElementById('loader').classList.remove('loader_active');
    };
    let coin = JSON.parse(xhr.responseText).response.Valute;
    document.getElementById('items').innerHTML = '';
    getAnswer(coin);
    localStorage.setItem('currency', xhr.responseText);
});

function getAnswer(item) {
    for (let key in item) {
        document.getElementById('items').insertAdjacentHTML('beforeend', `
      <div class="item">
      <div class="item__code">
      ${item[key].CharCode}
      </div>
      <div class="item__value">
      ${item[key].Value}
      </div>
      <div class="item__currency">
      руб.
      </div>
      </div>
      `);
    }
}
window.addEventListener('load', () => {
    const lastCurrency = JSON.parse(localStorage.getItem('currency')).response.Valute;
    document.getElementById('loader').classList.remove('loader_active');
    getAnswer(lastCurrency);
});