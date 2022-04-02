const elList = document.querySelector(".list");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form__select");
const elButton = document.querySelector(".form__button");
const elSavedList = document.querySelector(".saved-list");
const modal = document.querySelector(".modal");
const cont = document.querySelector(".container");





let savedArr = [];
let modalArr = [];

elSavedList.addEventListener("click", (ev) => {
    const saveIDIs = ev.target.matches(".save-delete");
    if(saveIDIs){
        const svID = Number(ev.target.dataset.saveID);
        const findSvId = savedArr.findIndex(e => e.id == svID);
        savedArr.splice(findSvId,1);
        rederSavedArr(savedArr,elSavedList)
    }
});

function rederSavedArr(arr, element) {
    element.innerHTML = "";
    arr.forEach(save => {
        const saveItem = document.createElement("li");
        const saveDelete = document.createElement("button");

        saveItem.textContent = save.title;
        saveItem.classList.add("save-item");

        saveDelete.classList.add("save-delete");
        saveDelete.textContent = "Delete";
        saveDelete.dataset.saveID = save.id;

        element.appendChild(saveItem);
        saveItem.appendChild(saveDelete);


    });
}

elList.addEventListener("click", evt => {
    const savedSpan = evt.target.matches(".span-img");
    const moreBt = evt.target.matches(".more-btn");
    if(savedSpan) {
        const saved = evt.target.dataset.filmId;
        const foundSaved = films.find(e => e.id == saved);

        if(!savedArr.includes(foundSaved)){
            savedArr.push(foundSaved);
        };

     };
     if(moreBt){
        modal.classList.add("del");
        const moreBtnID = evt.target.dataset.moreID;
        const findBtnIdMore = films.find(e => e.id == moreBtnID);

        if(!modalArr.includes(findBtnIdMore)){

            modalArr.push(findBtnIdMore);
            const moreItem = document.createElement("li");

            moreItem.textContent = findBtnIdMore.title;
            moreItem.classList.add("more__item")

            modal.appendChild(moreItem);
        };

     }

     rederSavedArr(savedArr,elSavedList);
});

function reder(basic , el){
    el.innerHTML = null;
    for (const film of basic) {
        let elItem = document.createElement("li");
        let elBox = document.createElement("div");
        let elImg = document.createElement("img");
        let elTitle = document.createElement("h1");
        let elText = document.createElement("p");
        let elBtnMore = document.createElement("button");
        let elSpan = document.createElement("span");


        el.appendChild(elItem);
        elItem.appendChild(elImg);
        elBox.appendChild(elTitle);
        elBox.appendChild(elText);
        elBox.appendChild(elBtnMore);
        elBox.appendChild(elSpan);
        elItem.appendChild(elBox);


        elBtnMore.textContent = "More";
        elBtnMore.classList.add("more-btn");
        elBtnMore.dataset.moreID = film.id;

        elSpan.classList.add("span-img");
        elSpan.dataset.filmId = film.id;


        elItem.classList.add("list__item");
        elBox.classList.add("list__box")

        elImg.setAttribute("src" , film.poster);
        elImg.setAttribute("alt", "fi");
        elImg.classList.add("list__img");

        elTitle.textContent = film.title;
        elTitle.classList.add("list__title");

        elText.textContent = film.overview.split(" ").slice(0 ,15).join(" ")
        elText.classList.add("list__text");



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
