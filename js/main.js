window.onload = function () {
    const nav = document.querySelector("nav");
    window.addEventListener("wheel", function (e) {
        // scroll down or up
        if(e.deltaY >= 0) {
            nav.classList.add("goingdown");
        } else {
            nav.classList.remove("goingdown");
        }

        // has scrolled down
        if(window.scrollY > 0) {
            nav.classList.add("scrollview");
        } else {
            nav.classList.remove("scrollview");
        }
    });

    // Shift the page's title
    const u = () => {
        document.title = document.title.substring(1) + document.title[0];
    };
    document.title = document.title.replace(" ", "_") + "~";
    setInterval(u, 500);
}