const parameter = new URLSearchParams(window.location.search).get("search?q");

const url =
  parameter !== null
    ? `https://striveschool-api.herokuapp.com/api/deezer/search?q=${parameter}`
    : `https://striveschool-api.herokuapp.com/api/deezer/search?q=ciao`;
let fetchedContentId = [];
let requestedAlbum = [];
let requestedArtist = [];
let albumArtistId = [];

const comeBack = document.querySelector(".bi-chevron-left");

comeBack.addEventListener("click", () => {
  history.back();
});
const goAheadFool = document.querySelector(".bi-chevron-right");

goAheadFool.addEventListener("click", () => {
  history.back();
});

fetch(url, {
  headers: {
    "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
})
  .then((request) => request.json())
  .then((albumObj) => {
    for (let i = 0; i < albumObj.data.length; i++)
      if (!albumArtistId.includes(albumObj.data[i].album.id)) {
        requestedAlbum.push(albumObj.data[i].album);
        albumArtistId.push(albumObj.data[i].album.id);
      }
    for (let i = 0; i < albumObj.data.length; i++)
      if (!albumArtistId.includes(albumObj.data[i].artist.id)) {
        requestedArtist.push(albumObj.data[i].artist);
        albumArtistId.push(albumObj.data[i].artist.id);
      }

    const seiSu = document.querySelector(".cardSeiSu");
    for (let i = 0; i < 6; i++) {
      let seiSuCard = document.createElement("div");
      seiSuCard.classList.add("col-6");
      seiSuCard.classList.add("col-md-4");
      seiSuCard.classList.add("pe-4");
      seiSuCard.innerHTML = `
    <div class="card border border-0 p-0 consigliatiCard">
      <div class="row gap-0 m-0 d-flex align-items-center">
        <div class="col-3 p-0">
          <img
          src="${requestedAlbum[i].cover_small}"
          alt="${requestedAlbum[i].title}"
          class="imgConsigliati img-fluid "
          />
        </div>
        <div class="text-light nomeConsigliati d-flex align-self-center flex-wrap col-8 align-items-center">
          <a href="album.html?idAlbum=${requestedAlbum[i].id}">
            <p class="m-0">${requestedAlbum[i].title}</p>
          </a>
        </div>
      </div>
    </div>`;
      seiSu.appendChild(seiSuCard);
    }
    let artistiHome = document.querySelector(".artistHome");
    // albumSu col-12 col-md-5 col-lg-3 col-xl-2 d-flex flex-md-row flex-column
    if (requestedArtist.length > 6) {
      for (let i = 0; i < 5; i++) {
        const artistHome = document.createElement("div");
        artistHome.classList.add("artistiEsposti");
        artistHome.classList.add("col-md");
        // artistHome.classList.add("col-md-5");
        // artistHome.classList.add("col-lg-3");
        // artistHome.classList.add("col-xl-3");
        artistHome.classList.add("flex-md-row");
        artistHome.classList.add("flex-column");
        artistHome.innerHTML = `
    <div class="d-flex flex-md-column">
        <div>
          <a href = "artist.html?idArtist=${requestedArtist[i].id}">
            <img 
            src="${requestedArtist[i].picture_medium}" 
            alt="" 
            class="img-fluid"  
            />
          </a>
      </div>
      <div class="card-body ps-2">
        <p class="d-block d-md-none">Playlist</p>
          <a href = "artist.html?idArtist=${requestedArtist[i].id}">
            <h4 class = "fs-5">${requestedArtist[i].name}</h4>
          </a>
          <a href = "artist.html?idArtist=${requestedArtist[i].id}">
            <p>il meglio di ${requestedArtist[i].name}</p>
          </a>
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
        artistiHome.appendChild(artistHome);
      }
    } else {
      const artistHome = document.createElement("div");
      artistHome.classList.add("albumEsposti");
      artistHome.classList.add("col-md");
      // artistHome.classList.add("col-md-5");
      // artistHome.classList.add("col-lg-3");
      // artistHome.classList.add("col-xl-3");
      artistHome.classList.add("flex-md-row");
      artistHome.classList.add("flex-column");
      artistHome.innerHTML = `
      <div>
      <div>
     <img src="https://i0.wp.com/www.casabastiano.com/wp-content/uploads/2021/08/no-music-no-life-scaled.jpeg?resize=2048%2C1152&ssl=1" alt="" class="img-fluid"  />
       </div>
       <div class="card-body ps-2">
       <p class="d-block d-md-none">Playlist</p>
      <h4 class = "fs-5">non sono stati trovati risultati</h4>

       </div>
       </div>
       <div class="d-flex d-md-none">
       <div class="me-auto">
       <i class="bi bi-x-lg"></i>
       <i class="bi bi-x-lg"></i>
       </div>
       <div class="d-flex align-items-center">
       <p class="mb-0">0 brani</p>
       <i class="bi bi-x-lg"></i>
       </div>
      </div>`;
      artistiHome.appendChild(artistHome);
    }

    let albumHomeSpace = document.querySelector(".albumHome");
    if (requestedAlbum.length > 10) {
      for (let i = 5; i < 10; i++) {
        const albumHome = document.createElement("div");
        albumHome.classList.add("albumEsposti");
        albumHome.classList.add("col-md");
        // albumHome.classList.add("col-md-5");
        // albumHome.classList.add("col-lg-3");
        // albumHome.classList.add("col-xl-3");
        albumHome.classList.add("flex-md-row");
        albumHome.classList.add("flex-column");
        albumHome.innerHTML = `
      <div class="d-flex flex-md-column">
      <div>
      <a href = "album.html?idAlbum=${requestedAlbum[i].id}"><img src="${
          requestedAlbum[i].cover_medium
        }" alt="" class="img-fluid"  /></a>
       </div>
       <div class="card-body ps-2">
       <p class="d-block d-md-none">Playlist</p>
       <a href = "album.html?idAlbum=${requestedAlbum[i].id}"><h4 class = "fs-5">${requestedAlbum[i].title}</h4></a>
       <a href = "album.html?idAlbum=${requestedArtist[i].id}"><p>${requestedArtist[i].name}</p></a>
       </div>
       </div>
       <div class="d-flex d-md-none">
       <div class="me-auto">
       <button class="heart btn"><i class="bi bi-heart text-light fs-5"></i></button>
       <button class="heart btn"><i class="bi bi-three-dots-vertical text-light fs-3"></i></button>
       </div>
       <div class="d-flex align-items-center">
       <p class="mb-0">${Math.floor(Math.random() * 30 + 10)} brani</p>
       <button class="heart btn"><i class="bi bi-play-circle text-light fs-3"></i></button>
       </div>
      </div>`;
        albumHomeSpace.appendChild(albumHome);
      }
    } else {
      const albumHome = document.createElement("div");
      albumHome.classList.add("albumEsposti");
      albumHome.classList.add("col-8");
      // albumHome.classList.add("col-md-5");
      // albumHome.classList.add("col-lg-3");
      // albumHome.classList.add("col-xl-3");
      albumHome.classList.add("flex-md-row");
      albumHome.classList.add("flex-column");
      albumHome.innerHTML = `
     <div>
      <div>
     <img src="https://i0.wp.com/www.casabastiano.com/wp-content/uploads/2021/08/no-music-no-life-scaled.jpeg?resize=2048%2C1152&ssl=1" alt="" class="img-fluid"  />
       </div>
       <div class="card-body ps-2">
       <p class="d-block d-md-none">Playlist</p>
      <h4 class = "fs-5">non sono stati trovati risultati</h4>

       </div>
       </div>
       <div class="d-flex d-md-none">
       <div class="me-auto">
       <i class="bi bi-x-lg"></i>
       <i class="bi bi-x-lg"></i>
       </div>
       <div class="d-flex align-items-center">
       <p class="mb-0">0 brani</p>
       <i class="bi bi-x-lg"></i>
       </div>
      </div>`;
      albumHomeSpace.appendChild(albumHome);
    }
  });
