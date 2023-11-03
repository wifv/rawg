let listItems = document.getElementsByClassName("non-active");

for (const item of listItems) {
  item.addEventListener('click', () => {
    for (const item of listItems) {
      item.classList.remove('active');
    }

    item.classList.add('active');
  });
}