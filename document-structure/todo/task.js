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
        console.log(taskList);
}
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
    if(e.target.classList.contains('task__remove')){
        console.log(e.target.classList.contains('task__remove'));
          e.target.closest('.task').remove();
    }
});

// c задачами повышенной сложности временно завязала - синаптический коллапс.