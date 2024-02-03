// script.js
// access element with todosList id
const todosList = document.getElementById("todosList");
// access element with searchInput id
const searchInput = document.getElementById("searchInput");
// access element with incompleteCheckbox id
const incompleteCheckbox = document.getElementById("incompleteCheckbox");

// Exercise 3C: Display todos on the webpage
const displayTodos = (todos) => {
  // reset todosList's innerHTML by assigning it to ""
  todosList.innerHTML = "";
  // iterate each todo in todos using for...let...of loop
  for (let todo of todos) {
    // create a list item element (li) and assign to item variable
    const item = document.createElement("li");
    // add class of "todo" into list variable
    item.classList.add("todo");
    // create a div element (div) and assign to title variable
    const title = document.createElement("div");
    // assign title's textContent to todo's title (todo.title)
    title.textContent = todo.title;
    // add class of "todo-title" onto title
    title.classList.add("todo-title");
    // append title element as a child of item
    item.appendChild(title);
    // create a div element (div) and assign to userId variable
    const userId = document.createElement("div");
    // assign userId's textContent to "User ID: " + todo's userId (todo.userId)
    userId.textContent = "User ID: " + todo.userId;
    // add class of "userId" onto userId
    userId.classList.add("userId");
    // append userId element as a child of item
    item.appendChild(userId);
    // check if todo is completed (todo.completed)
    if (todo.completed) {
      // if yes, add class of "compelted" onto item
      item.classList.add("completed");
    }
    // append item element as a child of todosList
    todosList.appendChild(item);
  }
};

// Exercise 3D: Search todos based on the input
const filterSearch = (todos) => {
  // obtain searchInput's value (.value) converted to lowercase (.toLowerCase()) assigned to searchValue
  const searchValue = searchInput.value.toLowerCase();
  // filter todos and assign result to filteredTodos
  const filteredTodos = todos.filter((todo) =>
    // check todo's title in lowercase includes searchValue
    todo.title.toLowerCase().includes(searchValue)
  );
  // call displayTodos and pass in filteredTodos
  displayTodos(filteredTodos);
};

// Exercise 3E: Filter todos based on completion status
const filterIncomplete = (todos) => {
  // obtain incompleteCheckbox's checked value (.checked) assigned to searchValue
  const showIncomplete = incompleteCheckbox.checked;
  // filter todos and assign result to filteredTodos
  const filteredTodos = todos.filter((todo) => {
    // if checkbox is checked (showIncomplete)
    if (showIncomplete) {
      // return opposite value of todo's completed (!todo.completed)
      return !todo.completed;
      // else
    } else {
      // return true
      return true;
    }
  });
  // call displayTodos and pass in filteredTodos
  displayTodos(filteredTodos);
};

// Fetch todos from the API data source
fetch("https://jsonplaceholder.typicode.com/todos")
  // then obtain json from fetched response
  .then((response) => response.json())
  // then console log obtained json
  .then((jsonReponse) => {
    console.log(jsonReponse);
    // call displayTodos function and pass in response's json
    displayTodos(jsonReponse);
    // on searchInput, add an 'input' event listener which calls filterSearch(jsonResponse)
    searchInput.addEventListener("input", () => filterSearch(jsonReponse));
    // on incompleteCheckbox, add 'change' event listener which calls filterIncomplete(jsonResponse)
    incompleteCheckbox.addEventListener("change", () =>
      filterIncomplete(jsonReponse)
    );
  })
  .catch((error) => console.error(error));
