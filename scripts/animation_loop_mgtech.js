/*==================================================
    GLOBAL ANIMATION MANAGER
==================================================*/
let animationLoopRunning = true;
let currentScene = "hero";

const networkCanvas = document.getElementById("networkCanvas");
const geometryBackground = document.getElementById("geometryBackground");


/*==================================================
    OBSERVE SECTIONS
==================================================*/

const sceneObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting)
                return;

            currentScene = entry.target.dataset.scene;

        });

    },

    {
        threshold: 0,
        rootMargin: "-45% 0px -45% 0px"
    }


);

/*==================================================
    REGISTER SCENES
==================================================*/

document
    .querySelectorAll("[data-scene]")
    .forEach(section => {

        sceneObserver.observe(section);
    });

/*==================================================
    MAIN LOOP
==================================================*/
function animationLoop() {

    switch (currentScene) {
        //hero, services, recentProjects, howIWork, aboutMGTech, contact
        //hero - network
        //services - graph 
        //recentProjects  - engineering
        //howIWork  - network
        //aboutMGTech - graph
        //contact - network

        case "hero":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();
            break;

        case "services":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            hideEngineeringScene();
            break;

        case "projects":
            showEngineeringScene();
            updateEngineeringScene();
            drawEngineeringScene();
            break;

        case "howIWork":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();
            break;

        case "aboutMGTech":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            hideEngineeringScene();
            break;

        case "contact":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();
            break;


    }

    if (animationLoopRunning)
        requestAnimationFrame(animationLoop);

}

animationLoop();



window.addEventListener("pagehide", () => {
    animationLoopRunning = false;
});