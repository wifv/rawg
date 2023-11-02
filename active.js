let listItems = document.getElementsByClassName("non-active");

for (const item of listItems) {
  item.addEventListener('click', function() {
    for (const item of listItems) {
      item.classList.remove('active');
      console.log(item.classList)
    }

    item.classList.add('active');
  });
}