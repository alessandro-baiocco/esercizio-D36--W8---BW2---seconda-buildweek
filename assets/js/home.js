const url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=Queen";

fetch(url, {
  headers: {
    "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((request) => request.json())
  .then((albumObj) => {
    const leSeiCard = document.querySelectorAll(".cardSeiSu");
    const leCardSU = document.querySelectorAll(".albumSu");
    const leCardCentro = document.querySelectorAll(".albumCentro");
    const leCardGiu = document.querySelectorAll(".albumGiu");

    for (let i = 0; i < leSeiCard.length; i++) {
      leSeiCard[i].innerHTML = `<a href="album.html/${albumObj.data[i].album.id}"
        ><div class="card border border-0 p-0 consigliatiCard">
        <div class="row gap-0 m-0 d-flex align-items-center">
        <div class="col-3 p-0">
        <img
        src="${albumObj.data[i].album.cover_small}"
        alt="${albumObj.data[i].album.title}"
        class="imgConsigliati img-fluid "
        />
        </div>
        <div
        class="text-light nomeConsigliati d-flex align-self-center flex-wrap col-8 align-items-center"
        >
        <p class="m-0">${albumObj.data[i].album.title}</p>
        </div>
        </div>
        </div></a
        >`;

      for (let j = 0; j < leCardSU.length; j++) {
        leCardSU[j].innerHTML = `
                    </a><div class="d-flex flex-md-column">
                    <div>       
                    <a href = "album.html?idAlbum=${albumObj.data[j].artist.id}"><img src="${
          albumObj.data[j].artist.picture_medium
        }" alt="" class="img-fluid"  /></a>
                    </div>
                    <div class="card-body ps-2">
                    <p class="d-block d-md-none">Playlist</p>
                    <a href = "album.html?idAlbum=${albumObj.data[j].artist.id}"><h4 class = "fs-3">${
          albumObj.data[j].artist.name
        }</h4></a>
                    <a href = "album.html?idAlbum=${albumObj.data[j].artist.id}"><p>il meglio di ${
          albumObj.data[j].artist.name
        }</p></a>
                    </div>
                    </div>
                    <div class="d-flex d-md-none">
                    <div class="me-auto">
                    <button class="heart btn"><i class="bi bi-heart text-light fs-3"></i></button>
                    <button class="heart btn"><i class="bi bi-three-dots-vertical text-light fs-3"></i></button>
                    </div>
                    <div class="d-flex align-items-center">
                    <p class="mb-0">${Math.floor(Math.random() * 30 + 10)} brani</p>
                    <button class="heart btn"><i class="bi bi-play-circle text-light fs-3"></i></button>
                    </div>
                    </div>`;
      }
      for (let n = 6; n < leCardCentro.length + 6; n++) {
        leCardCentro[n - 6].innerHTML = `
            <div class="d-flex flex-md-column">
            <div>
            <a href = "album.html?idAlbum=${albumObj.data[n].album.id}"><img src="${
          albumObj.data[n].album.cover_medium
        }" alt="" class="img-fluid"  /></a>
            </div>
              <div class="card-body  ps-2">
              <p class="d-block d-md-none">Playlist</p>
              <a href = "album.html?idAlbum=${albumObj.data[n].album.id}"><h4 class = "fs-3">${
          albumObj.data[n].album.title
        }</h4></a>
              <a href = "album.html?idAlbum=${albumObj.data[n].album.id}"><p>il meglio di ${
          albumObj.data[n].album.title
        }</p></a>
              </div>
              </div>
              <div class="d-flex d-md-none">
              <div class="me-auto">
              <button class="heart btn"><i class="bi bi-heart text-light fs-3"></i></button>
              <button class="heart btn"><i class="bi bi-three-dots-vertical text-light fs-3"></i></button>
              </div>
              <div class="d-flex align-items-center">
              <p class="mb-0">${Math.floor(Math.random() * 30 + 10)} brani</p>
              <button class="heart btn"><i class="bi bi-play-circle text-light fs-3"></i></button>
              </div>
              </div>`;
      }

      for (let m = 8; m < leCardGiu.length + 8; m++) {
        leCardGiu[m - 8].innerHTML = `
            <div class="d-flex flex-md-column">
            <div>
            <a href = "desktop-1.html?idArtist=${albumObj.data[m].album.id}"><img src="${
          albumObj.data[m].album.cover_medium
        }" alt="" class="img-fluid"  /></a>
            </div>
              <div class="card-body ps-2">
              <p class="d-block d-md-none">Playlist</p>
              <a href = "desktop-1.html?idArtist=${albumObj.data[m].album.id}"><h4 class = "fs-3">${
          albumObj.data[m].album.title
        }</h4></a>
              <a href = "desktop-1.html?idArtist=${albumObj.data[m].album.id}"><p>il meglio di ${
          albumObj.data[m].album.title
        }</p></a>
              </div>
              </div>
              <div class="d-flex d-md-none">
              <div class="me-auto">
              <button class="heart btn"><i class="bi bi-heart text-light fs-3"></i></button>
              <button class="heart btn"><i class="bi bi-three-dots-vertical text-light fs-3"></i></button>
              </div>
              <div class="d-flex align-items-center">
              <p class="mb-0">${Math.floor(Math.random() * 30 + 10)} brani</p>
              <button class="heart btn"><i class="bi bi-play-circle text-light fs-3"></i></button>
              </div>
              </div>`;
      }
    }
  });
