/*==================================================
    VISUAL EFFECTS MANAGER
==================================================*/
const EFFECTS = {
    FULL: "FULL",
    LOW: "LOW",
    OFF: "OFF"
};

const effectModes = [
    EFFECTS.FULL,
    EFFECTS.LOW,
    EFFECTS.OFF
];

let currentEffectsMode = localStorage.getItem("effectsMode") || EFFECTS.FULL;

/*==================================================
    UPDATE BUTTON
==================================================*/
function updateEffectsButton() {
    const label = document.getElementById("effectsMode");

    if (label)
        label.textContent = currentEffectsMode;

}

/*==================================================
    NEXT MODE
==================================================*/
function cycleEffectsMode() {

    const index = effectModes.indexOf(currentEffectsMode);
    currentEffectsMode = effectModes[(index + 1) % effectModes.length];
    localStorage.setItem( "effectsMode", currentEffectsMode );
    updateEffectsButton();
}

/*==================================================
    INITIALIZE
==================================================*/
document.addEventListener("DOMContentLoaded", () => {

    updateEffectsButton();

    const button = document.getElementById("effectsButton");

    if (button) {
        button.addEventListener( "click", cycleEffectsMode );
    }

});