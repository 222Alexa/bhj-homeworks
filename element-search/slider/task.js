'use strict';
const prewBtn = document.querySelector('.slider__arrow_prev');
const nextBtn = document.querySelector('.slider__arrow_next');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderDots = (document.querySelectorAll('.slider__dot'));
let count = 0;
prewBtn.onclick = function () {
    changeActive(); 
    count--;
    if (count < 0) { 
        count = sliderItems.length - 1;
    }
    changeActive();
}
nextBtn.onclick = function () {
    changeActive();
    count++; 
    if (count >= sliderItems.length) {
        count = 0;
    }
    changeActive();
}
for (let i = 0; i < sliderDots.length; i++) {
    sliderDots[i].onclick = function () {
        changeActive();
        count = i;
        changeActive();
    }
}

function changeActive() {
    if (sliderItems[count].classList.contains('slider__item_active')) {
        sliderItems[count].classList.remove('slider__item_active');
        sliderDots[count].classList.remove('slider__dot_active');
    }
    else {
        sliderItems[count].classList.add('slider__item_active');
        sliderDots[count].classList.add('slider__dot_active');
    }
}
/*
prewBtn.onclick = function () { // здесь я изо всех сил пыталась сократить количество кода, хотя бы в объеме. но в погоне за оптимизацией где-то недокрутила. По идее все должно работать точно так же, как и код выше, но в мире гармонии случился сбой. И в такой реализации точка пагинации начальная и конечная (в зависимости от того,  в какую сторону перемещаться) остаются обе подсвеченными. в консоли смотрела, ничего не поняла. Прошу помочь!
    changeActive();
    count = count - 1 < 0 ? sliderItems.length - 1 : count - 1;
    changeActive();
}
nextBtn.onclick = function () {
    changeActive();
    count = (count + 1 == sliderItems.length) ? 0 : count + 1;
    changeActive();
}
for (let i = 0; i < sliderDots.length; i++) {
    sliderDots[i].onclick = function () {
        changeActive();
        count = i;
        changeActive();
    }
}

function changeActive() {
    // без дополнительных проверок удалит элемент с селектором, если он есть, или добавит  - если его нет.
    sliderItems[count].classList.toggle('slider__item_active');
    sliderDots[count].classList.toggle('slider__dot_active');
}*/

/* Еще вопрос: валидатор кода не одобряет мое творчество и пишет
'Don't make functions within a loop js'. И я бы и рада убрать функцию из цикла, раз это не по фен шуй, но вариант обойтись без цикла  - это вообще отказаться от него, но он у меня тоже не работает. что я делаю не так и с какого момента? где дообразоваться как это правильно сделать? Спасибо за содействие!
sliderDots.forEach((element, index) => {
    element.onclick = function () {
        changeActive();
    };
});*/