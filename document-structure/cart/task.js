'use strict';
const cart = document.querySelector('.cart__products');
const addCart = Array.from(document.querySelectorAll('.product__add'));
const quantityControl = Array.from(document.querySelectorAll(".product__quantity-control"));
const cartProducts = Array.from(document.querySelectorAll('.cart__product'));
quantityControl.forEach(element => element.addEventListener('click', isChangeQuantity));

addCart.forEach(element => {
    element.addEventListener('click', addProductToCart);
});

function isChangeQuantity(e) {
    const quantity = e.target.closest(".product__quantity-controls").querySelector(".product__quantity-value");
    if (e.target.classList.contains("product__quantity-control_dec")) {
        quantity.innerText = +quantity.innerText - 1;
        if (+quantity.innerText <= 0) {
            quantity.innerText = 1;
        }
    }
    else {
        quantity.innerText = +quantity.innerText + 1;
    }
}



function addProductToCart(e) {
    const product = e.target.closest('.product');
    const productId = product.dataset.id;
    const productValue = product.querySelector('.product__quantity-value').innerText;
    const productImg = product.querySelector('.product__image').getAttribute('src');
    
   
       let searchProduct = Array.from(document.querySelectorAll('.cart__product')).find(item => item.dataset.id ==productId);
        if (searchProduct ===  e.target.closest('.product').dataset.id) {//в корзине уже есть такой товар
            let countProductToBasket = searchProduct.querySelector('.cart__product-count');
            console.log(`добавлено ${cartProducts.querySelector('.cart__product-count').innerText}`);
            countProductToBasket.innerText = Number(countProductToBasket.innerText) + Number(productValue);
        }
        else  { //В корзине этого товара еще нет
            cart.insertAdjacentHTML('beforeEnd', `<div class="cart__product" data-id="${productId}">
                    <img class="cart__product-image" src="${productImg}">
                    <div class="cart__product-count">${productValue}</div>
                </div>`);
        }
    }



/* С функцией добавления товара меня постигла боль - я не понимаю, что, в какой момент я делаю не так. Функция считает, что в корзине никогда нет товара с карточкой и вместо увеличения счетчика закидывает новые карточки с одним и тем же товаром.*/