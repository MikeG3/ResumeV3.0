/*==================================================
    GRAPH BACKGROUND
==================================================*/

const geometry = document.getElementById("geometryBackground");

const graph =
{
    spacing: 70,

    columns: 20,
    rows: 70,

    xAxisOffset: 5,
    yAxisOffset: 5,

    depthOffsetX: -28,
    depthOffsetY: -22
};


/*==================================================
    CREATE POINT
==================================================*/
function createPoint(x, y, className)
{
    const point = document.createElement("div");

    point.className = className;

    point.style.left = x + "px";
    point.style.top = y + "px";

    geometry.appendChild(point);
}


/*==================================================
    CREATE LINE
==================================================*/
function createLine(x1, y1, x2, y2, className)
{
    const line = document.createElement("div");

    line.className = className;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const length = Math.sqrt(dx * dx + dy * dy);

    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.width = length + "px";

    line.style.transform =
        `rotate(${Math.atan2(dy, dx)}rad)`;

    geometry.appendChild(line);
}


/*==================================================
    CREATE GRAPH
==================================================*/
function createGraph()
{
    geometry.innerHTML = "";

    const front = [];
    const back = [];

    //------------------------------------------
    // FRONT GRID
    //------------------------------------------

    for (let row = 0; row < graph.rows; row++)
    {
        front[row] = [];
        back[row] = [];

        for (let col = 0; col < graph.columns; col++)
        {
            const x = col * graph.spacing + graph.xAxisOffset;
            const y = row * graph.spacing + graph.yAxisOffset;

            front[row][col] =
            {
                x,
                y
            };

            back[row][col] =
            {
                x: x + graph.depthOffsetX,
                y: y + graph.depthOffsetY
            };

            createPoint(
                x,
                y,
                "graphPoint"
            );

            createPoint(
                x + graph.depthOffsetX,
                y + graph.depthOffsetY,
                "graphBackPoint"
            );
        }
    }

    //------------------------------------------
    // FRONT GRID LINES
    //------------------------------------------

    for (let row = 0; row < graph.rows; row++)
    {
        for (let col = 0; col < graph.columns; col++)
        {
            if (col < graph.columns - 1)
            {
                createLine(
                    front[row][col].x,
                    front[row][col].y,
                    front[row][col + 1].x,
                    front[row][col + 1].y,
                    "graphLine"
                );
            }

            if (row < graph.rows - 1)
            {
                createLine(
                    front[row][col].x,
                    front[row][col].y,
                    front[row + 1][col].x,
                    front[row + 1][col].y,
                    "graphLine"
                );
            }
        }
    }

    //------------------------------------------
    // BACK GRID LINES
    //------------------------------------------

    for (let row = 0; row < graph.rows; row++)
    {
        for (let col = 0; col < graph.columns; col++)
        {
            if (col < graph.columns - 1)
            {
                createLine(
                    back[row][col].x,
                    back[row][col].y,
                    back[row][col + 1].x,
                    back[row][col + 1].y,
                    "graphBackLine"
                );
            }

            if (row < graph.rows - 1)
            {
                createLine(
                    back[row][col].x,
                    back[row][col].y,
                    back[row + 1][col].x,
                    back[row + 1][col].y,
                    "graphBackLine"
                );
            }
        }
    }

    //------------------------------------------
    // DEPTH LINES
    //------------------------------------------

    for (let row = 0; row < graph.rows; row++)
    {
        for (let col = 0; col < graph.columns; col++)
        {
            createLine(
                front[row][col].x,
                front[row][col].y,
                back[row][col].x,
                back[row][col].y,
                "graphDepthLine"
            );
        }
    }
}


/*==================================================
    INITIALIZE
==================================================*/

createGraph();

window.addEventListener(
    "resize",
    createGraph
);