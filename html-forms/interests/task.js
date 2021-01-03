'use strict';

function clickCheckBox(event) {
    if (event.target.closest('.interest').querySelector('.interests')) {
        const checkArr = Array.from(event.target.closest('.interest').querySelectorAll('.interest__check'));
        checkArr.forEach(elem => {
            elem.checked = event.target.checked;
            elem.indeterminate = false;
        });
    }

    function isCheckedElement(e) {
        if (!e.closest('.interests').classList.contains('.interest__main')) {
            const siblings = Array.from(e.closest('.interests').querySelectorAll('.interest__check'));
            const parent = e.closest('.interests').closest('.interest').querySelector('.interest__check');
            if (siblings.every(e => e.checked === true)) { //если все дочерние элементы с галкой
                parent.checked = true;
                parent.indeterminate = false;
            }
            else if (siblings.every(e => e.checked === false)) { //если все дочерние элементы без галки
                parent.checked = false;
                parent.indeterminate = false;
            }
            else { //здесь должен быть метод some, но и без него сработает, если хотя бы один дочерний элемент без галки
                parent.checked = false;
                parent.indeterminate = true;
            }
            isCheckedElement(parent);
        }
    }
    isCheckedElement(event.target.closest('.interest__check'));
}
Array.from(document.querySelectorAll('.interest__check')).forEach(element => {
    element.addEventListener('change', clickCheckBox);
});

/* Дефолтный вариант:
function clickCheckBox(event) {
    if (event.target.closest('.interest').querySelector('.interests')) {
        const checkArr = Array.from(event.target.closest('.interest').querySelectorAll('.interest__check'));
        checkArr.forEach(elem => {
            elem.checked = event.target.checked;
        });
    }

    function isCheckedElement(e) {
        let target = e.target.closest('.interests').closest('.interest').querySelectorAll('.interest__check');
        if (!e.closest('.interest').querySelector('.interests')) {
            const siblings = Array.from(e.closest('.interests').querySelectorAll('.interest__check'));
            const check = siblings.every(e => e.checked);
            check ? target.checked = true : target.checked = false;
        }
    }
    }
    Array.from(document.querySelectorAll('.interest__check')).forEach(element => {
        element.addEventListener('change', clickCheckBox);
    });
    */