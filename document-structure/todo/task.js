'use strict';
const taskInput = document.getElementById('task__input');//поле ввода
const buttonAddTask = document.getElementById('tasks__add');//кнопка добавления
const taskList = document.getElementById('tasks__list');//текст задачи. который должен отобразиться внизу, рядом с кнопкой task__remove

const addTask = function(){
    if(taskInput.value.trim()){
    taskList.insertAdjacentHTML('afterbegin',` <div class="task">
              <div class="task__title">
                ${taskInput.value}
              </div>
              <a href="#" class="task__remove">&times;</a>
            </div>`)
    taskInput.value = '';
}
}
const removeTask = function() {
    const deletedTask = document.querySelector('.task');
    deletedTask.remove();
}

taskInput.addEventListener('keyup', (e) =>{
    if(e.key ==='Enter'){
        addTask();
    }
});

buttonAddTask.addEventListener('click', (e) => {
  e.preventDefault();
    addTask();
});

taskList.addEventListener('click', (e) => {
    if(!e.target.classList.contains('task__remove')){
        return;
    }else {
        removeTask();
    }
});

// c задачами повышенной сложности временно завязала - синаптический коллапс.