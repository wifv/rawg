const menu = document.getElementById("menu");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const gridOption = document.getElementById("grid");
const flexOption = document.getElementById("flex");

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

flexOption.addEventListener("click", () => {
  document.getElementById("blocks-container").style.display = "flex";
  document.getElementById("blocks-container").style.flexDirection = "column";
  document.getElementById("blocks-container").style.maxWidth = "700px";
})
gridOption.addEventListener("click", () => {
  document.getElementById("blocks-container").style.display = "grid";
  document.getElementById("blocks-container").style.maxWidth = "none";
})
