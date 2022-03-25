const elList = document.querySelector(".list");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form__select");
const elButton = document.querySelector(".form__button");



function reder(basic , el){
    el.innerHTML = null;
    for (const film of basic) {
        let elItem = document.createElement("li");
        let elBox = document.createElement("div");
        let elImg = document.createElement("img");
        let elTitle = document.createElement("h1");
        let elText = document.createElement("p");
        let elTime = document.createElement("time");
        let elText2 = document.createElement("p")



        el.appendChild(elItem);
        elItem.appendChild(elImg);
        elBox.appendChild(elTitle);
        elBox.appendChild(elText);
        elBox.appendChild(elTime);
        elBox.appendChild(elText2);
        elItem.appendChild(elBox);


        elItem.classList.add("list__item");
        elBox.classList.add("list__box")

        elImg.setAttribute("src" , film.poster);
        elImg.setAttribute("alt", "fi");
        elImg.classList.add("list__img");

        elTitle.textContent = film.title;
        elTitle.classList.add("list__title");

        elText.textContent = film.overview.split(" ").slice(0 ,15).join(" ")
        elText.classList.add("list__text");

        elTime.textContent = bigda();
        elTime.classList.add("list__time");

        elText2.textContent = film.genres;
        elText2.classList.add("list__text2")


        function bigda(evt){
            let newDate = new Date(film.release_date);
            let day = newDate.getDay();
            let month = String(newDate.getMonth()).padStart(2,0);
            let year = newDate.getFullYear();

            return `${day}.${month}.${year}`
        }

        function rederFils(brr, element){
            var result = [];

            brr.forEach(film => {
                film.genres.forEach(gen => {
                   if(!result.includes(gen)){
                    result.push(gen);
                   }
                })
            });

            result.forEach(findNewOption => {
                let elOption = document.createElement("option");
                element.appendChild(elOption);
                elOption.value = findNewOption;
                elOption.textContent = findNewOption;
            });

        }
    }
    rederFils(films, elSelect);

}
reder(films , elList)

elForm.addEventListener("submit", e => {
    e.preventDefault();

    let selectVal = elSelect.value.trim();

    let foundFilm = [];

    if(selectVal){
        foundFilm = films.filter((fil) => {
        return fil.genres.includes(selectVal);
        })
    }
    reder(foundFilm, elList);
});