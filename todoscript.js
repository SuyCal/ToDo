// Empty script file to start with
//after user enters a list in solution, the user will click on the add task button and a new element will appear
//list description must be added to the lsit as a new list item which then proceded by a checkbox


//step 1 grab element from dom
//step 2 write a function ot handle the event
//step 3 connect variable with the function via an event listener so that 
//an event triggers the DOM 

//let addbutton = document.getElementById('button');
//let TaskInput = document.getElementById('add-task');
//let toDoListContainer = document.getElementById('to-do-list');

//function onAddTaskClicked(e){
   //let taskname = newTaskInput.value; 
   //newTaskInput.value = "";

   //toDoListContainer.insertAdjacentHTML('afterbegin', taskname);
//}

//addbutton.addEventListener('click', onAddTaskClicked);

//create an LI element and add description in it.
//spend LI to the todolistcontainer
//append chekcbox and label to the LI and append the LI to the todo list
//when user checks tasks, line should be strike through


// -->Step 1: Grab elements from DOM
let newTaskInput = document.getElementById('input-task')
let addTaskButton = document.getElementById('add-task')
let todoListContainer = document.getElementById('todo-list')

let templateElement = document.getElementById("list-item-template")
let template = templateElement.innerHTML;

let showActiveButton = document.getElementById("show-active")
let showAllButton = document.getElementById("show-all")
let showCompletedButton = document.getElementById("show-completed")

function onAddTaskClicked(event) {
    //grab the text entered by the user in the input task text box and add it as a list item to my unordered list(ul)

  let taskName = newTaskInput.value;
  newTaskInput.value = ""

  if (taskName !=""){
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('afterbegin', taskHTML)

    saveTask(taskName, false)
  }

}
function onTodoListClicked(event)
{
  let targetElement = event.target;

  while (!targetElement.classList.contains("task")){
    targetElement = targetElement.parentElement;
  }
  let checkbox = targetElement.querySelector(".checkbox")
  if (checkbox.checked){
   targetElement.classList.add("completed")
  } else {
    targetElement.classList.remove("completed")
  }
  let taskNameElement = targetElement.querySelector(".task-name")
  let taskName = taskNameElement.innerText
  saveTask(taskName, checkbox.checked)
}


function showActiveTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)

  for (let i=0; i<tasks.length; i++){
    if (tasks[i].classList.contains("completed")){
      tasks[i].style.display = "none"
      
    } else{
      tasks[i].style.display = "block"
    }
  }
}


function showAllTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)
  for (let i=0; i<tasks.length; i++){
     if(tasks[i].classList.contains("completed")){
      tasks[i].style.display = "block"
      
     } else{
     tasks[i].style.display = "block"
  }
}
}

function showCompletedTasks(event){
  let tasks = document.getElementsByClassName("task")
  console.log(tasks)

  for (let i=0; i<tasks.length; i++){
    if (tasks[i].classList.contains("completed")){
      tasks[i].style.display = "block"
      
    } else{
      tasks[i].style.display = "none"
      
    } 
    }
  }

  function saveTask(name, IsCompleted){
    localStorage.setItem(name, IsCompleted)
  }

  function rendertasks(){
    for(let i=0; i<localStorage.length; i++){
      let taskName = localStorage.key(i)
      let isCompleted = localStorage.getItem(taskName) == "true"
      let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
      if (!isCompleted){
        todoListContainer.insertAdjacentHTML('afterbegin', taskHTML)
      }
    }
  }




addTaskButton.addEventListener('click', onAddTaskClicked)
todoListContainer.addEventListener('click', onTodoListClicked)
showActiveButton.addEventListener('click', showActiveTasks)
showAllButton.addEventListener('click', showAllTasks)
showCompletedButton.addEventListener('click', showCompletedTasks)
rendertasks();
