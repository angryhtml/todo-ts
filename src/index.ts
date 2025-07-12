interface Todo {
    text: string;
    completed: boolean;
}

const btn = document.getElementById('btn')! as HTMLButtonElement;
const input = document.getElementById('todoinput')! as HTMLInputElement;
const form = document.getElementById('formtodo')!;
const list = document.getElementById('todolist')!;
const btnClear = document.getElementById('btn-clear')! as HTMLButtonElement;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);
updateClearButton();

function readTodos(): Todo[] {
    const todosJSON = localStorage.getItem('todos');
    if (todosJSON === null) return [];
    return JSON.parse(todosJSON);
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function handleSubmit(e: Event): void {
    e.preventDefault();
    const newTodo: Todo = {
        text: input.value,
        completed: false,
    };
    const onlySpaces: boolean = !newTodo.text.trim().length;
    if (newTodo.text != '' && !onlySpaces) {
        createTodo(newTodo);
        todos.push(newTodo);
        saveTodos();
        input.value = '';
        updateClearButton();
    }
}
function handleClear(e: MouseEvent): void {
    e.preventDefault();
    list.replaceChildren();
    todos.length = 0;
    localStorage.removeItem('todos');
    updateClearButton();

}

function createTodo(todo: Todo) {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function () {
        todo.completed = checkbox.checked;
        if (checkbox.checked) {
            newLi.classList.add('checked');
            list.append(newLi);
        } else {
            newLi.classList.remove('checked');
            const firstCompleted = [...list.children]
                .find(li => li.querySelector('input')?.checked);
            list.insertBefore(newLi, firstCompleted || null);
        }
        saveTodos();
    })
    newLi.append(checkbox);
    newLi.append(todo.text);
    list.append(newLi);
}

function updateClearButton(): void {
    btnClear.disabled = todos.length === 0;
}

form.addEventListener('submit', handleSubmit);
btnClear.addEventListener('click', handleClear);