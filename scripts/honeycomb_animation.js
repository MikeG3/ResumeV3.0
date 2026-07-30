/*==================================================
    HONEYCOMB BACKGROUND
==================================================*/
const hexBackground = document.getElementById("hexBackground");

const hexSettings =
{
    width: 84,
    height: 96,
    gap: 10
};


/*==================================================
    CREATE HONEYCOMB
==================================================*/
function createHoneycomb() {
    if (!hexBackground)
        return;

    hexBackground.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "hexGrid";
    hexBackground.appendChild(grid);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const horizontalStep = hexSettings.width + hexSettings.gap;
    const verticalStep = (hexSettings.height * 0.75) + hexSettings.gap;

    /* CALCULATE ROWS AN COLUMNS */
    let columns = Math.ceil(screenWidth / horizontalStep) + 4;
    let rows = Math.ceil(screenHeight / verticalStep) + 4;

    if (screenWidth < 500) {
        rows = 13;
        columns = 7;
    }
    else if (screenWidth < 700) {
        rows = 14;
        columns = 9;
    }
    else if (screenWidth < 900) {
        rows = 15;
        columns = 11;
    }
    else if (screenWidth < 1100) {
        rows = 8;
        columns = 17;
    }
    else {
        rows = 34;
        columns = 12;
    }


    for (let row = 0; row < rows; row++) {
        const rowElement = document.createElement("div");

        rowElement.className = "hexRow";

        if (row % 2)
            rowElement.classList.add("offset");

        for (let column = 0; column < columns; column++) {
            const hex = document.createElement("div");
            hex.className = "hex";

            //--------------------------------------
            // RANDOM BRIGHTNESS
            //--------------------------------------
            hex.style.animationDelay = (-Math.random() * 20) + "s";
            hex.style.animationDuration = (10 + Math.random() * 10) + "s";
            grid.appendChild(rowElement);
            rowElement.appendChild(hex);
        }
    }
}


/*==================================================
    RESIZE
==================================================*/
window.addEventListener(
    "resize",
    createHoneycomb
);


/*==================================================
    INITIALIZE
==================================================*/
createHoneycomb();