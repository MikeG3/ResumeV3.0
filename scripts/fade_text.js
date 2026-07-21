/*==================================================
    SCROLL REVEAL
==================================================*/

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting)
            entry.target.classList.add("visible");

    });

},
{
    threshold:0.25
});

document.querySelectorAll(".fadeSection").forEach(section=>{
    observer.observe(section);
});