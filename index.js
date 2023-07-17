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
  --id;

function addtask(task) {
  todolistarray.push(task);
}

function deletetask(id) {
  const index = todolistarray.findIndex((task) => task.id === id);
  if (index !== -1) {
    todolistarray.splice(index, 1);
  }
}

function savetask(id, newval) {
  const taskIndex = todolistarray.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    todolistarray[taskIndex].taskDetails = newval;
  }
}

function renderlist() {
  const listcontainer = document.getElementById("listitems");
  listcontainer.innerHTML = "";

  for (let i = 0; i < todolistarray.length; i++) {
    if(todolistarray[i].taskDetails == ""){
      continue;
    }
    const listItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.innerHTML = todolistarray[i].taskDetails;

    const buttonsbox = document.createElement("div");
    buttonsbox.classList.add("btncontainer");

    const editicon = document.createElement("img");
    editicon.src = "https://cdn-icons-png.flaticon.com/512/3597/3597088.png";
    editicon.alt = "Edit";
    editicon.classList.add("edit-icon");

    const deletebtn = document.createElement("img");

    deletebtn.src = "https://cdn-icons-png.flaticon.com/512/3405/3405244.png";
    deletebtn.alt = "delete"

    const taskID = todolistarray[i].id;

    editicon.addEventListener("click", ()=>{
      const editinput = document.createElement("input");
      editinput.type = "text";
      editinput.value = todolistarray[i].taskDetails;

      const savebtn = document.createElement("button");
      savebtn.innerHTML = "Save";
      savebtn.classList.add("save-button");

      savebtn.addEventListener("click", ()=>{
        savetask(taskID, editinput.value);
        renderlist();
      });

      listItem.innerHTML = "";
      listItem.appendChild(editinput);
      listItem.appendChild(savebtn);
    });

    deletebtn.addEventListener("click", ()=>{
      deletetask(taskID);
      renderlist();
    });

    buttonsbox.appendChild(editicon);
    buttonsbox.appendChild(deletebtn);

    listItem.appendChild(taskText);
    listItem.appendChild(buttonsbox);

    listcontainer.appendChild(listItem);
  }
}

const savebtn = document.getElementById("savebtn");

savebtn.addEventListener("click", (prinitem = ()=>{
    const taskinput = document.getElementById("taskinput");
    const task = {
      id: todolistarray.length+1,
      taskDetails: taskinput.value,
    };
    addtask(task);
    taskinput.value = "";
    renderlist();
  })
);

renderlist();