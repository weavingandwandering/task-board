const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");



//checking whether an element is being dragged
draggables.forEach((task) => {
  // draggables.check = innerText;
    task.addEventListener("dragstart",() =>{
        task.classList.add("is-dragging");
        saveItemScrum() 
    })
    task.addEventListener("dragend",() =>{
        task.classList.remove("is-dragging");
        saveItemScrum() 
    })
    
    
});

//Adds the element below the last task or above the selected task
droppables.forEach((zone) => {
    zone.addEventListener("dragover",(e) => {
        e.preventDefault();
        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");
        //position pointed is not the bottom task, adds it above the nearest task
        if(!bottomTask){
            zone.appendChild(curTask);
            saveItemScrum() 
        } else{
            zone.insertBefore(curTask,bottomTask);
            saveItemScrum() 
        }
    });
    
});

//checks the closest task and returns its positions
const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const{top} = task.getBoundingClientRect();
        const offset = mouseY - top;
        if (offset < 0 && offset > closestOffset){
            closestOffset = offset;
            closestTask = task
        }
    });
    return closestTask;
};

//getting forms, input and boxes for adding a new task

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");

//getting the input value when submit is pressed
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

//if there is no value, passes the code
  if (!value) return;

  //creates a new box with a draggable option
  const newTask = document.createElement("p");
  newTask.classList.add("task");
  
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  //checks if the element is being dragged to different lanes
  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });
//adds the task to the to do list

  todoLane.appendChild(newTask);
  newTask.parentElement.setAttribute("id","todo-lane") 
  input.value = "";
});

window.addEventListener("beforeunload",function () {
  saveItemScrum()
});


function saveItemScrum() {

  let todo_values = [];
  let doing_values = [];
  let done_values = [];
  let scrap_values = [];
 
  let dragged = document.querySelectorAll(".task");
  dragged.forEach((task) => {
    let check = task.parentElement;
    if(check.id=="done-lane"){
      done_values.push(task.innerHTML)
    } else if(check.id == "doing-lane"){
      doing_values.push(task.innerHTML)
    } else if(check.id == "scrap-lane"){
      scrap_values.push(task.innerHTML)
    } else{
      todo_values.push(task.innerHTML)
    }
  });
  localStorage.setItem("todo",todo_values);
  localStorage.setItem("doing",doing_values);
  localStorage.setItem("done",done_values);
};

window.addEventListener("load", loadItemsScrum());

const doingLane = document.getElementById("doing-lane");
const doneLane = document.getElementById("done-lane");


function loadItemsScrum() {
  // localStorage.clear();
  let a = localStorage.getItem("todo")
  let given = a.split(',');
  for (let i = 0; i < given.length; i++)
    {
      let newTask = document.createElement("p");
      newTask.classList.add("task");  
      newTask.setAttribute("draggable", "true");
      if (!given[i]==""){
      newTask.innerText = given[i];

      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });
    
      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
      });
      todoLane.appendChild(newTask);}
    }

  let b = localStorage.getItem("doing")
  given = b.split(',');
  for (let i = 0; i < given.length; i++)
    {
      let newTask = document.createElement("p");
      newTask.classList.add("task");  
      newTask.setAttribute("draggable", "true");
      if (!given[i]==""){
      newTask.innerText = given[i];

      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });
    
      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
      });

      document.getElementById("doing-lane").appendChild(newTask);

    }
    }
  let c = localStorage.getItem("done");
  given = c.split(',');
  for (let i = 0; i < given.length; i++)
    {
      let newTask = document.createElement("p");
      newTask.classList.add("task");  
      newTask.setAttribute("draggable", "true");
      if (!given[i]==""){
      newTask.innerText = given[i];

      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });
    
      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
      });
      document.getElementById("done-lane").appendChild(newTask);

    }

};

let d = localStorage.getItem("scrap");
  given = d.split(',');
  for (let i = 0; i < given.length; i++)
    {
      let newTask = document.createElement("p");
      newTask.classList.add("task");  
      newTask.setAttribute("draggable", "true");
      if (!given[i]==""){
      newTask.innerText = given[i];

      newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
      });
    
      newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
      });
      document.getElementById("scrap-lane").appendChild(newTask);

    }

};

};