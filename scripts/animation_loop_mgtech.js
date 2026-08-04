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
        threshold: 0.35
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

        case "hero":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            break;

        case "intro":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            break;

        case "foundation":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            break;

        case "credentials":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            break;

        case "end-of-work-XP":
            break;

        case "projects":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            break;

        case "freelance":
            networkCanvas.classList.add("fadeOut");
            geometryBackground.classList.add("fadeIn");
            break;

        case "resume":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            break;

        case "howIWork":
            updateHeroScene();
            drawHeroScene();
            networkCanvas.classList.remove("fadeOut");
            geometryBackground.classList.remove("fadeIn");
            break;

    }

    if (animationLoopRunning)
        requestAnimationFrame(animationLoop);

}

animationLoop();



window.addEventListener("pagehide", () => {
    animationLoopRunning = false;
});