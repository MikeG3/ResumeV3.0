/*==================================================
    GLOBAL ANIMATION MANAGER
==================================================*/
let animationLoopRunning = true;
let currentScene = "hero";

const networkCanvas = document.getElementById("networkCanvas");
const geometryBackground = document.getElementById("geometryBackground");

/*==================================================
    EFFECTS CONTROL VIA BUTTON
==================================================*/
function heroEffectsEnabled() {
    return (currentEffectsMode === EFFECTS.FULL);
}

function graphEffectsEnabled() {
    return (currentEffectsMode !== EFFECTS.OFF);
}

function engineeringEffectsEnabled() {
    return (currentEffectsMode !== EFFECTS.OFF);
}

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

    { threshold: 0.15 }

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

        /*==================================================
            HERO
        ==================================================*/
        case "hero":

            if (heroEffectsEnabled()) {
                updateHeroScene();
                drawHeroScene();
                networkCanvas.classList.remove("fadeOut");
            }
            else {
                networkCanvas.classList.add("fadeOut");
            }

            if (graphEffectsEnabled())
                geometryBackground.classList.remove("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            hideEngineeringScene();

            break;


        /*==================================================
            INTRO
        ==================================================*/
        case "intro":

            if (heroEffectsEnabled()) {
                updateHeroScene();
                drawHeroScene();
                networkCanvas.classList.remove("fadeOut");
            }
            else {
                networkCanvas.classList.add("fadeOut");
            }

            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();

            break;


        /*==================================================
            FOUNDATION
        ==================================================*/
        case "foundation":

            networkCanvas.classList.add("fadeOut");

            if (graphEffectsEnabled())
                geometryBackground.classList.add("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            hideEngineeringScene();

            break;


        /*==================================================
            CREDENTIALS
        ==================================================*/
        case "credentials":

            networkCanvas.classList.add("fadeOut");

            if (graphEffectsEnabled())
                geometryBackground.classList.add("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            hideEngineeringScene();

            break;


        /*==================================================
            END OF WORK EXPERIENCE
        ==================================================*/
        case "end-of-work-XP":

            networkCanvas.classList.add("fadeOut");

            if (graphEffectsEnabled())
                geometryBackground.classList.add("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            if (engineeringEffectsEnabled())
                displayEngineeringScene();
            else
                hideEngineeringScene();

            break;


        /*==================================================
            PROJECTS
        ==================================================*/
        case "projects":

            networkCanvas.classList.add("fadeOut");

            if (graphEffectsEnabled())
                geometryBackground.classList.add("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            if (engineeringEffectsEnabled())
                displayEngineeringScene();
            else
                hideEngineeringScene();

            break;


        /*==================================================
            FREELANCE
        ==================================================*/
        case "freelance":

            networkCanvas.classList.add("fadeOut");

            if (graphEffectsEnabled())
                geometryBackground.classList.add("fadeIn");
            else
                geometryBackground.classList.remove("fadeIn");

            if (engineeringEffectsEnabled())
                displayEngineeringScene();
            else
                hideEngineeringScene();

            break;


        /*==================================================
            RESUME
        ==================================================*/
        case "resume":

            if (heroEffectsEnabled()) {
                updateHeroScene();
                drawHeroScene();
                networkCanvas.classList.remove("fadeOut");
            }
            else {
                networkCanvas.classList.add("fadeOut");
            }

            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();

            break;


        /*==================================================
            ABOUT
        ==================================================*/
        case "howIWork":

            if (heroEffectsEnabled()) {
                updateHeroScene();
                drawHeroScene();
                networkCanvas.classList.remove("fadeOut");
            }
            else {
                networkCanvas.classList.add("fadeOut");
            }

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