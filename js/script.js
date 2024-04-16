const form = document.querySelector("[data-form]");
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");

// empty array
let todoArr = [];

// form parth

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let id = Math.random() * 1000000;

  const todo = new Todo(id, input.value);

  todoArr = [...todoArr, todo];

  UI.displayData();
  UI.clearInput();
  UI.removeTodo();
  //   add to storage
  Storage.addTodStorage(todoArr);
});

// make object instance
class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}

class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `<div class="todo">
      <p>${item.todo}</p>
      <span class="remove" data-id=${item.id}>🗑️</span>
      </div>`;
    });
    lists.innerHTML = displayData.join(" ");
  }
  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      //   remove from array
      UI.removeFromArray(btnId);
    });
  }
  static removeFromArray(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
  }
}

class Storage {
  static addTodStorage(todoArr) {
    let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
    return storage;
  }

  static getStorage() {
    let storage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return storage;
  }
}
