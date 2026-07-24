/*==================================================
    GLOBAL ANIMATION MANAGER
==================================================*/

let currentScene = "hero";

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
            break;

        case "intro":
            updateHeroScene();
            drawHeroScene();
            break;

        case "foundation":
            break;
           
        case "crededentials":
            break;

        case "projects":
            break;

    }

    requestAnimationFrame(animationLoop);

}

animationLoop();