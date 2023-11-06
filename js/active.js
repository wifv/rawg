let listItems = document.getElementsByClassName("non-active");
let transitionItems = document.getElementsByClassName("active-transition");
const options = document.getElementsByClassName("display-options");

for (const item of listItems) {
  item.addEventListener('click', () => {
    for (const item of listItems) {
      item.classList.remove('active');
    }
    item.classList.add('active');
  });
}

for (const item of options) {
  item.addEventListener("click", () => {
    options[0].classList.remove("active-option");
    options[1].classList.remove("active-option");
    item.classList.add("active-option");
  });
}
