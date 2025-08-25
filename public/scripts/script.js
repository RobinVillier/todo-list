
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

// Toggle the color of selected lists when selected
const listSelection = document.querySelectorAll('li[class="listItem"]');
if (listSelection.length > 0) {
    document.getElementsByClassName("listItem")[0].classList.add("active");
};

listSelection.forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.toggle('active');
    });
});

// Toggle Lists card visibility 
const listItems = document.querySelectorAll(".listItem");
const taskContainers = document.querySelectorAll(".tasksContainer");

taskContainers.forEach((card, index) => {
	if (index !== 0) card.classList.add("hidden");
});

listItems.forEach(item => {
	item.addEventListener("click", () => {
		const name = item.getAttribute("data-name");
		const target = document.querySelector(`.tasksContainer[data-name="${name}"]`);
		if (target) {
			target.classList.toggle("hidden");
		}
	});
});

// Open PopUp from Lists
function openPopup() {
    document.getElementById("popup").classList.add("pop");
}

function closePopup() {
    document.getElementById("popup").classList.remove("pop");
}


// On sélectionne tous les boutons "newTask"
const buttons = document.querySelectorAll(".newTaskBtn");

buttons.forEach(button => {
	button.addEventListener("click", (e) => {
		const listName = button.dataset.name;
		
		// Change le titre de la popup
		const title = document.querySelector("#popup h1");
		title.textContent = `New Task in "${listName}"`;
		
        document.getElementById("taskContainer").value = listName;

		openPopup();
	});
});
