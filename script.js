// my todos singleton store
const todos = [{ id: "1", description: "My first todo", status: "new" }];
const todoInput = document.querySelector('.todo-input');
const list = document.querySelector("#root").querySelector(".list");

// initialization to be executed on load
function init(){
    createTodos();
}
//functions to draw todos in dom from array "todos"
function createTodos(){
  todos.map((t, index) => {
    const todo = insertTodo(t);
    if(todos[index].status === "completed"){
       todo.style.textDecoration = "line-through";
       todo.style.opacity = "0.5";
       todo.style.backgroundColor = "rgb(192, 184, 230)";
    }
    if(todos[index].status === "pending"){
      todo.style.backgroundColor = "blue";
    }
    list.appendChild(todo);
  });
}

function insertTodo(t){
  const todo = document.createElement("li");
  todo.id = `${t.id}`;
  todo.innerText = t.description;
  let todoId = todo.id;
  const trashButton = addTrashButton(todoId);
  todo.appendChild(trashButton);
  const editButton = addEditButton(todoId);
  todo.appendChild(editButton);
  const completedButton = addCompletedButton(todoId);
  todo.appendChild(completedButton);
  const startedButton = addStartedButton(todoId);
  todo.appendChild(startedButton);
  list.appendChild(todo);
  return todo; 
}
//functions to add buttons
function addTrashButton(todoId){
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  trashButton.onclick = () => deleteTodo(todoId);
  return trashButton;
}

function addEditButton(todoId){
  const editButton = document.createElement("button");
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  editButton.onclick = () => editTodo(todoId);
  return editButton;
}

function addCheckButton(todoId){
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("check-btn");
  checkButton.onclick = () => checkTodo(todoId);
  return checkButton;
}

function addCompletedButton(todoId){
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check">Done</i>';
  completedButton.classList.add("complete-btn");
  completedButton.onclick = () => completeTodo(todoId);
  return completedButton;
}

function addStartedButton(todoId){
  const startedButton = document.createElement("button");
  startedButton.innerHTML = '<i class="fas fa-play">Start</i>';
  startedButton.classList.add("start-btn");
  startedButton.onclick = () => startTodo(todoId);
  return startedButton;
}

function getTodoElement(todoId) {
   return document.getElementById(todoId);
}

//adding a todo
function addTodo(t){
  let id = todos.length + 1;
  t = {id: id.toString(), description: todoInput.value, status: "new"};
  todos.push(t);
  updateList(t);
}

function updateList(t){
 insertTodo(t);
}

//deleting a todo
function deleteTodo(todoId){
   let elem = getTodoElement(todoId);
   elem.remove();
   todos.splice(todoId-1,1);
   //updating the attribute "id" of every t in todos
   updateIds();
}

function updateIds(){
  todos.map((t,index) => {
    t.id = index + 1; 
  });
  // erasing everything from the ul-list and re-drawing it
  list.innerHTML = " ";
  createTodos();
}
//editing a todo
function editTodo(todoId){
  let elem = getTodoElement(todoId);
  //erasing everything from the li element and redrawing it as input element
  elem.innerHTML='<input type="text" class="todo-input2">';
  const checkButton = addCheckButton(todoId);
  elem.appendChild(checkButton);
  const trashButton = addTrashButton(todoId);
  elem.appendChild(trashButton);
  const editButton = addEditButton(todoId);
  elem.appendChild(editButton);
}

function checkTodo(todoId){
  let elem = getTodoElement(todoId);
  //geting the value from the new input value and saving it to todos
  todos[todoId-1].description = elem.children[0].value;
  //erasing everything from the li element and redrawing it
  console.log(elem);
  elem.innerText = elem.children[0].value;
  const trashButton = addTrashButton(todoId);
  elem.appendChild(trashButton);
  const editButton = addEditButton(todoId);
  elem.appendChild(editButton);
  const completedButton = addCompletedButton(todoId);
  elem.appendChild(completedButton);
  const startedButton = addStartedButton(todoId);
  elem.appendChild(startedButton);
}

//changing todo status
function completeTodo(todoId){
  let elem = getTodoElement(todoId);
  todos[todoId-1].status = "completed";
  elem.style.textDecoration = "line-through";
  elem.style.opacity = "0.5";
  elem.style.backgroundColor = "rgb(192, 184, 230)";
  disableEdit();
  disableStart();
}

function startTodo(todoId){
  let elem = getTodoElement(todoId);
  todos[todoId-1].status = "pending";
  elem.style.backgroundColor = "blue";
  disableEdit();
}

function disableEdit(){
 const editBtn= document.querySelector(".edit-btn");
 editBtn.disabled = true;

}
function disableStart(){
  const startBtn= document.querySelector(".start-btn");
  startBtn.disabled = true;
 
 }