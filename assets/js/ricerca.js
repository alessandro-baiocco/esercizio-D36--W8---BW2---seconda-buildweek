let riga = document.querySelector(".cubi");
let carteRicerca = [];
let scrittaRicerca = [];
let inputRicerca = document.querySelector("input");
let ricerca = inputRicerca.value.toLowerCase();
let searched = document.querySelector(".searchedRes");
let searchedArtist = document.querySelector(".searchedResArtist");
let crocePerEliminare = document.querySelector(".bi-x-octagon");

const comeBack = document.querySelector(".bi-chevron-left");

comeBack.addEventListener("click", () => {
  history.back();
});
const goAheadFool = document.querySelector(".bi-chevron-right");

goAheadFool.addEventListener("click", () => {
  history.forward();
});

window.onload = () => {
  cubiDaMostare();
};

const cubiDaMostare = () => {
  riga.innerHTML = "";
  ricercaObj
    .filter((item) => item.titolo.includes(ricerca))
    .map((item) => {
      let cartaRicerca = document.createElement("div");
      cartaRicerca.classList.add("card");
      cartaRicerca.classList.add("col-xl-2");
      cartaRicerca.classList.add("col-lg-3");
      cartaRicerca.classList.add("col-md-4");
      cartaRicerca.classList.add("col-6");
      cartaRicerca.classList.add("p-0");
      cartaRicerca.classList.add("border-0");
      cartaRicerca.innerHTML = ` 
  <div class = "rounded m-0 p-0 casellaRicerca " style = "background-color:${item.bg}">
  <a href = "index.html?search?q=${item.titolo}"<span class="testoCubo fs-2">${item.titolo}</span>
  <div class="imgRicerca">
  <img
  src="${item.img}"
  alt=""
  width="132px"
  height="132px"
  />

  </div>
  </div> `;
      riga.appendChild(cartaRicerca);
      scrittaRicerca = document.querySelectorAll(".testoCubo");
    });
};

const noDef = (e) => {
  ricerca = inputRicerca.value.toLowerCase();
  carteRicerca = document.querySelectorAll(".casellaRicerca");
  try {
    if (ricerca !== "" && ricerca.length >= 3) {
      // crocePerEliminare.classList.remove("d-none");
      // for (let i = 0; i < carteRicerca.length; i++) {
      //   scrittaRicerca[i].innerText.toLowerCase().includes(ricerca)
      //     ? carteRicerca[i].classList.remove("d-none")
      //     : carteRicerca[i].classList.add("d-none");
      //   console.log(scrittaRicerca[i].value, ricerca);
      // }
      cubiDaMostare();
      fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${ricerca}`, {
        headers: {
          "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      })
        .then((reserchedObj) => reserchedObj.json())
        .then((obj) => {
          searched.innerHTML = ``;
          searchedArtist.innerHTML = ``;
          const sopraRic = document.createElement("h2");
          sopraRic.innerText = "risultati più rilevanti";
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
          titCarRic.innerText = `ALBUM : ${obj.data[0].title}`;
          titCarRic.href = `album.html?idAlbum=${obj.data[0].album.id}`;
          // --------------------------------
          const authorDiv = document.createElement("a");
          authorDiv.innerText = `ARTIST : ${obj.data[0].artist.name}`;
          authorDiv.classList.add("authorCarRic");
          authorDiv.href = `artist.html?idArtist=${obj.data[0].artist.id}`;
          // --------------------------------
          searched.appendChild(sopraRic);
          cartaPrin.appendChild(imgCarRic);
          cartaPrin.appendChild(titCarRic);
          cartaPrin.appendChild(authorDiv);
          searched.appendChild(cartaPrin);
          //---------------------------------
          let titArt = document.createElement("h2");
          titArt.innerText = "ARTISTI";
          titArt.classList.add("mt-5");
          titArt.classList.add("mb-3");
          searchedArtist.appendChild(titArt);
          for (let i = 0; i < 3; i++) {
            let artistRes = document.createElement("div");
            artistRes.classList.add("col-3");
            artistRes.classList.add("m-3");
            artistRes.classList.add("cartaRic");
            artistRes.style = "max-width:160px";
            //--------------------------------
            let artistImg = document.createElement("img");
            artistImg.src = `${obj.data[i + 1].artist.picture_medium}`;
            artistImg.classList.add("rounded-circle");
            artistImg.classList.add("img-fluid");
            //------------------------------------
            let artistName = document.createElement("p");
            artistName.innerHTML = `<a href=artist.html?idArtist=${obj.data[1 + i].artist.id}> 
            ${obj.data[1 + i].artist.name}
            </a>
            ARTISTA`;
            artistRes.appendChild(artistImg);
            artistRes.appendChild(artistName);
            searchedArtist.appendChild(artistRes);
          }
        });
    } else {
      // for (let i = 0; i < carteRicerca.length; i++) {
      //   carteRicerca[i].classList.remove("d-none");
      // }
      // searched.innerHTML = ``;
      // searchedArtist.innerHTML = ``;
      // crocePerEliminare.classList.add("d-none");
    }
  } catch {
    (err) => console.log(err);
  }
};

const toggleDef = (e) => {
  e.preventDefault();
  cubiDaMostare();
  // inputRicerca.value = "";
  // for (let i = 0; i < carteRicerca.length; i++) {
  //   carteRicerca[i].classList.remove("d-none");
  // }
  // searched.innerHTML = ``;
  // searchedArtist.innerHTML = ``;
  // crocePerEliminare.classList.add("d-none");
};

const toggleDef2 = (e) => {
  e.preventDefault();
};
