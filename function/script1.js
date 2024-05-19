const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.classList.add("close");
        li.appendChild(span);
        li.classList.add("list-item");
        listContainer.appendChild(li);
        saveData();
    }
    inputBox.value = "";
    addCloseEventListeners(); // Add event listeners for the new close buttons
}

function addCloseEventListeners() {
    const closeButtons = document.querySelectorAll("span.close");
    closeButtons.forEach(button => {
        button.removeEventListener("click", closeTask); // Remove previous listeners to prevent duplication
        button.addEventListener("click", closeTask);
    });
}

function closeTask(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    addCloseEventListeners(); // Ensure close buttons work after loading from storage
}




showTask();
