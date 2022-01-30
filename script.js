const toDoDesc = document.querySelector(".todo-input");
const toAddbutton = document.querySelector(".todo-button");
const toDolist = document.querySelector(".todo-list");
const modal = document.querySelector(".modal");
const filter = document.querySelector(".filter-todo");
const appElements = document.querySelectorAll("form, .todo-container");

const marker = function (desc) {
  const markup = ` 
  <div class="todo">
  <li class="todo-item">${desc}</li>
  <i class="fas fa-check"></i>
  <i class="fas fa-trash">
</div>`;
  toDolist.insertAdjacentHTML("afterbegin", markup);
};

const addToDo = function () {
  // appears the notification in case user doesn't write anything input area
  if (!toDoDesc.value) {
    modal.classList.remove("hidden");
    appElements.forEach((el) => {
      el.classList.add("hidden");
    });
    return;
  }
  if (toDoDesc.value) {
    marker(toDoDesc.value);
  }
  saveLocalTodos(toDoDesc.value);
  toDoDesc.value = "";
};

toAddbutton.addEventListener("click", function (e) {
  e.preventDefault(); // research that!
  addToDo();
});
//closing the notification
modal.addEventListener("click", function (e) {
  // add click and escape feature!
  const modalClose = e.target;
  if (modalClose.classList.contains("close-modal")) {
    const modalPopUp = modalClose.parentElement;
    modalPopUp.classList.add("hidden");
    appElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  }
});

const deleteTodo = function (el) {
  const item = el.target;

  if (item.classList.contains("fa-trash")) {
    const deletingEl = item.parentElement;
    console.log(deletingEl);
    deletingEl.remove();
    removeLocalTodos(deletingEl);
  }
};
//
toDolist.addEventListener("click", deleteTodo);

const comleteToDo = function (e) {
  const completeditem = e.target;
  if (completeditem.classList.contains("fa-check")) {
    const completed = completeditem.parentElement;
    completed.classList.toggle("completed");
  }
};
// complete toDos
toDolist.addEventListener("click", comleteToDo);

const filterTodo = function (e) {
  const todosNode = toDolist.childNodes; //select child Nodes of Parent Node
  const convertedfromNode = Array.from(todosNode); // convert from Nodelist to Array
  const filtered = convertedfromNode.filter((el) => el.nodeType === 1); // select just div.todo nodes; div.todo nodetype 1

  filtered.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
    }
  });
};
//filtering toDos whether they are completed or not
filter.addEventListener("click", filterTodo);

const localcontrol = function () {
  let todos;
  return localStorage.getItem("todos") === null
    ? (todos = [])
    : (todos = JSON.parse(localStorage.getItem("todos")));
};

const saveLocalTodos = function (todo) {
  const todos = localcontrol();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeLocalTodos = function (todo) {
  const todos = localcontrol();
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = function () {
  const todos = localcontrol();
  todos.forEach((todoDescript) => {
    marker(todoDescript);
  });
};

document.addEventListener("DOMContentLoaded", getTodos);
