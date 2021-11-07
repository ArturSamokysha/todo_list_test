let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    dispalyMessages();
}

addButton.addEventListener('click', function () {

    let newTodo = {
        todo: addMessage.value,
        checked: false,
    }

    todoList.push(newTodo);
    dispalyMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function dispalyMessages() {

    let displayMessage = '';
    if (todoList.length === 0) {
        todo.innerHTML = '';
    };
    todoList.forEach(function (item, i) {
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}'>${item.todo}</label>
        </li>
        `
        todo.innerHTML = displayMessage;
    });
};

todo.addEventListener('change', function (event) {
    let idInput = event.target.getAttribute('id');
    let forLable = todo.querySelector('[for=' + idInput + ']');
    let valueLable = forLable.innerHTML;


    todoList.forEach(function (item) {
        if (item.todo === valueLable) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
});

todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            todoList.splice(i, 1);
        }
        dispalyMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
    });
});



