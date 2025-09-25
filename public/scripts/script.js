
// Side Menu
// Hamburger click event
const hamburgerButton = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburgerButton.addEventListener("click", () => {
    sideMenu.classList.toggle("open");
});

// Toggle the color of selection buttons when selected
const selectionButtons = document.querySelectorAll('div[class="sortingButton"]');
if (selectionButtons.length > 0) {
    document.getElementsByClassName("sortingButton")[0].classList.add("active");
};

selectionButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        selectionButtons.forEach(b => {
            b.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Toggle the color of button list selection when selected
// Toggle Lists card visibility 
const listItems = document.querySelectorAll(".listItem");

listItems.forEach(item => {
    
	item.addEventListener("click", async () => {
        item.classList.toggle('active');
        const active = item.classList?.contains('active') || false;

		const name = item.getAttribute("data-name");
		const target = document.querySelector(`.tasksContainer[data-name="${name}"]`);
		if (target) {
			target.classList.toggle("hidden");
		};

        await fetch(`/api/editStatus/${item.dataset.name}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active })
        });
    });
});

// New list PopUp

const createListBtn = document.getElementById("plusIcon");
createListBtn.addEventListener("click", () => {
    openPopup(type="list")
});


// Open/Close PopUp
function openPopup(type) {
    document.getElementById(`${type}Popup`).classList.add("pop");
}

function closePopup(type) {
    document.getElementById(`${type}Popup`).classList.remove("pop");
}

// Modify content (title & button)
function modifyPopUpContent(cardTitle, buttonContent) {
    document.querySelector("#taskPopup h1").textContent = cardTitle;
    document.querySelector("#taskPopup .validation").textContent = buttonContent;
}

// Create New Task
document.querySelectorAll(".newTaskBtn").forEach(button => {
    button.addEventListener("click", () => {
        const listName = button.dataset.name;
        modifyPopUpContent(`New Task in "${listName}"`, "Create New Task");

        document.getElementById("taskContainer").value = listName;
        document.getElementById("taskId").value = "";
        document.getElementById("titleInput").value = "";
        document.getElementById("descriptionInput").value = "";

        openPopup(type="task");
    });
});

// Edit Task
document.querySelectorAll(".editButton").forEach(btn => {
    btn.addEventListener("click", () => {
        const taskData = {
            id: btn.dataset.index,
            title: btn.dataset.title,
            description: btn.dataset.description,
            container: btn.dataset.name
        };
        
        modifyPopUpContent(`Edit Task in "${taskData.container}"`, "Save Changes");

        document.getElementById("taskContainer").value = taskData.container;
        document.getElementById("titleInput").value = taskData.title;
        document.getElementById("descriptionInput").value = taskData.description;
        document.getElementById("taskId").value = taskData.id;

        openPopup(type="task");
    });
});

// Submit form - create or edit task ?
const form = document.getElementById("newPostForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const taskId = formData.get("taskId");
    const taskContainer = formData.get("container");
    
    const url = taskId ? `/api/editTask/${taskContainer}/${taskId}` : "/api/newTask";
    
    await fetch(url, {
        method: taskId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    closePopup(type="task");
    window.location.reload();
});

// Checkbox state for each task update
document.querySelectorAll(".taskCheckbox").forEach(checkbox => {
    checkbox.addEventListener("change", async (e) => {
        const listName = e.target.dataset.list;
        const id = e.target.dataset.index;
        const done = e.target.checked;
        
        const taskDiv = e.target.closest(".taskDiv");
        if (taskDiv) {
            taskDiv.classList.toggle("crossedText");
        }

        await fetch(`/api/tasks/${listName}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ done })
        });
    });
});

// Fetch the delete method. 
document.querySelectorAll(".trashButton").forEach(a => {
    a.addEventListener("click", async (e) => {
        e.preventDefault();

        const listName = a.dataset.name;
        const id = a.dataset.index;
        
        try {
            await fetch(`/api/deleteTask/${listName}/${id}`, {
                method: "DELETE"
            });

            a.closest(".taskDiv").remove();
        } catch (err) {
            console.error("Delete failed", err);
        }
    });
});

