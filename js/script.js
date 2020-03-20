"use strict"

let add_input = document.querySelector("#add-input"),
    add_edit = document.querySelectorAll(".edit"),
    add_delete = document.querySelectorAll(".delete"),
    add_btn = document.querySelector("#add-button"),
    todo_list = document.querySelector("#todo-list"),
    checkbox = document.querySelectorAll(".checkbox");

function createElement(tag, props, ...children) {
    const todoItem = document.createElement(tag);

    Object.keys(props).forEach(function(prop) {
        todoItem[prop] = props[prop];
    })

    children.forEach(child => {
        if (typeof child == "string") {
            child = document.createTextNode(child);
        }
        todoItem.appendChild(child);
    })

    return todoItem;
}

function createTodoItem(text) {
    const add_edit = createElement("button", { className: "edit" }, "Изменить"),
        add_delete = createElement("button", { className: "delete" }, "Удалить"),
        checkbox = createElement("input", { className: "checkbox", type: "checkbox" }),
        title = createElement("label", { className: "title" }, text),
        textfield = createElement("input", { className: "textfield non-active", type: "text" }),
        todo_block1 = createElement("div", { className: "todo-block" }, checkbox, title, textfield),
        todo_block2 = createElement("div", { className: "todo-block" }, add_edit, add_delete),
        li = createElement("li", { className: "todo-item" }, todo_block1, todo_block2);

    todo_list.appendChild(li);
    bindEvents(li);
}

function handleAdd(btn) {
    btn.preventDefault();
    if (add_input.value == "") return alert("Поле пустое");

    createTodoItem(add_input.value);
    add_input.value = "";
}

function bindEvents(item) {
    let add_edit = item.querySelector(".edit"),
        add_delete = item.querySelector(".delete"),
        checkbox = item.querySelector(".checkbox");

    add_edit.addEventListener("click", handleEdit);
    add_delete.addEventListener("click", handleDelete);
    checkbox.addEventListener("click", handleCheckbox);
}

function handleDelete(btn) {
    btn.currentTarget.closest(".todo-item").remove();
}

function handleCheckbox(btn) {
    const todo_item = btn.currentTarget.closest(".todo-item");
    todo_item.classList.toggle("checkbox-active");
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
checkbox.forEach(function(btn) {
    btn.addEventListener("click", handleCheckbox);
})