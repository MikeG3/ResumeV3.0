/*==================================================
    BRAND SHOWCASE
==================================================*/

const brandScroller = document.getElementById("brandScroller");
const brandCards = [...document.querySelectorAll(".brandCard")];

const leftArrow = document.querySelector(".leftArrow");
const rightArrow = document.querySelector(".rightArrow");

if (brandScroller && brandCards.length > 0)
{
    /*==================================================
        SETTINGS
    ==================================================*/
    const cardGap = 40; // Match CSS gap


    /*==================================================
        ACTIVE CARD
    ==================================================*/
    function updateActiveCard()
    {
        const center = brandScroller.scrollLeft + brandScroller.clientWidth / 2;

        let activeCard = null;
        let closestDistance = Infinity;

        brandCards.forEach(card =>
        {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - center);

            if (distance < closestDistance)
            {
                closestDistance = distance;
                activeCard = card;
            }
        });

        brandCards.forEach(card =>
            card.classList.remove("activeCard"));

        if (activeCard)
            activeCard.classList.add("activeCard");
    }


    /*==================================================
        SCROLL TO CARD
    ==================================================*/
    function scrollToCard(index)
    {
        brandScroller.scrollTo({

            left: brandCards[index].offsetLeft - (brandScroller.clientWidth - brandCards[index].offsetWidth) / 2,
            behavior: "smooth"

        });
    }

    /*==================================================
        CURRENT CARD INDEX
    ==================================================*/
    function currentCardIndex()
    {
        const center =  brandScroller.scrollLeft + brandScroller.clientWidth / 2;

        let index = 0;
        let closest = Infinity;

        brandCards.forEach((card, i) =>
        {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance =  Math.abs(center - cardCenter);

            if (distance < closest)
            {
                closest = distance;
                index = i;
            }
        });

        return index;
    }


    /*==================================================
        NEXT / PREVIOUS CARD
    ==================================================*/
    function scrollCards(direction)
    {
        let index = currentCardIndex();

        index += direction;

        if (index < 0)
            index = brandCards.length - 1;

        if (index >= brandCards.length)
            index = 0;

        scrollToCard(index);
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
/*
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

        { passive: false }

    );
*/

    /*==================================================
        KEYBOARD
    ==================================================*/
    window.addEventListener("keydown", event =>
    {
        if (event.key === "ArrowRight")
            scrollCards(1);

        if (event.key === "ArrowLeft")
            scrollCards(-1);
    });


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
}