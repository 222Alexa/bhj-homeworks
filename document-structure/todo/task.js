'use strict';
const taskInput = document.getElementById('task__input'); //поле ввода
const buttonAddTask = document.getElementById('tasks__add'); //кнопка добавления
const taskList = document.getElementById('tasks__list'); //текст задачи. который должен отобразиться внизу, рядом с кнопкой task__remove
const addTask = function () {
    const task = taskInput.value.trim()
    if (task) {
        taskList.insertAdjacentHTML('afterbegin', ` <div class="task">
              <div class="task__title">
                ${taskInput.value}
              </div>
              <a href="#" class="task__remove">&times;</a>
            </div>`)
        taskInput.value = '';
        addStorageTask(task);
    }
}

const addStorageTask = (task) => {
    let itemsTask = localStorage.getItem('items');
    itemsTask = itemsTask ? JSON.parse(itemsTask) : [];
    itemsTask.push(task);
    localStorage.setItem('items', JSON.stringify(itemsTask));
}

const onload = () => {
    let itemsTask = localStorage.getItem('items');
    itemsTask = itemsTask ? JSON.parse(itemsTask) : [];
    itemsTask.forEach(element => {
        taskList.insertAdjacentHTML('afterbegin', ` <div class="task">
              <div class="task__title">
                ${element}
              </div>
              <a href="#" class="task__remove">&times;</a>
            </div>`)
        taskInput.value = '';
    });
}

document.addEventListener('DOMContentLoaded', onload);

taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

buttonAddTask.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('task__remove')) {
        e.target.closest('.task').remove();
    }
    
    let itemsTask = localStorage.getItem('items');
    itemsTask = itemsTask ? JSON.parse(itemsTask) : [];
    // Здесь проблема - задача(самая первая) удаляется из localStorage при клике на любую задачу, даже не на крестик. 
    let index = itemsTask.findIndex(item => {
        item == document.getElementById('task__title');
    });
    
    itemsTask.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(itemsTask));
});

