// Todo list array
let todolistarray = [];

let id = 0;

fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    return response.json();
  })
  .then((data) => {
    // Process the received data
    // console.log(data);
    data.forEach((item) => {
      todolistarray.push({ id: id, taskDetails: `${item.title}` });
      id++;
    });

    prinitem();
  })
  .catch((error) => {
    // Handle any errors that occurred during the fetch request
    console.log("Error:", error.message);
  });
   
  // --id;
  todolistarray.pop();

// Function to add a task to the array
function addtask(task) {
  todolistarray.push(task);
}

// Function to delete a task from the array
function deletetask(id) {
  const index = todolistarray.findIndex((task) => task.id === id);
  if (index !== -1) {
    todolistarray.splice(index, 1);
  }
}

// Function to render the todo list

function renderlist() {
  const listContainer = document.getElementById("listitems");
  listContainer.innerHTML = "";

  for (let i = 0; i<todolistarray.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = todolistarray[i].taskDetails;

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete";

    const x = todolistarray[i].id;
    deletebtn.addEventListener("click", () => {
      deletetask(x);
      renderlist();
    });

    listItem.appendChild(deletebtn);
    listContainer.appendChild(listItem);
  }
}

// Add click event listener to the save button
const savebtn = document.getElementById("savebtn");

savebtn.addEventListener(
  "click",
  (prinitem = () => {
    const taskinput = document.getElementById("taskinput");

    const task = {
      id: todolistarray.length + 1,
      taskDetails: taskinput.value,
    };
    addtask(task);
    taskinput.value = "";
    renderlist();
  })
);

// Initial rendering of the todo list
renderlist();
