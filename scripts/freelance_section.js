/*==================================================
    BRAND SHOWCASE
==================================================*/

const brandScroller = document.getElementById("brandScroller");
const brandCards = [...document.querySelectorAll(".brandCard")];

const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");

let currentCard = 0;


/*==================================================
    CENTER CARD
==================================================*/
function centerCurrentCard(smooth = true)
{
    const card = brandCards[currentCard];

    if (!card)
        return;

    const left = card.offsetLeft - (brandScroller.clientWidth - card.offsetWidth) / 2;

    brandScroller.scrollTo({
        left,
        behavior: smooth ? "smooth" : "auto"
    });

    updateActiveCard();
}

/*==================================================
    ACTIVE CARD
==================================================*/
function updateActiveCard()
{
    brandCards.forEach(card =>
        card.classList.remove("activeCard"));

    brandCards[currentCard].classList.add("activeCard");
}

/*==================================================
    NEXT CARD
==================================================*/
function nextCard()
{
    currentCard++;

    if (currentCard >= brandCards.length)
        currentCard = 0;

    centerCurrentCard();
}

/*==================================================
    PREVIOUS CARD
==================================================*/
function previousCard()
{
    currentCard--;

    if (currentCard < 0)
        currentCard = brandCards.length - 1;

    centerCurrentCard();
}

/*==================================================
    BUTTONS
==================================================*/
if (rightArrow)
{
    rightArrow.addEventListener(
        "click",
        nextCard
    );
}

if (leftArrow)
{
    leftArrow.addEventListener(
        "click",
        previousCard
    );
}

/*==================================================
    KEYBOARD
==================================================*/
window.addEventListener("keydown", event =>
{
    if (event.key === "ArrowRight")
        nextCard();

    if (event.key === "ArrowLeft")
        previousCard();
});

/*==================================================
    TOUCH SUPPORT
==================================================*/
let touchStart = 0;

brandScroller.addEventListener("touchstart", event =>
{
    touchStart = event.touches[0].clientX;
});

brandScroller.addEventListener("touchend", event =>
{
    const delta =
        touchStart -
        event.changedTouches[0].clientX;

    if (Math.abs(delta) < 40)
        return;

    if (delta > 0)
        nextCard();
    else
        previousCard();
});

/*==================================================
    RESIZE
==================================================*/
window.addEventListener("resize", () =>
{
    centerCurrentCard(false);
});

/*==================================================
    INITIALIZE
==================================================*/
centerCurrentCard(false);