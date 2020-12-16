'use strict';
/*const isInViewport = function () {
    const revealArr = Array.from(document.querySelectorAll('.reveal'));
    for (let revealItems of revealArr) {
        const viewportHeight = window.innerHeight;
        const revealTop = revealItems.getBoundingClientRect().top;
        revealTop < viewportHeight ? revealItems.classList.add('reveal_active') : revealItems.classList.remove('reveal_active');
    }
}
document.addEventListener('scroll', isInViewport);
*/
const isInViewport = function () {
    const revealArr = Array.from(document.querySelectorAll('.reveal'));
    const viewportHeight = window.innerHeight;
    revealArr.forEach(element => {
        element.getBoundingClientRect().top < viewportHeight ? element.classList.add('reveal_active') : element.classList.remove('reveal_active');
    });
}

document.addEventListener('scroll', isInViewport);// просто второй вариант. отработка применения стрелочных функций