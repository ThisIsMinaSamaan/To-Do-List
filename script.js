const tasks = [];

const addTask = function () {
  const taskName = document.getElementById("taskName").value;
  const priority = document.getElementById("priority").value;
  const task = {name: taskName, priority: priority};
 
  const isValid = validate(task);
  if(isValid == false){ 
    alert("Enter Valid Data");
    return;
  }

  addTasktoLists(task);
  loadTable();
};

const validate = function (task) {
  if(task.name.trim() == "") return false;
  if(task.priority < 1) return false;
  return true;
};

const addTasktoLists = function (task) {
  tasks.push(task);
};

 const loadTable = function() {
  let tbody ="";
  for(let i = 0; i < tasks.length; i++){
    tbody += getTableRow(i, tasks[i]);
  }
  document.getElementById("tbody").innerHTML= tbody;
 };

 const getTableRow = function(i,task) {
  let tr = getRowContent(i,task);
  
  return tr;
 };

 const delTask = function(i) {
  tasks.splice(i,1);
  loadTable();
 };


 const renderTaskRow = (i) => {
  document.getElementById(`row_${i}`).outerHTML = getRowContent(i, tasks[i]);
};
const getRowContent = (i, task) => {
  return `<tr id="row_${i}">
    <td>${i + 1}</td><td>${
    task.editMode
      ? `<input id="name_${i}" value="${task.name}" />`
      : task.name.trim()
  }</td>
    <td>${
      task.editMode
        ? `<input id="priority_${i}" value="${task.priority}" />`
        : task.priority
    }</td>
    <td>${
      task.editMode
        ? `<button onclick="save(${i})">Save</button><button onclick="cancel(${i})">Cancel</button>`
        : `<button onclick="editTask(${i})">Edit</button>`
    }</td>
    <td><button onclick="delTask(${i})">Delete</button></td>
    </tr>`;
};

const cancel = (i) => {
  tasks[i].editMode = false;
  renderTaskRow(i);
};

const save = (i) => {
  tasks[i].name = document.getElementById(`name_${i}`).value;
  tasks[i].priority = document.getElementById(`priority_${i}`).value;
  tasks[i].editMode = false;
  renderTaskRow(i);
};


const editTask = (i) => {
  tasks[i].editMode = true;
  renderTaskRow(i);
};

const getHighestPriority = () => {
  if (tasks.length == 0)
    return null;

  tasks.sort((a, b) => a.priority - b.priority );
  loadTable();
};
