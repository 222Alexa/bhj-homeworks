'use strict';
const addCart = Array.from(document.querySelectorAll('.product__add'));
const quantityControl = Array.from(document.querySelectorAll(".product__quantity-control"));
const cart = document.querySelector('.cart__products');

quantityControl.forEach(element => element.addEventListener('click', isChangeQuantity));
addCart.forEach(element => {
    element.addEventListener('click', addProductToCart);
});
cart.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart__remove')) {
        e.target.closest('.cart__product').remove();
    }
    isProductstoCart();

});

function isProductstoCart() { //Проверка корзины - есть ли в ней товар
    const cartContainer = document.querySelector('.cart');
    if (cart.querySelector('.cart__product') === null) {
        cartContainer.classList.add('cart__hidden'); // - нет товара - скрыть корзину
    } else {
        cartContainer.classList.remove('cart__hidden'); // - есть - показать корзину
    }
}

function isChangeQuantity(e) { //проверка количества товара
    const quantity = e.target.closest(".product__quantity-controls").querySelector(".product__quantity-value");
    if (e.target.classList.contains("product__quantity-control_dec")) {
        quantity.innerText = +quantity.innerText - 1;
        if (+quantity.innerText <= 0) {
            quantity.innerText = 1;
        }
    } else {
        quantity.innerText = +quantity.innerText + 1;
    }
}

function addProductToCart(e) {
    const product = e.target.closest('.product');
    const productId = product.dataset.id;
    const productQuantity = product.querySelector('.product__quantity-value').innerText;
    const productImg = product.querySelector('.product__image').getAttribute('src');
    let searchProduct = Array.from(document.querySelectorAll('.cart__product')).find(item => item.dataset.id === productId);
    if (searchProduct) { //в корзине уже есть такой товар
        let countProductToBasket = searchProduct.querySelector('.cart__product-count');
        countProductToBasket.innerText = Number(countProductToBasket.innerText) + Number(productQuantity);
        /*

При реализации анимации, вам необходимо:

Получить у изображения-продукта его координаты через getBoundingClientRect
Получить у изображения в корзине его координаты через getBoundingClientRect
Высчитать разницу между двумя изображениями по оси X и по оси Y
Задать количество шагов, за которое одно изображение «настигнет другое»
С помощью setTimeout/setInterval в течение заданного количества шагов постоянно уменьшать разницу между двумя картинками
По окончанию анимации удалить изображение-копию 

   */
        const image = e.target.closest('.product').querySelector('img'); // клонируем изображение товара в каталоге
        const clonImg = image.cloneNode();
        const clonImgLeft = image.getBoundingClientRect().left; // получаем координаты Х товара в каталоге
        const clonImgTop = image.getBoundingClientRect().top; // получаем координаты Y товара в каталоге
        clonImg.style.left = clonImgLeft + 'px'; //добавляем позиционирование блока картинки
        clonImg.style.top = clonImgTop + 'px';
        clonImg.style.position = 'fixed';
        product.appendChild(clonImg); //добавляем клон в разметку
        const flyImg = searchProduct.querySelector('.img'); // записываем изображение товара корзине
        const flyImgLeft = searchProduct.getBoundingClientRect().left; // получаем координаты Х товара в корзине
        const flyImgTop = searchProduct.getBoundingClientRect().top; // получаем координаты Y товара в корзине
        const differenceLeft = (clonImgLeft - flyImgLeft) / 50; //получаем разницу между координатами и задаем 50 шагов
        const differenceTop = (clonImgTop - flyImgTop) / 50;
        let timerFlyImg = setInterval(() => {
            const box = clonImg.getBoundingClientRect();
            if (box.top <= flyImgTop || box.left >= flyImgLeft) {
                clonImg.remove();
                clearInterval(timerFlyImg);
            }
            clonImg.style.left = box.left - differenceLeft + 'px';
            clonImg.style.top = box.top - differenceTop + 'px';
        }, 10);
        //animation(clonImg, 'left', differenceLeft );
        animation(clonImg, 'top', differenceTop);
    } else { //В корзине этого товара еще нет
        cart.insertAdjacentHTML('beforeEnd', `<div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${productImg}">
                    <div class="cart__product-count">${productQuantity}</div>
                    <span><a href=# class = "cart__remove"></a></span>
                </div>`);
    }
    isProductstoCart();
    addProductToStorage(productId, productImg, productQuantity);

}

function animation(element, property, diff) {
    let coords = element.getBoundingClientRect();
    element.style.left = coords.left + diff + 'px';
    element.style.top = coords.top + diff + 'px';
}


//LocalStorage
// Здесь проблема: поняла, что корзина и продукты в ней в LS должна заполняться и представляться как объект, сохраняться как строка. и я перебираю  корзину LS в попытке  заполнить ее, и ничего не получается
function onload() {
    let basketStorage = localStorage.getItem('basket');
    basketStorage = basketStorage ? JSON.parse(basketStorage) : {};
    if (basketStorage.length != 0) {
        document.querySelector('.cart').classList.remove('cart__hidden');
    }
    Object.values(basketStorage).forEach(element => {
        const {
            id,
            img,
            quantity
        } = element;
        cart.insertAdjacentHTML('beforeEnd', `<div class="cart__product" data-id="${id}">
                    <img class="cart__product-image" src="${img}">
                    <div class="cart__product-count">${quantity}</div>
                    <span><a href=# class = "cart__remove"></a></span>
                </div>`);
    });
}

function addProductToStorage(productId, productImg, productQuantity) {
    let basketStorage = localStorage.getItem('basket');
    basketStorage = basketStorage ? JSON.parse(basketStorage) : {};
    if (basketStorage[productId]) {
        basketStorage[productId].quantity += productQuantity;
    } else {
        basketStorage[productId] = {
            id: productId,
            img: productImg,
            quantity: productQuantity //здесь количество товаров в корзине не суммируется, а конкатенируется  - 1111111
        };
    }
    localStorage.setItem('basket', JSON.stringify(basketStorage));
}


document.addEventListener('DOMContentLoaded', onload);
