const menu = document.getElementById("menu");

const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
menu.addEventListener("click", () => {
    if(sidebar.style.display == "flex") {
        sidebar.style.display = "none";
    } else {
      sidebar.style.display = "flex";
    }
});

closeSidebar.addEventListener("click", () => {
	sidebar.style.display = "none"
});
