"use strict";
const btn = document.getElementById('btn');
const input = document.getElementById('todoinput');
const form = document.getElementById('formtodo');
const list = document.getElementById('todolist');
const btnClear = document.getElementById('btn-clear');
const todos = readTodos();
todos.forEach(createTodo);
updateClearButton();
function readTodos() {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    const onlySpaces = !newTodo.text.trim().length;
    if (newTodo.text != '' && !onlySpaces) {
        createTodo(newTodo);
        todos.push(newTodo);
        saveTodos();
        input.value = '';
        updateClearButton();
    }
}
function handleClear(e) {
    e.preventDefault();
    list.replaceChildren();
    todos.length = 0;
    localStorage.removeItem('todos');
    updateClearButton();
}
function createTodo(todo) {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    if (todo.completed) {
        newLi.classList.add('checked');
    }
    checkbox.addEventListener('change', function () {
        todo.completed = checkbox.checked;
        if (checkbox.checked) {
            newLi.classList.add('checked');
            list.append(newLi);
        }
        else {
            newLi.classList.remove('checked');
            const firstCompleted = [...list.children]
                .find(li => { var _a; return (_a = li.querySelector('input')) === null || _a === void 0 ? void 0 : _a.checked; });
            list.insertBefore(newLi, firstCompleted || null);
        }
        saveTodos();
    });
    newLi.append(checkbox);
    newLi.append(todo.text);
    list.append(newLi);
}
function updateClearButton() {
    btnClear.disabled = todos.length === 0;
}
form.addEventListener('submit', handleSubmit);
btnClear.addEventListener('click', handleClear);
