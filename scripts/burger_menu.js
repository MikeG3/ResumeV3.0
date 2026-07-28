/*==================================================
    MENU
==================================================*/
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    menuOverlay.classList.toggle("active");
});

/*==================================================
    CLOSE MENU AFTER LINK CLICK
==================================================*/
const menuLinks = menuOverlay.querySelectorAll("a");

menuLinks.forEach(link =>
{
    link.addEventListener("click", () =>
    {
        menuButton.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
});