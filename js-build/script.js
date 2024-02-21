"use strict";
// Declare variables
let toDoNameInput;
let toDoStatusInput;
let toDoSubmitButton;
let toDoList;
let doneList;
let editToDoInput;
let confirmEdit;
// set up ToDoStatus values
var ToDoStatus;
(function (ToDoStatus) {
    ToDoStatus["UNDONE"] = "Undone";
    ToDoStatus["DONE"] = "Done";
})(ToDoStatus || (ToDoStatus = {}));
// default initial values (storage)
const entries = [
    { toDo: "Einkaufen", toDoStatus: ToDoStatus.DONE },
    { toDo: "Lernen", toDoStatus: ToDoStatus.DONE },
    { toDo: "Backen", toDoStatus: ToDoStatus.UNDONE },
    { toDo: "Küche aufräumen", toDoStatus: ToDoStatus.UNDONE }
];
// wait until DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables I
    toDoList = document.getElementById("to-to-list");
    doneList = document.getElementById("done-list");
    confirmEdit = document.getElementById("save-changes");
    editToDoInput = document.getElementById("edit-to-do-name-input");
    // render list in the beginning
    renderList();
    // Initialize variables II
    toDoNameInput = document.getElementById("to-do-name-input");
    toDoStatusInput = document.getElementById("to-do-status-input");
    toDoSubmitButton = document.getElementById("to-do-submit-button");
    // EventListener for SubmitBtn
    toDoSubmitButton.addEventListener("click", (evt) => {
        // Error Message (no ToDoName or NoToDoStatus)
        if (toDoNameInput.value == "" || toDoStatusInput.selectedIndex == 0) {
            alert("Enter a ToDoName and a ToDoStatus");
            return;
        }
        // avoid default behaviour
        evt.preventDefault();
        // getToDo Element
        const toDo = {
            toDo: toDoNameInput.value,
            toDoStatus: toDoStatusInput.value,
        };
        appendChild(toDo);
    });
});
function renderList() {
    // reset Lists
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    for (let i = 0; i <= entries.length - 1; i++) {
        // Initialize necessary elements
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdStatus = document.createElement("td");
        const tdButtons = document.createElement("td");
        const btnToggleStatus = document.createElement("button");
        const btnEdit = document.createElement("button");
        const btnDelete = document.createElement("button");
        // render toToList
        if (entries[i].toDoStatus == ToDoStatus.UNDONE) {
            // Insert structure
            toDoList.appendChild(tr);
            tr.appendChild(tdName);
            tr.appendChild(tdStatus);
            tr.appendChild(tdButtons);
            // Insert toDoName
            tdName.textContent = entries[i].toDo;
            // Insert toDoStatus
            tdStatus.textContent = entries[i].toDoStatus;
            // Insert toDoButtons
            tdButtons.classList.add("btn-group", "w-100");
            // Done button
            tdButtons.appendChild(btnToggleStatus);
            btnToggleStatus.classList.add("btn", "btn-success");
            btnToggleStatus.textContent = "Done";
            btnToggleStatus.dataset.index = String(i); // Bind index to the button
            // Edit button
            tdButtons.appendChild(btnEdit);
            btnEdit.classList.add("btn", "btn-warning");
            btnEdit.setAttribute("data-bs-toggle", "modal");
            btnEdit.setAttribute("data-bs-target", "#edit");
            btnEdit.textContent = "Edit";
            btnEdit.dataset.index = String(i); // Bind index to the button
            // Delete button
            tdButtons.appendChild(btnDelete);
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.textContent = "Delete";
            btnDelete.id = "delete-btn";
            btnDelete.dataset.index = String(i); // Bind index to the button
        }
        else {
            // Insert structure
            doneList.appendChild(tr);
            tr.appendChild(tdName);
            tr.appendChild(tdStatus);
            tr.appendChild(tdButtons);
            // Insert toDoName
            tdName.textContent = entries[i].toDo;
            // Insert toDoStatus
            tdStatus.textContent = entries[i].toDoStatus;
            // Insert toDoButtons
            tdButtons.classList.add("btn-group", "w-100");
            // Done button
            tdButtons.appendChild(btnToggleStatus);
            btnToggleStatus.classList.add("btn", "btn-success");
            btnToggleStatus.textContent = "Undone";
            btnToggleStatus.dataset.index = String(i); // Bind index to the button
            // Edit button
            tdButtons.appendChild(btnEdit);
            btnEdit.classList.add("btn", "btn-warning");
            btnEdit.textContent = "Edit";
            btnEdit.setAttribute("data-bs-toggle", "modal");
            btnEdit.setAttribute("data-bs-target", "#edit");
            btnEdit.dataset.index = String(i); // Bind index to the button
            // Delete button
            tdButtons.appendChild(btnDelete);
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.textContent = "Delete";
            btnDelete.id = "delete-btn";
            btnDelete.dataset.index = String(i); // Bind index to the button
        }
        // Event Listener for DeleteBtn
        btnDelete.addEventListener("click", () => {
            handleDeleteEvent(Number(btnDelete.getAttribute("data-index")));
        });
        // Event Listener for DoneBtn
        btnToggleStatus.addEventListener("click", () => {
            toggleStatus(entries[Number(btnToggleStatus.getAttribute("data-index"))]);
        });
        // Event Listener for EditConfirmBtn
        btnEdit.addEventListener("click", () => {
            editToDo(Number(btnEdit.getAttribute("data-index")));
        });
    }
}
function appendChild(toDo) {
    // // Add the new ToDoItem to the entries array
    entries.push(toDo);
    // // Render the list again to reflect the changes
    renderList();
}
function handleDeleteEvent(index) {
    entries.splice(index, 1);
    renderList();
}
function toggleStatus(toDo) {
    toDo.toDoStatus = toDo.toDoStatus == ToDoStatus.UNDONE ? ToDoStatus.DONE : ToDoStatus.UNDONE;
    renderList();
}
function editToDo(index) {
    confirmEdit.addEventListener("click", () => {
        entries[index].toDo = editToDoInput.value;
        renderList();
    });
}
