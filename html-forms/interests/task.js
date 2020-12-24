'use strict';


const interestList = document.querySelector('.interests_main');
interestList.addEventListener('change', (event) => {
    if (event.target.closest('.interest').querySelector('.interests')) {
        const arrElements = Array.from(event.target.closest('.interest').querySelectorAll('.interest__check'));
        arrElements.forEach(check => {
            check.checked = event.target.checked;
        });
    }

    function isCheckedElement(element) {
        if (element.closest('.interest').querySelector('interests')) {
            const checkedElement = element.closest('.interest').querySelectorAll('.interest__check');
            const checkedParent = element.parentElement;
            if (checkedElement.some(e => e.checked === false)) {
                checkedParent.parentElement.checked = false;
                checkedParent.parentElement.indeterminate = true;
            }
            if (checkedElement.every(e => e.checked === false)) {
                checkedParent.parentElement.checked = false;
                checkedParent.parentElement.indeterminate = false;
            } else {
                checkedParent.parentElement.checked = false;
                checkedParent.parentElement.indeterminate = true;
            }
        }
        isCheckedElement(checkedElement);
    }
});
/*
почти, почти все работает...но не работает как мне надо(
не применяется indeterminate. Я почти уверена, что не дописала еще один вызов isCheckedElement, н оне понимаю - куда его пристроить.
свмый бестолковый вопрос в этом, я не понимаю - куда в консоли смтореть, где проходит check на элемент. я порылась во вкладке Event Listeners, там есть мой обработчик -...и всё. сходила на стековерфло - там предлагается написать проверочный скрипт в самом коде. 
есть же какой-то простой способ ставить в браузере галку на элементе и в консоли видеть - checked он или нет? Подскажите, пожалуйста!

*/