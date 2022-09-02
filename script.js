const toDoDesc = document.querySelector(".todo-input");
const toAddbutton = document.querySelector(".todo-button");
const toDolist = document.querySelector(".todo-list");
const modal = document.querySelector(".modal");
const filter = document.querySelector(".filter-todo");
const appElements = document.querySelectorAll("form, .todo-container");
const delBtn = document.querySelector(".todo-buttondel");
const impToDo = document.querySelector(".importance-todo");

const Task = class {
  id = (Date.now() + "").slice(-10);
  constructor(descrpt, level, status) {
    this.descrpt = descrpt;
    this.level = level;
    this.status = status;
  }
};

const LetToDo = class {
  //  tasks = [];
  constructor() {
    document.addEventListener("DOMContentLoaded", this.getTodos.bind(this));
    toAddbutton.addEventListener("click", this.producenewTask.bind(this));
    modal.addEventListener("click", this.removeModal);
    toDolist.addEventListener("click", this.deleteTodo.bind(this));
    toDolist.addEventListener("click", this.comleteToDo.bind(this));
    filter.addEventListener("click", this.filterTodo.bind(this));
  }

  getTodos() {
    const todos = this.localcontrol();
    todos.forEach((newTask) => {
      this.renderTask(newTask);
    });
  }

  producenewTask(e) {
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
      newTask.id = newTask.id + 1;
      this.renderTask(newTask);
    }
    toDoDesc.value = "";
    impToDo.selectedIndex = "1";
    this.saveLocalTodos(newTask);
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

  renderTask(newTask) {
    const markup = ` 
    <div class="todo"  data-id="${newTask.id}" >
      <li class="todo-item"><strong>${newTask.descrpt}</strong></li>
      <li class="todo-item"><strong>${newTask.level}</strong></li>
      <button class= "complete-btn"><i class="fas fa-check"></i></button>
      <button class= "delete-btn"><i class="fas fa-trash"></i></button>
    </div>`;
    toDolist.insertAdjacentHTML("afterbegin", markup);
  }

  localcontrol() {
    let todos;
    return localStorage.getItem("todos") === null
      ? (todos = [])
      : (todos = JSON.parse(localStorage.getItem("todos")));
  }

  saveLocalTodos(newTask) {
    const todos = this.localcontrol();
    todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  deleteTodo(e) {
    const item = e.target;
    if (item.classList.contains("fa-trash")) {
      const todos = this.localcontrol();
      const deletingEl = item.parentElement;
      const deletingEl2 = deletingEl.parentElement; // workaround, it should be permanent solution
      const deletingTask = deletingEl2.dataset.id;
      deletingEl2.remove();
      console.log(todos);
      //
      const updatedTodos = todos.filter((item) => item.id !== deletingTask);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  }
  comleteToDo(e) {
    const completeditem = e.target;
    if (completeditem.classList.contains("fa-check")) {
      const todos = this.localcontrol();
      const completed = completeditem.parentElement; // workaround, it should be permanent solution
      completed.parentElement.classList.toggle("completed");
      const completedTaskId = completed.parentElement.dataset.id;
      todos.forEach((el) => {
        if (el.id === completedTaskId) {
          el.status = "done";
        }
      });
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
  filterTodo(e) {
    //filtering toDos whether they are completed or not
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
  }
};

const toDoApp = new LetToDo();
