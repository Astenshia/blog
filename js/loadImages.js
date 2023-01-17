const COLUMN_COUNT = 3;
const DELAY = {min: 100, max: 2000}; // ms

const toLoad = [
    {name: "Logos",          dir: "logos",    column: false},
    {name: "Digital",        dir: "digital",  column: false},
    {name: "Inktober 2022" , dir: "inktober", column: false},
    {name: "Inked",          dir: "inked",    column: true },
    {name: "Color",          dir: "color",    column: true },
    {name: "Sketches",       dir: "sketches", column: false},
];

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1);
}

window.addEventListener("load", () => {
    const sectionParent = document.querySelector(".arts");

    const loadDataIntoSection = async (sectionName, dirName, columnDisplay=false) => {
        
        const buildImageCard = (name, img, extend) => {
            const div = document.createElement("div");
            div.className = "hidden img-card" + (extend ? " extend" : "");
            div.innerHTML = `
            <div class="img-card-wrap">
                <img src="img/${img}" alt="${name}">
                <div class="img-card-title">
                    <p>${name.toUpperCase()}</p>
                </div>
            </div>
            `;
            const delay = DELAY.min + Math.random() * (DELAY.max - DELAY.min);
            setTimeout(() => {
                div.classList.remove("hidden");
            }, delay);

            return div;
        };

        const buildColumn = () => {
            const column = document.createElement("div");
            column.className = "column";
            return column;
        };


        const url = "img/" + dirName + "/data.json";
        await fetch(url)
            .then(res => {
                if(!res.ok) console.error("Failed to fetch ", res.url);
                else return res.json();
            })
            .then(data => {
                // build section
                const section = document.createElement("section");
                section.id = sectionName.toLowerCase().split(" ")[0];
                section.className = sectionName.toLowerCase() + " leaf hidden";

                // build div
                const titleDiv = document.createElement("div");
                const title = document.createElement("h4");
                title.textContent = capitalize(sectionName);
                titleDiv.appendChild(title);
                section.appendChild(titleDiv);

                if(columnDisplay) {
                    section.classList.add("has-columns");
                    const columns = new Array();
                    for(let i = 0; i < COLUMN_COUNT; ++i) {
                        const col = buildColumn();
                        columns.push(col);
                        section.appendChild(col);
                    }

                    // build cards
                    let count = 0;
                    for(const card of data) {
                        columns[(count++) % COLUMN_COUNT].appendChild(buildImageCard(card.name, dirName+"/"+card.img));
                    }
                } else {
                    for(const card of data) {
                        const extend = card["extend"] ?? false;
                        section.appendChild(buildImageCard(card.name, dirName+"/"+card.img, extend));
                    }
                }
                
                setTimeout(() => {
                    section.classList.remove("hidden");
                }, DELAY.min);
                sectionParent.appendChild(section);
            });
    };

    // rajoute les données dans le document
    let nextI = 0;
    const loop = () => {
        const card = toLoad[nextI];
        loadDataIntoSection(card.name, card.dir, card.column)
        .then(_ => {
            if(nextI < toLoad.length - 1) {
                nextI += 1;
                setTimeout(loop, DELAY.max);
            }
        });
    };
    loop();

    // static
    // await loadDataIntoSection("Logos", "logos");
    // await loadDataIntoSection("Digital", "digital");
    // await loadDataIntoSection("Inktober 2022", "inktober");
    // await loadDataIntoSection("Inked", "inked", true);
    // await loadDataIntoSection("Color", "color", true);
    // await loadDataIntoSection("Sketches", "sketches");
});