const DELAY = 500;
window.addEventListener("load", (e) => {
    const feuillesLink = document.querySelectorAll(".feuille-link");
    let i = 0;
    const anim = () => {
        feuillesLink[i].classList.remove("hidden");
        if(++i < feuillesLink.length) {
            setTimeout(anim, DELAY);
        }
    };
    anim();
});