"use strict"

let add_input = document.querySelector("#add-input"),
    add_edit = document.querySelectorAll(".edit"),
    add_delete = document.querySelectorAll(".delete"),
    add_btn = document.querySelector("#add-button"),
    todo_list = document.querySelector("#todo-list");

function createTodoItem(text) {
    const li_item = document.createElement("li");

    li_item.classList.add("todo-item");
    li_item.innerHTML = `
        <div class="todo-block">
            <input class="checkbox" type="checkbox">
            <label class="title">${text}</label>
            <input class="textfield non-active" type="text">
        </div>
        <div class="todo-block">
            <button class="edit">Изменить</button>
            <button class="delete">Удалить</button>
        </div>
        `;

    todo_list.appendChild(li_item);
    bindEvents(li_item);
}

function handleAdd(btn) {
    btn.preventDefault();
    if (add_input.value == "") return alert("Поле пустое");
    createTodoItem(add_input.value);
    add_input.value = "";
}

function bindEvents(item) {
    add_edit = item.querySelector(".edit"),
        add_delete = item.querySelector(".delete");

    add_edit.addEventListener("click", handleEdit);
    add_delete.addEventListener("click", handleDelete);
}

function handleDelete(btn) {
    btn.currentTarget.closest(".todo-item").remove();
}

function handleEdit(btn) {
    let todo_item = btn.currentTarget.closest(".todo-item"),
        title = todo_item.querySelector(".title"),
        textfield = todo_item.querySelector(".textfield"),
        value = title.innerText;

    if (btn.currentTarget.innerText == "ИЗМЕНИТЬ") {
        title.classList.add("non-active");
        textfield.value = value;
        btn.currentTarget.innerText = "СОХРАНИТЬ";

    } else {
        btn.currentTarget.innerText = "ИЗМЕНИТЬ";
        title.classList.remove("non-active");
        title.innerText = textfield.value;
    }

    textfield.classList.toggle("non-active");
}

add_btn.addEventListener("click", handleAdd);
add_edit.forEach(function(btn) {
    btn.addEventListener("click", handleEdit);
})
add_delete.forEach(function(btn) {
    btn.addEventListener("click", handleDelete);
})