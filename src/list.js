const todoForm = document.querySelector(".js-toForm");
const input = todoForm.querySelector("input");
const pendingUl = document.querySelector(".pendingList");
const finishedUl = document.querySelector(".finishedList");

let pendingArr = [];
let finishedArr = [];

const PENDING_LIST = "PENDING";
const FINISHED_LIST = "FINISHED";

function saveToDo(lstKey) {
  localStorage.setItem(
    lstKey,
    JSON.stringify(lstKey === PENDING_LIST ? pendingArr : finishedArr)
  );
}

function deleteToDo(e) {
  const li = e.target.parentNode;
  const ispending = li.parentNode.className === "pendingList";
  // console.log(li.parentNode.className);
  (ispending ? pendingUl : finishedUl).removeChild(li);

  const cleanArr = (ispending ? pendingArr : finishedArr).filter(function (
    toDo
  ) {
    return toDo.id !== li.id;
  });
  console.log(cleanArr);
  if (ispending) pendingArr = cleanArr;
  else finishedArr = cleanArr;
  const lstKey = ispending ? PENDING_LIST : FINISHED_LIST;
  saveToDo(lstKey);
}

function moveTodo(e) {
  const li = e.target.parentNode;
  const ispending = li.parentNode.className === "pendingList";
  (ispending ? finishedUl : pendingUl).appendChild(li);

  const srcArr = (ispending ? pendingArr : finishedArr).filter(function (toDo) {
    return toDo.id !== li.id;
  });
  if (ispending) {
    pendingArr = srcArr;
    console.log(li);
    setTaskAtLocal(li.querySelector("span").innerText, li.id, FINISHED_LIST);
  } else {
    setTaskAtLocal(li.querySelector("span").innerText, li.id, PENDING_LIST);
    finishedArr = srcArr;
  }
  saveToDo(FINISHED_LIST);
  saveToDo(PENDING_LIST);
}

function setTodoList(currentInput, lstKey) {
  const li = document.createElement("li");
  const btnFinished = document.createElement("button");
  btnFinished.innerText = "👌";
  btnFinished.addEventListener("click", moveTodo);

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "❌";
  btnDelete.addEventListener("click", deleteToDo);

  const span = document.createElement("span");
  span.innerText = currentInput;
  const newID = String(
    Date.now() + (lstKey === PENDING_LIST ? pendingArr : finishedArr).length
  );
  li.appendChild(span);
  li.appendChild(btnFinished);
  li.appendChild(btnDelete);
  li.id = newID;
  (lstKey === PENDING_LIST ? pendingUl : finishedUl).appendChild(li);
  setTaskAtLocal(currentInput, newID, lstKey);
}

function setTaskAtLocal(currentInput, newID, lstKey) {
  const toDoOBJ = {
    id: newID,
    text: currentInput,
  };
  (lstKey === PENDING_LIST ? pendingArr : finishedArr).push(toDoOBJ);
  saveToDo(lstKey);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentInput = input.value;
  setTodoList(currentInput, PENDING_LIST);
  input.value = "";
}

function loadListItem() {
  const pendingList = localStorage.getItem(PENDING_LIST);
  if (pendingList !== null) {
    const pendingItem = JSON.parse(pendingList);
    // for (let i = 0; i < pendingItem.length; i++)
    //   setTodoList(pendingItem[i].text, pendingUl);
    pendingItem.forEach((eachItem) => {
      setTodoList(eachItem.text, PENDING_LIST);
    });
  }

  const finishedList = localStorage.getItem(FINISHED_LIST);
  if (finishedList !== null) {
    const finishedItem = JSON.parse(finishedList);
    finishedItem.forEach((eachItem) => {
      setTodoList(eachItem.text, FINISHED_LIST);
    });
  }
}

function init() {
  loadListItem();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
