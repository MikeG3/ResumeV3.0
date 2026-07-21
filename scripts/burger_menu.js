/*==================================================
    MENU
==================================================*/
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    menuOverlay.classList.toggle("active");
});