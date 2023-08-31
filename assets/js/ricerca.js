let riga = document.querySelector(".row");
let carteRicerca = [];
let scrittaRicerca = [];
let inputRicerca = document.querySelector("input");
let ricerca = inputRicerca.value.toLowerCase();
let searched = document.querySelector(".searchedRes");

window.onload = () => {
  for (let i = 0; i < ricercaObj.length; i++) {
    let cartaRicerca = document.createElement("div");
    cartaRicerca.classList.add("card");
    cartaRicerca.classList.add("col-xl-2");
    cartaRicerca.classList.add("col-lg-3");
    cartaRicerca.classList.add("col-md-4");
    cartaRicerca.classList.add("col-6");
    cartaRicerca.classList.add("casellaRicerca");
    cartaRicerca.classList.add("border-0");
    cartaRicerca.innerHTML = ` 
    <div class = "row border-none">
    <div class = "col-11 rounded m-0" style = "background-color:${ricercaObj[i].bg}">
    <span class="ricerca fs-2">${ricercaObj[i].titolo}</span>
    <div class="imgRicerca">
    <img
    src="${ricercaObj[i].img}"
    alt=""
    width="132px"
    height="132px"
    />
    </div>
    </div>
    </div> `;
    riga.appendChild(cartaRicerca);
  }
};

const noDef = async (e) => {
  e.preventDefault();
  ricerca = inputRicerca.value.toLowerCase();
  carteRicerca = document.querySelectorAll(".casellaRicerca");
  scrittaRicerca = document.querySelectorAll(".ricerca");
  try {
    if (ricerca !== "") {
      for (let i = 0; i < carteRicerca.length; i++) {
        scrittaDaCont = scrittaRicerca[i].innerText.toLowerCase();
        scrittaDaCont.includes(ricerca)
          ? carteRicerca[i].classList.remove("d-none")
          : carteRicerca[i].classList.add("d-none");
      }
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${ricerca}`, {
        headers: {
          "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((reserchedObj) => reserchedObj.json())
        .then((obj) => {
          searched.innerHTML = ``;
          const sopraRic = document.createElement("h2");
          sopraRic.innerText = "risultato più rilevante";
          // ----------------------------
          const cartaPrin = document.createElement("div");
          cartaPrin.classList.add("cartaRic");
          cartaPrin.classList.add("p-3");
          cartaPrin.classList.add("pb-0");
          // -------------------------
          const imgCarRic = document.createElement("img");
          imgCarRic.src = `${obj.data[0].artist.picture_medium}`;
          // ---------------------
          const titCarRic = document.createElement("a");
          titCarRic.classList.add("fs-5");
          titCarRic.classList.add("titCarRic");
          titCarRic.innerText = `${obj.data[0].title}`;
          titCarRic.href = `desktop-1.html?idArtist=${obj.data[0].album.id}`;
          // --------------------------------
          const authorDiv = document.createElement("a");
          authorDiv.innerText = `${obj.data[0].artist.name}`;
          authorDiv.classList.add("authorCarRic");
          authorDiv.href = `artist.html?idArtist=${obj.data[0].artist.id}`;
          // --------------------------------
          searched.appendChild(sopraRic);
          cartaPrin.appendChild(imgCarRic);
          cartaPrin.appendChild(titCarRic);
          cartaPrin.appendChild(authorDiv);
          searched.appendChild(cartaPrin);
        });
    }
  } catch {
    (err) => console.log(err);
  }
};
