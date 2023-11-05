let jan = document.getElementById("jan");
let listItems = document.getElementsByClassName("non-active");
let transitionItems = document.getElementsByClassName("active-transition");

for (const item of listItems) {
  item.addEventListener('click', () => {
    jan.classList.add('active');
    if(jan.classList.contains('active')) {
      jan.classList.remove('active')
    }
    for (const item of listItems) {
      item.classList.remove('active');
    }
    item.classList.add('active');
  });
}
