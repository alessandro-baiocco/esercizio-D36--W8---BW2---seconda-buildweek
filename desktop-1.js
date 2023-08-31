const apiKey = "X-RapidAPI-Key";
const apiValue = "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe";
const h1 = document.querySelector("h1");
const titoliCanzone = document.querySelectorAll(".titolo-canzone");
const albumCanzoniPopolari = document.querySelectorAll(".album-canzoni-popolari");
const riproduzioni = document.querySelectorAll(".numero-riproduzioni");
const durateCanzoni = document.querySelectorAll(".durata-canzone");
const albums = document.querySelectorAll(".album");
const albumsMobile = document.querySelectorAll(".album-mobile");
const artistaBanner = document.querySelector("#artista-banner");
const aboutImg = document.querySelector(".about-inner");

albums.forEach(album => [
  album.addEventListener("click", () => {
    const id = album.querySelector(".album-id").innerText;
    window.location.assign("./desktop.html" + "?id=" + id);
  }),
]);
albumsMobile.forEach(album => [
  album.addEventListener("click", () => {
    const id = album.querySelector(".album-id").innerText;
    window.location.assign("./desktop.html" + "?id=" + id);
  }),
]);

window.onload = async () => {
  // const artistId = new URLSearchParams(window.location.search).get("artistId");
  // const re = await fetch(serverUrl + "/" + artistId, {
  //     method: "GET",
  //     headers: {
  //     Authorization: apiValue,
  //     },
  // });
  // if (!re.ok) {
  //     throw new Error("error");
  // }
  // const product = await re.json();
  const artistId = 412;
  //   const artistId = 847;
  //   const fetchUrl = `https://api.deezer.com/artist/${artistId}/top?limit=6`;
  const fetchUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;
  let re = await fetch(fetchUrl, {
    method: "GET",
    // headers: {
    //   "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
    //   "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    // },
  });
  if (!re.ok) {
    throw new Error("error");
  }
  const artist = await re.json();
  const artistName = artist.name;
  const artistImg = artist.picture;
  const fanNb = artist.nb_fan;
  h1.innerText = artistName;
  document.querySelector(".link-artista").innerText = artistName;
  document.querySelectorAll(".ascoltatori-mensili").forEach(span => {
    span.innerText = fanNb;
  });
  document.querySelector(".immagine-artista").src = artistImg;
  const trackListUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`;
  re = await fetch(trackListUrl, {
    method: "GET",
    // headers: {
    //   "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
    //   "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    // },
  });
  if (!re.ok) {
    throw new Error("error");
  }
  const trackListRe = await re.json();
  const trackList = trackListRe.data;
  if (trackList.length < 5) {
    const canzoniPolari = document.querySelectorAll(".canzoni-popolari-sezione");
    const canzoniPolariArr = Array.from(canzoniPolari);
    canzoniPolariArr.splice(0, trackList.length);
    canzoniPolariArr.forEach(canzone => (canzone.className = "d-none"));
  }
  trackList.forEach((track, index) => {
    titoliCanzone[index].innerText = track.title_short ? track.title_short : track.title;
    albumCanzoniPopolari[index].src = track.album.cover_small;
    albumCanzoniPopolari[index].src = track.album.cover_small;
    riproduzioni[index].innerText = track.rank;
    const durata = track.duration;
    const minuti = Math.floor(durata / 60);
    const secondi = String(durata % 60).padStart(2, "0");
    const durataMS = `${minuti}:${secondi}`;
    durateCanzoni[index].innerText = durataMS;
  });
  const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=100`;
  //   const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=18`;
  re = await fetch(albumsUrl, {
    method: "GET",
    // headers: {
    //   "X-RapidAPI-Key": "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe",
    //   "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    // },
  });
  if (!re.ok) {
    throw new Error("error");
  }
  const albumListRe = await re.json();
  const albumList = albumListRe.data;
  const trueAlbumList = [];
  try {
    albumList.forEach(album => {
      let found = false;
      for (let i = 0; i < trueAlbumList.length; i++) {
        if (album.album.title === trueAlbumList[i].album.title) {
          found = true;
          break;
        }
      }
      if (!found) {
        trueAlbumList.push(album);
      }
      if (trueAlbumList.length === 18) {
        throw new Error("Break the loop.");
      }
    });
  } catch (error) {}
  trueAlbumList.forEach((album, index) => {
    if (index < 5) {
      albumsMobile[index].querySelector("img").src = album.album.cover;
      albumsMobile[index].querySelector("h4").innerText = album.album.title;
      albumsMobile[index].querySelector("h4+p").innerText = "Album";
      albumsMobile[index].querySelector(".album-id").innerText = album.album.id;
    }
    albums[index].querySelector("img").src = album.album.cover;
    albums[index].querySelector("h4").innerText = album.album.title;
    albums[index].querySelector("h4+p").innerText = "Album";
    albums[index].querySelector(".album-id").innerText = album.album.id;
  });
  const albumsArr = Array.from(albums);
  albumsArr.splice(0, trueAlbumList.length);
  console.log(albumsArr.length);
  albumsArr.forEach(album => {
    album.closest(".col").className = "d-none";
  });
  if (trueAlbumList.length < 18) {
    if (trueAlbumList.length <= 12) {
      document.querySelector(".piace:nth-of-type(4)").className = "d-none";
    } else if (trueAlbumList.length <= 6) {
      document.querySelector(".piace:nth-of-type(3)").className = "d-none";
      document.querySelector(".piace:nth-of-type(4)").className = "d-none";
    }
  }
  //   console.log(albumsMobile);

  if (trueAlbumList.length < 5) {
    const albumsMobileArr = Array.from(albumsMobile);
    albumsMobileArr.splice(0, trueAlbumList.length);
    albumsMobileArr.forEach(album => {
      album.className = "d-none";
    });
  }
  const artistBigImg = artist.picture_xl;
  artistaBanner.style.backgroundImage = `url(${artistBigImg})`;
  aboutImg.style.backgroundImage = `url(${artistBigImg})`;

  const canzone = document.querySelectorAll(".dettagli-canzone");
  const player = document.querySelector("#player");
  const playerMobile = document.querySelector("#player-mobile");

  canzone.forEach(canzone => {
    canzone.addEventListener("click", () => {
      player.querySelector("p").innerText = canzone.querySelector(".titolo-canzone").innerText;
      playerMobile.querySelector("p").innerText = canzone.querySelector(".titolo-canzone").innerText;
      player.querySelector("p+p").innerText = document.querySelector("h1").innerText;
      player.querySelector("img").src = canzone.querySelector("img").src;
    });
  });
};
