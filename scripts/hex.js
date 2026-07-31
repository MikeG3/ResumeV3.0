/*==================================================
    HONEYCOMB BACKGROUND
==================================================*/
const hexBackground = document.getElementById("hexBackground");


/*==================================================
    SETTINGS
==================================================*/
const hexSettings =
{
    width: 84,
    height: 96,

   // horizontalSpacing: 74,
   horizontalSpacing: 64,
   // verticalSpacing: 72,
   verticalSpacing: 68,

    margin: 120
};


/*==================================================
    CREATE HONEYCOMB
==================================================*/
function createHoneycomb()
{
    if (!hexBackground)
        return;

    hexBackground.innerHTML = "";


    /*----------------------------------------------
        GRID CONTAINER
    ----------------------------------------------*/
    const grid = document.createElement("div");
    grid.className = "hexGrid";
    hexBackground.appendChild(grid);


    /*----------------------------------------------
        SCREEN SIZE
    ----------------------------------------------*/
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    /*----------------------------------------------
        ROWS / COLUMNS
    ----------------------------------------------*/
    const columns =
        Math.ceil(
            (screenWidth + hexSettings.margin * 2)
            / hexSettings.horizontalSpacing
        );

    const rows =
        Math.ceil(
            (screenHeight + hexSettings.margin * 12)
            / hexSettings.verticalSpacing
        );


    /*----------------------------------------------
        CREATE HEXAGONS
    ----------------------------------------------*/
    for(let row = 0; row < rows; row++)
    {
        for(let column = 0; column < columns; column++)
        {
            const hex = document.createElement("div");
            hex.className = "hex";

            /*------------------------------------------
                POSITION
            ------------------------------------------*/
            let x = column * hexSettings.horizontalSpacing;

            if(row % 2)
                x += hexSettings.horizontalSpacing / 2;

            let y = row * hexSettings.verticalSpacing;

            x -= hexSettings.margin;
            y -= hexSettings.margin;

            hex.style.left = x + "px";
            hex.style.top = y + "px";


            /*------------------------------------------
                RANDOM VARIATION
            ------------------------------------------*/
            const brightness = 0.80 + Math.random() * 0.35;
            hex.style.filter = `brightness(${brightness})`;


            /*------------------------------------------
                SAVE GRID POSITION
            ------------------------------------------*/
            hex.dataset.row = row;
            hex.dataset.column = column;

            /*------------------------------------------
                OPTIONAL HIGHLIGHT
            ------------------------------------------*/
            if(Math.random() < 0.08)
            {
                hex.classList.add("bright");
            }
            grid.appendChild(hex);
        }
    }
}


/*==================================================
    RESIZE
==================================================*/
window.addEventListener(
    "resize",
    () =>
    {
        createHoneycomb();
    }
);

/*==================================================
    INITIALIZE
==================================================*/
createHoneycomb();