/*==================================================
    BRAND SHOWCASE
==================================================*/

const brandScroller = document.getElementById("brandScroller");
const brandCards = [...document.querySelectorAll(".brandCard")];

const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");


/*==================================================
    FIND ACTIVE CARD
==================================================*/

function updateActiveCard()
{
    if (!brandScroller)
        return;

    const center =
        brandScroller.scrollLeft +
        brandScroller.clientWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    brandCards.forEach(card =>
    {
        const cardCenter =
            card.offsetLeft +
            card.offsetWidth / 2;

        const distance =
            Math.abs(cardCenter - center);

        if (distance < closestDistance)
        {
            closestDistance = distance;
            closestCard = card;
        }
    });

    brandCards.forEach(card =>
    {
        card.classList.remove("activeCard");
    });

    if (closestCard)
        closestCard.classList.add("activeCard");
}


/*==================================================
    SCROLL TO CARD
==================================================*/

function scrollCards(direction)
{
    const amount =
        brandScroller.clientWidth * 0.85;

    brandScroller.scrollBy({

        left: amount * direction,

        behavior: "smooth"

    });
}


/*==================================================
    BUTTONS
==================================================*/

if (leftArrow)
{
    leftArrow.addEventListener(
        "click",
        () => scrollCards(-1)
    );
}

if (rightArrow)
{
    rightArrow.addEventListener(
        "click",
        () => scrollCards(1)
    );
}


/*==================================================
    MOUSE WHEEL
==================================================*/

brandScroller.addEventListener(

    "wheel",

    event =>
    {
        event.preventDefault();

        brandScroller.scrollBy({

            left: event.deltaY,

            behavior: "auto"

        });

    },

    { passive:false }

);


/*==================================================
    UPDATE ACTIVE CARD
==================================================*/

brandScroller.addEventListener(
    "scroll",
    updateActiveCard
);

window.addEventListener(
    "resize",
    updateActiveCard
);


/*==================================================
    INITIALIZE
==================================================*/

updateActiveCard();