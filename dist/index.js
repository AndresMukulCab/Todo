//DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const toggleCompletedBtn = document.getElementById("toggle-completed-btn");
const removeCompletedBtn = document.getElementById("remove-completed-btn");

let showCompleted = true;


const collection = new JsonTodoCollection("Adam");


function renderTasks() {
    taskList.innerHTML = "";
    collection.getTodoItems(showCompleted).forEach(item => {
        const taskElement = document.createElement("div");
        taskElement.className = `task-item ${item.complete ? "complete" : ""}`;
        taskElement.innerHTML = `
            <span>${item.task}</span>
            <button onclick="toggleComplete(${item.id})">${item.complete ? "Deshacer" : "Completar"}</button>
            <button onclick="removeTask(${item.id})">Eliminar</button>
        `;
        taskList.appendChild(taskElement);
    });
}


addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        collection.addTodo(taskText);
        taskInput.value = "";
        renderTasks();
    }
});


window.toggleComplete = function (id) {
    const item = collection.getTodoById(id);
    if (item) {
        collection.markComplete(id, !item.complete);
        renderTasks();
    }
};


window.removeTask = function (id) {
    collection.itemMap.delete(id);
    renderTasks();
};


toggleCompletedBtn.addEventListener("click", () => {
    showCompleted = !showCompleted;
    renderTasks();
});


removeCompletedBtn.addEventListener("click", () => {
    collection.removeComplete();
    renderTasks();
});


renderTasks();