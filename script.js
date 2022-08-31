const toDoDesc = document.querySelector(".todo-input");
const toAddbutton = document.querySelector(".todo-button");
const toDolist = document.querySelector(".todo-list");
const modal = document.querySelector(".modal");
const filter = document.querySelector(".filter-todo");
const appElements = document.querySelectorAll("form, .todo-container");
const delBtn = document.querySelector(".todo-buttondel");
const impToDo = document.querySelector(".importance-todo");

const comleteToDo = function (e) {
  const completeditem = e.target;
  if (completeditem.classList.contains("fa-check")) {
    const completed = completeditem.parentElement; // workaround, it should be permanent solution
    const completed2 = completed.parentElement;
    completed2.classList.toggle("completed");
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
  //   const todos = localcontrol();
  //   todos.forEach((todoDescript) => {
  //     marker(todoDescript);
  //   });
};

const Task = class {
  constructor(descrpt, level) {
    this.descrpt = descrpt;
    this.level = level;
  }
};

const App = class {
  tasks = [];

  constructor() {
    toAddbutton.addEventListener("click", this.ProducenewTask.bind(this));
    modal.addEventListener("click", this.removeModal);
    toDolist.addEventListener("click", this.deleteTodo);
  }

  ProducenewTask(e) {
    e.preventDefault();
    let newTask;

    if (!toDoDesc.value) {
      modal.classList.remove("hidden");
      appElements.forEach((el) => {
        el.classList.add("hidden");
      });
      return;
    }
    if (toDoDesc.value) {
      e.preventDefault();
      newTask = new Task(toDoDesc.value, impToDo.value);
      this.renderTask(newTask);
    }

    toDoDesc.value = "";
    impToDo.selectedIndex = "1";
  }
  renderTask(newTask) {
    const markup = ` 
    <div class="todo">
      <li class="todo-item"><strong>${newTask.descrpt}</strong></li>
      <li class="todo-item"><strong>${newTask.level}</strong></li>
      <button class= "complete-btn"><i class="fas fa-check"></i></button>
      <button class= "delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;
    toDolist.insertAdjacentHTML("afterbegin", markup);
  }

  removeModal(e) {
    //closing the notification
    // add click and escape feature!
    const modalClose = e.target;
    if (modalClose.classList.contains("close-modal")) {
      const modalPopUp = modalClose.parentElement;
      modalPopUp.classList.add("hidden");
      appElements.forEach((el) => {
        el.classList.remove("hidden");
      });
    }
  }

  deleteTodo(e) {
    const item = e.target;
    if (item.classList.contains("fa-trash")) {
      const deletingEl = item.parentElement;
      const deletingEl2 = deletingEl.parentElement; // workaround, it should be permanent solution
      deletingEl2.remove();
      removeLocalTodos(deletingEl2);
    }
  }
  controllocal() {
    console.log("works");
  }
};

const app = new App();

document.addEventListener("DOMContentLoaded", getTodos);
