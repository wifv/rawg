const menu = document.getElementById("menu");

const sidebar = document.getElementById("sidebar");
menu.addEventListener("click", () => {
    if(sidebar.style.display == "flex") {
        sidebar.style.display = "none";
    } else {
      sidebar.style.display = "flex";
    }
})
