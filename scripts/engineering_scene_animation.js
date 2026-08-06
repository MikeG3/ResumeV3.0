/*==================================================
    ENGINEERING SCENE
==================================================*/
const engineeringSection = document.getElementById("engineeringScene");
const engineeringCanvas = document.getElementById("engineeringCanvas");
const projectsSection = document.getElementById("projects");
const engineeringContext = engineeringCanvas.getContext("2d");

let engineeringAnimationFrame = null;
let engineeringRunning = false;

/*==================================================
    COLOR PALETTE
==================================================*/
const COLORS =
{
    background: "#050816",
    cyan: "#72F3FF",
    blue: "#53B9FF",
    violet: "#8D7DFF",
    magenta: "#B46CFF",
    gold: "#FFE278",
    white: "#E7FBFF"
};

/*==================================================
    ENGINE
==================================================*/
const engineeringScene =
{
    width: 0,
    height: 0,
    time: 0,
    deltaTime: 0,
    previousTime: 0
};

/*==================================================
    NEBULA CLOUDS
==================================================*/
const nebula = [];
const NEBULA_COUNT = 8;

/*==================================================
    DRAFTING OBJECTS
==================================================*/
const draftingObjects = [];

/*==================================================
    ENGINEERING GRID
==================================================*/
const engineeringGrid = [];
const GRID_SPACING = 120;

/*==================================================
    ENGINEERING TRACES
==================================================*/
const engineeringTraces = [];

/*==================================================
    SCANNER
==================================================*/
const scanner =
{
    x: -400,
    speed: 1.1,
    width: 220
};

/*==================================================
    SHOW / HIDE
==================================================*/
function showEngineeringScene() {
    engineeringSection.style.opacity = 1;
}

function hideEngineeringScene() {
    engineeringSection.style.opacity = 0;
}

/*==================================================
    RESIZE
==================================================*/
function resizeEngineeringScene() {

    requestAnimationFrame(() => {

        const rect = projectsSection.getBoundingClientRect();

        engineeringCanvas.width = Math.round(rect.width);
        engineeringCanvas.height = Math.round(rect.height);

        engineeringScene.width = engineeringCanvas.width;
        engineeringScene.height = engineeringCanvas.height;

        createEngineeringGrid();
        createNebula();
        createDraftingLayer();
        createEngineeringTraces();

    });

}

/*==================================================
    INITIALIZE
==================================================*/
function initializeEngineeringScene() {

    if (engineeringRunning)
        return;

    engineeringRunning = true;
    resizeEngineeringScene();
}

/*==================================================
    CREATE NEBULA
==================================================*/
function createNebula() {
    nebula.length = 0;

    const palette =
        [
            COLORS.cyan,
            COLORS.blue,
            COLORS.violet,
            COLORS.magenta
        ];

    for (let i = 0; i < NEBULA_COUNT; i++) {
        nebula.push(
            {
                x: Math.random() * engineeringScene.width,
                y: Math.random() * engineeringScene.height,
                radius: 250 + Math.random() * 450,
                color: palette[Math.floor(Math.random() * palette.length)],
                opacity: 0.1 + Math.random() * 0.05,
                angle: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.03
            });
    }
}

/*==================================================
    CREATE DRAFTING LAYER
==================================================*/
function createDraftingLayer() {
    draftingObjects.length = 0;

    for (let i = 0; i < 18; i++) {
        const point = engineeringGrid[Math.floor(Math.random() * engineeringGrid.length)];

        draftingObjects.push(
            {
                x: point.x,
                y: point.y,
                radius: 40 + Math.random() * 140,
                rotation: Math.random() * Math.PI * 2,
                speed: (Math.random() - .5) * 0.00025,
                opacity: 0.40 + Math.random() * .06
            });
    }
}

/*==================================================
    CREATE ENGINEERING GRID
==================================================*/
function createEngineeringGrid() {
    engineeringGrid.length = 0;
    const columns = Math.ceil(engineeringScene.width / GRID_SPACING);
    const rows = Math.ceil(engineeringScene.height / GRID_SPACING);

    for (let row = 0; row <= rows; row++) {
        for (let column = 0; column <= columns; column++) {
            engineeringGrid.push(
                {
                    x: column * GRID_SPACING,
                    y: row * GRID_SPACING
                });
        }
    }
}

/*==================================================
    CREATE ENGINEERING TRACES
==================================================*/
function createEngineeringTraces() {
    engineeringTraces.length = 0;

    for (let i = 0; i < 24; i++) {
        const start = engineeringGrid[Math.floor(Math.random() * engineeringGrid.length)];
        let end = start;

        while (end === start) { end = engineeringGrid[Math.floor(Math.random() * engineeringGrid.length)]; }

        engineeringTraces.push({
            start,
            end,
            progress: 0,
            speed: 0.003 + Math.random() * 0.004,
            pulse: Math.random(),
            pulseSpeed: 0.004 + Math.random() * 0.004,
            life: 300 + Math.random() * 500,
            alpha: 0
        });
    }
}

/*==================================================
    UPDATE
==================================================*/
function updateEngineeringScene(currentTime = performance.now()) {

    engineeringScene.deltaTime = currentTime - engineeringScene.previousTime;
    engineeringScene.previousTime = currentTime;
    engineeringScene.time += engineeringScene.deltaTime;
}

function stopEngineeringScene()
{
    engineeringRunning = false;

    if (engineeringAnimationFrame)
    {
        cancelAnimationFrame(engineeringAnimationFrame);
        engineeringAnimationFrame = null;
    }
}

/*==================================================
    DRAW NEBULA
==================================================*/
function drawNebula() {
    nebula.forEach(cloud => {
        cloud.angle += cloud.speed * 0.002;
        cloud.x += Math.cos(cloud.angle) * cloud.speed;
        cloud.y += Math.sin(cloud.angle) * cloud.speed;
        if (cloud.x < -cloud.radius)
            cloud.x = engineeringScene.width + cloud.radius;
        if (cloud.x > engineeringScene.width + cloud.radius)
            cloud.x = -cloud.radius;
        if (cloud.y < -cloud.radius)
            cloud.y = engineeringScene.height + cloud.radius;
        if (cloud.y > engineeringScene.height + cloud.radius)
            cloud.y = -cloud.radius;

        const gradient = engineeringContext.createRadialGradient(
            cloud.x,
            cloud.y,
            0,
            cloud.x,
            cloud.y,
            cloud.radius
        );

        gradient.addColorStop(
            0,
            cloud.color +
            Math.floor(cloud.opacity * 255)
                .toString(16)
                .padStart(2, "0")
        );

        gradient.addColorStop(1, cloud.color + "00");
        engineeringContext.fillStyle = gradient;
        engineeringContext.beginPath();
        engineeringContext.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        engineeringContext.fill();
    });
}

/*==================================================
    DRAW DRAFTING LAYER
==================================================*/
function drawDraftingLayer() {
    engineeringContext.strokeStyle = "rgba(120,220,255,.12)";
    engineeringContext.lineWidth = 1;

    draftingObjects.forEach(object => {
        object.rotation += object.speed;
        engineeringContext.save();
        engineeringContext.translate(object.x, object.y);
        engineeringContext.rotate(object.rotation);
        engineeringContext.globalAlpha = object.opacity;

        //------------------------------------------
        // OUTER CIRCLE
        //------------------------------------------
        engineeringContext.beginPath();
        engineeringContext.arc(0, 0, object.radius, 0, Math.PI * 2);
        engineeringContext.stroke();

        //------------------------------------------
        // INNER CIRCLE
        //------------------------------------------
        engineeringContext.beginPath();
        engineeringContext.arc(0, 0, object.radius * .45, 0, Math.PI * 2);
        engineeringContext.stroke();

        //------------------------------------------
        // CROSSHAIR
        //------------------------------------------
        engineeringContext.beginPath();
        engineeringContext.moveTo(-object.radius, 0);
        engineeringContext.lineTo(object.radius, 0);
        engineeringContext.moveTo(0, -object.radius);
        engineeringContext.lineTo(0, object.radius);

        engineeringContext.stroke();

        //------------------------------------------
        // CENTER DOT
        //------------------------------------------
        engineeringContext.beginPath();
        engineeringContext.fillStyle = COLORS.cyan;
        engineeringContext.arc(0, 0, 2, 0, Math.PI * 2);
        engineeringContext.fill();
        engineeringContext.restore();
    });

    engineeringContext.globalAlpha = 1;
}

/*==================================================
    DRAW ENGINEERING TRACES
==================================================*/
function drawEngineeringTraces() {
    engineeringContext.lineWidth = 1.5;
    engineeringTraces.forEach(trace => {
        trace.life--;

        if (trace.alpha < trace.progress)
            trace.alpha += 0.015;

        trace.alpha = Math.min(trace.alpha, 1);

        engineeringContext.globalAlpha = trace.alpha;

        trace.progress += trace.speed;

        if (trace.progress > 1)
            trace.progress = 1;

        const corner =
        {
            x: trace.end.x,
            y: trace.start.y
        };

        engineeringContext.strokeStyle = "rgba(120,220,255,.22)";
        engineeringContext.beginPath();
        engineeringContext.moveTo(trace.start.x, trace.start.y);

        //--------------------------------------
        // First horizontal leg
        //--------------------------------------
        if (trace.progress < .5) {
            const amount = trace.progress / .5;
            engineeringContext.lineTo(trace.start.x + (corner.x - trace.start.x) * amount, trace.start.y);
        }
        else {
            engineeringContext.lineTo(corner.x, corner.y);

            //----------------------------------
            // Second vertical leg
            //----------------------------------
            const amount = (trace.progress - .5) / .5;
            engineeringContext.lineTo(corner.x, corner.y + (trace.end.y - corner.y) * amount);
        }

        engineeringContext.stroke();
        engineeringContext.globalAlpha = 1;
        if (trace.life < 120) {
            trace.alpha -= 0.012;
        }
        if (trace.life <= 0) {
            trace.start = engineeringGrid[Math.floor(Math.random() * engineeringGrid.length)];

            do {
                trace.end = engineeringGrid[Math.floor(Math.random() * engineeringGrid.length)];
            }
            while (trace.end === trace.start);

            trace.progress = 0;
            trace.alpha = 0;
            trace.life = 300 + Math.random() * 500;
        }
    });
}

/*==================================================
    DRAW ENERGY PULSES
==================================================*/
function drawEngineeringPulses() {
    engineeringTraces.forEach(trace => {
        if (trace.progress < 1)
            return;

        trace.pulse += trace.pulseSpeed;

        if (trace.pulse > 1)
            trace.pulse = 0;

        let x, y;

        if (trace.pulse < 0.5) {
            const t = trace.pulse / .5;
            x = trace.start.x + (trace.end.x - trace.start.x) * t;
            y = trace.start.y;
        }
        else {
            const t = (trace.pulse - .5) / .5;
            x = trace.end.x;
            y = trace.start.y + (trace.end.y - trace.start.y) * t;
        }

        const glow = engineeringContext.createRadialGradient(x, y, 0, x, y, 10);

        glow.addColorStop(0, "rgba(180,245,255,.95)");
        glow.addColorStop(.4, "rgba(120,220,255,.65)");
        glow.addColorStop(1, "rgba(120,220,255,0)");

        engineeringContext.fillStyle = glow;

        engineeringContext.beginPath();
        engineeringContext.arc(x, y, 10, 0, Math.PI * 2);
        engineeringContext.fill();

        engineeringContext.fillStyle = "rgba(255,255,255,.9)";

        engineeringContext.beginPath();
        engineeringContext.arc(x, y, 2.2, 0, Math.PI * 2);
        engineeringContext.fill();
    });
}

/*==================================================
    DRAW SCANNER
==================================================*/
function drawScanner() {
    scanner.x += scanner.speed;

    if (scanner.x > engineeringScene.width + scanner.width)
        scanner.x = -scanner.width;

    const gradient = engineeringContext.createLinearGradient(scanner.x, 0, scanner.x + scanner.width, 0);

    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(.5, "rgba(120,220,255,.08)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    engineeringContext.fillStyle = gradient;
    engineeringContext.fillRect(scanner.x, 0, scanner.width, engineeringScene.height);
}

/*==================================================
    DRAW
==================================================*/
function drawEngineeringScene() {
    engineeringContext.clearRect(0, 0, engineeringScene.width, engineeringScene.height);
    engineeringContext.fillStyle = COLORS.background;
    engineeringContext.fillRect(0, 0, engineeringScene.width, engineeringScene.height);

    //drawNebula();
    drawDraftingLayer();
    drawEngineeringTraces();
    drawEngineeringPulses();
    //drawScanner();
}

/*==================================================
    HELPER FUNCTION FOR ENGINEERING SCENE
==================================================*/
function displayEngineeringScene() {
    showEngineeringScene();
    updateEngineeringScene();
    drawEngineeringScene();
}

/*==================================================
    EVENTS
==================================================*/
window.addEventListener( "resize", resizeEngineeringScene);
window.addEventListener("pagehide", stopEngineeringScene);
window.addEventListener("beforeunload", stopEngineeringScene);

/*==================================================
    START
==================================================*/
window.addEventListener("load", () => {
    initializeEngineeringScene();
});