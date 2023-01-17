window.addEventListener("load", (e) => {
    const feuilles = document.querySelectorAll(".feuilleR, .feuilleL");
    for(const f of feuilles) {
        f.classList.add("hidden");
    }

    let feuilleI = 0;
    const showNext = () => {
        const yPos = feuilles[feuilleI].getBoundingClientRect().top;
        const scrollPos = window.innerHeight;
        console.log("y", yPos, "scroll", scrollPos,"innerH", window.innerHeight, "wy", window.scrollY);
        if(scrollPos > yPos) {
            feuilles[feuilleI].classList.remove("hidden");
            feuilleI++;

            if(feuilleI >= feuilles.length) {
                window.removeEventListener("scroll", showNext);
            }
        }
    }
    window.addEventListener("scroll", showNext);
    showNext();
});