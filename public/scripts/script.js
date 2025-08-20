
// Side Menu
// Hamburger click event
const hamburgerButton = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburgerButton.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
});

// Toggle the color of selection buttons when selected
const selectionButtons = document.querySelectorAll('div[class="sortingButton"]');
document.getElementsByClassName("sortingButton")[0].classList.add("active");

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
document.getElementsByClassName("listItem")[0].classList.add("active");


listSelection.forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});
