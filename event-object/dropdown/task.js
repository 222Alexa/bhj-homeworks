'use strict';

function clickValue(event) {
    event.target.nextElementSibling.classList.toggle('dropdown__list_active');
}

function clickLink(event) {
    if (event.target.closest('.dropdown__list').previousElementSibling.classList.contains('dropdown__value')) {
        event.target.closest('.dropdown__list').previousElementSibling.textContent = event.target.textContent;
    }
    event.target.closest('.dropdown__list').classList.toggle('dropdown__list_active');
}

Array.from(document.getElementsByClassName('dropdown__value')).forEach(el => el.addEventListener('click', (event) => clickValue(event)));

Array.from(document.getElementsByClassName('dropdown__list')).forEach(el => el.addEventListener('click', (event) => {
    event.preventDefault();
    clickLink(event);
}));

/*Шаг 1. Определить общего родителя элементов для отслеживания событий


Шаг 2. Прикрепить к родительскому элементу обработчик событий
document.getElementById('').addEventListener('click', handler) прикрепляет обработчик событий к родителю кнопок. Этот обработчик также реагирует на нажатия на кнопки, так как события нажатий на кнопки всплывают по всем элементам-предкам (благодаря распространению событий).

Шаг 3. Использовать event.target для выбора целевого элемента
Когда кнопка нажата, функция-обработчик вызывается с аргументом: объектом event. Свойство event.target обращается к элементу, на котором произошло событие (в нашем примере этот элемент – кнопка):*/
