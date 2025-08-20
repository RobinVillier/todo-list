
// Side Menu
const hamburgerButton = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");

hamburgerButton.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
});

const buttons = document.querySelectorAll('div[class="sortingButton"]');
document.getElementsByClassName("sortingButton")[0].classList.add("active");

buttons.forEach(btn => {
  btn.addEventListener('click', function () {
    buttons.forEach(b => {
      b.classList.remove('active');
    });

    this.classList.add('active');
  });
});
