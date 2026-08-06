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

/*=============================================================
    HELPER FUNCTIONS TO ACTIVATE AND DEACTIVATE ANIMATIONS
==============================================================*/
/* HERO SCENE */
function showNetworkScene() {
    if (heroEffectsEnabled()) {
        updateHeroScene();
        drawHeroScene();
        networkCanvas.classList.remove("fadeOut");
    }
    else {
        networkCanvas.classList.add("fadeOut");
    }
}

function hideNetworkScene() {
    networkCanvas.classList.add("fadeOut");
}

/*  GRAPH SCENE */
function showGraphScene() {
    if (graphEffectsEnabled())
        geometryBackground.classList.add("fadeIn");
    else
        geometryBackground.classList.remove("fadeIn");
}

function hideGraphScene() {
    geometryBackground.classList.remove("fadeIn");
}

/*  ENGINEERING SCENE */
function showEngineeringSceneFX() {
    if (engineeringEffectsEnabled())
        displayEngineeringScene();
    else
        hideEngineeringScene();
}




/*==================================================
    MAIN LOOP
==================================================*/
function animationLoop() {

    switch (currentScene) {

        /*==================================================
            HERO
        ==================================================*/
        case "hero":
            showNetworkScene();
            hideGraphScene();
            hideEngineeringScene();
            break;


        /*==================================================
            INTRO
        ==================================================*/
        case "intro":
            showNetworkScene();
            geometryBackground.classList.remove("fadeIn");
            hideEngineeringScene();

            break;


        /*==================================================
            FOUNDATION
        ==================================================*/
        case "foundation":
            hideNetworkScene();
            hideEngineeringScene();
            break;


        /*==================================================
            CREDENTIALS
        ==================================================*/
        case "credentials":
            networkCanvas.classList.add("fadeOut");
            showGraphScene();
            hideEngineeringScene();

            break;


        /*==================================================
            END OF WORK EXPERIENCE
        ==================================================*/
        case "end-of-work-XP":
            hideNetworkScene();
            showGraphScene();

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

            showEngineeringSceneFX();

            break;


        /*==================================================
            FREELANCE
        ==================================================*/
        case "freelance":
            networkCanvas.classList.add("fadeOut");
            showGraphScene();
            showEngineeringSceneFX();

            break;


        /*==================================================
            RESUME
        ==================================================*/
        case "resume":
            showNetworkScene();
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