/*==================================================
    PROJECT VIEWER
==================================================*/

const projectViewer =
    document.getElementById("projectViewer");

const projectViewerContent =
    document.getElementById("projectViewerContent");

const closeProjectViewer =
    document.getElementById("closeProjectViewer");

const projectCards =
    document.querySelectorAll(".projectCard");


/*==================================================
    OPEN PROJECT
==================================================*/
function openProject(card)
{
    const project =
        card.cloneNode(true);

    project.classList.add("projectViewerCard");

    project.querySelector(".projectDetails").style.display = "block";

    projectViewerContent.innerHTML = "";

    projectViewerContent.appendChild(project);

    projectViewer.classList.add("active");

    document.body.style.overflow = "hidden";
}


/*==================================================
    CLOSE PROJECT
==================================================*/
function closeProject()
{
    projectViewer.classList.remove("active");

    document.body.style.overflow = "";
}


/*==================================================
    CLICK PROJECT
==================================================*/
projectCards.forEach(card =>
{
    card.addEventListener("click", () =>
    {
        openProject(card);
    });
});


/*==================================================
    CLOSE BUTTON
==================================================*/
closeProjectViewer.addEventListener(
    "click",
    closeProject
);


/*==================================================
    CLICK BACKDROP
==================================================*/
projectViewer.addEventListener("click", e =>
{
    if(e.target === projectViewer)
        closeProject();
});

/*==================================================
    ESC KEY
==================================================*/
window.addEventListener(
    "keydown",
    event =>
    {
        if(event.key === "Escape")
            closeProject();
    }
);