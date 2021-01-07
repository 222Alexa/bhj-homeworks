'use strict';
const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php', true);
xhr.send();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        title.textContent = response.data.title;
        for (let key in response.data.answers) {
            answers.insertAdjacentHTML('beforeend', ` <button class="poll__answer">
              ${response.data.answers[key]}
            </button>`);
        }
    };
});
answers.addEventListener('click', (event) => {
    if (event.target.classList.contains('poll__answer')) {
        alert('спасибо, Ваш голос засчитан!');
    }
});