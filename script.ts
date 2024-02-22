// Declare variables
let toDoNameInput: HTMLInputElement;
let toDoStatusInput: HTMLSelectElement;
let toDoSubmitButton: HTMLButtonElement;
let toDoList: HTMLTableSectionElement;
let doneList: HTMLTableSectionElement;
let editToDoInput : HTMLInputElement;
let confirmEdit: HTMLButtonElement;

// set up ToDoStatus values
enum ToDoStatus {
    UNDONE = "Undone",
    DONE = "Done",
}

// set up ToDoType
type ToDo = {
    toDo: string;
    toDoStatus: ToDoStatus;
}

// default initial values (storage)
const entries : ToDo[] = [
    { toDo : "Einkaufen", toDoStatus : ToDoStatus.DONE },
    { toDo : "Lernen", toDoStatus : ToDoStatus.DONE },

    { toDo : "Backen", toDoStatus : ToDoStatus.UNDONE },
    { toDo : "Küche aufräumen", toDoStatus : ToDoStatus.UNDONE}
];

// wait until DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize variables I
    toDoList = document.getElementById("to-to-list") as HTMLTableSectionElement;
    doneList = document.getElementById("done-list") as HTMLTableSectionElement;
    confirmEdit = document.getElementById("save-changes") as HTMLButtonElement;
    editToDoInput = document.getElementById("edit-to-do-name-input") as HTMLInputElement;
    // render list in the beginning
    renderList();
    // Initialize variables II
    toDoNameInput = document.getElementById("to-do-name-input") as HTMLInputElement;
    toDoStatusInput = document.getElementById("to-do-status-input") as HTMLSelectElement;
    toDoSubmitButton = document.getElementById("to-do-submit-button") as HTMLButtonElement;

    // EventListener for SubmitBtn
    toDoSubmitButton.addEventListener("click", (evt : MouseEvent) => {
        // Error Message (no ToDoName or NoToDoStatus)

        // Avoid submitting if one input field is empty and return
       if (toDoNameInput.value == "" || toDoStatusInput.selectedIndex == 0) {
            return;
        }

        // avoid default behaviour
        evt.preventDefault();

        // getToDo Element
        const toDo: ToDo = {
            toDo: toDoNameInput.value,
            toDoStatus: toDoStatusInput.value as ToDoStatus,
        }
        appendChild(toDo);

        // reset fields
        toDoNameInput.value = "";   // clear ToDoInput field
        toDoStatusInput.value = ""; // reset ToDoStatus field
    })
})

function renderList() {
    // reset Lists
    toDoList.innerHTML = "";
    doneList.innerHTML = "";
    for (let i : number = 0; i <= entries.length - 1; i++) {
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
            btnToggleStatus.dataset.index = String(i);  // Bind index to the button

            // Edit button
            tdButtons.appendChild(btnEdit);
            btnEdit.classList.add("btn", "btn-warning");
            btnEdit.setAttribute("data-bs-toggle", "modal");
            btnEdit.setAttribute("data-bs-target", "#edit");
            btnEdit.textContent = "Edit";
            btnEdit.dataset.index = String(i);  // Bind index to the button

            // Delete button
            tdButtons.appendChild(btnDelete);
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.textContent = "Delete";
            btnDelete.id = "delete-btn";
            btnDelete.dataset.index = String(i); // Bind index to the button
        } else {
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
            btnToggleStatus.dataset.index = String(i);  // Bind index to the button

            // Edit button
            tdButtons.appendChild(btnEdit);
            btnEdit.classList.add("btn", "btn-warning");
            btnEdit.textContent = "Edit";
            btnEdit.setAttribute("data-bs-toggle", "modal");
            btnEdit.setAttribute("data-bs-target", "#edit");
            btnEdit.dataset.index = String(i);  // Bind index to the button

            // Delete button
            tdButtons.appendChild(btnDelete);
            btnDelete.classList.add("btn", "btn-danger");
            btnDelete.textContent = "Delete";
            btnDelete.id = "delete-btn"
            btnDelete.dataset.index = String(i); // Bind index to the button
        }

        // Event Listener for DeleteBtn
        btnDelete.addEventListener("click", () => {
            handleDeleteEvent(Number(btnDelete.getAttribute("data-index")));
        })

        // Event Listener for DoneBtn
        btnToggleStatus.addEventListener("click", () => {
            toggleStatus(entries[Number(btnToggleStatus.getAttribute("data-index"))]);
        })

       // Event Listener for EditConfirmBtn
        btnEdit.addEventListener("click", () => {
            editToDo(Number(btnEdit.getAttribute("data-index")));
        })
    }
}

function appendChild(toDo: ToDo) {
    // // Add the new ToDoItem to the entries array
    entries.push(toDo);
    // // Render the list again to reflect the changes
    renderList();
}

function handleDeleteEvent(index: number) {
    entries.splice(index, 1);
    renderList();
}

function toggleStatus(toDo: ToDo) {
    toDo.toDoStatus = toDo.toDoStatus == ToDoStatus.UNDONE ? ToDoStatus.DONE : ToDoStatus.UNDONE;
    renderList();
}

function editToDo(index: number) {
    confirmEdit.addEventListener("click", () => {
        entries[index].toDo = editToDoInput.value;
        editToDoInput.value = "";
        renderList();

    })
}