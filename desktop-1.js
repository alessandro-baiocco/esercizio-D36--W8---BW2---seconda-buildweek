const apiKey = "X-RapidAPI-Key";
const apiValue = "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe";
const h1 = document.querySelector("h1");
const titoliCanzone = document.querySelectorAll(".titolo-canzone");
const albumCanzoniPopolari = document.querySelectorAll(".album-canzoni-popolari");
const riproduzioni = document.querySelectorAll(".numero-riproduzioni");
const durateCanzoni = document.querySelectorAll(".durata-canzone");
const albums = document.querySelectorAll(".album");
const artistaBanner = document.querySelector("#artista-banner");
const aboutImg = document.querySelector(".about-inner");

window.onload = async () => {
  // const artistId = new URLSearchParams(window.location.search).get("artistId");
  // const re = await fetch(serverUrl + "/" + productId, {
  //     method: "GET",
  //     headers: {
  //     Authorization: apiValue,
  //     },
  // });
  // if (!re.ok) {
  //     throw new Error("error");
  // }
  // const product = await re.json();
  const artistId = 411;
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
  trackList.forEach((track, index) => {
    // console.log(titoliCanzone);
    titoliCanzone[index].innerText = track.title;
    albumCanzoniPopolari[index].src = track.album.cover_small;
    albumCanzoniPopolari[index].src = track.album.cover_small;
    riproduzioni[index].innerText = track.rank;
    const durata = track.duration;
    const minuti = Math.floor(durata / 60);
    const secondi = String(durata % 60).padStart(2, "0");
    const durataMS = `${minuti}:${secondi}`;
    durateCanzoni[index].innerText = durataMS;
  });
  const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=18`;
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
  albumList.forEach((album, index) => {
    albums[index].querySelector("img").src = album.album.cover;
    albums[index].querySelector("h4").innerText = album.album.title;
    albums[index].querySelector("h4+p").innerText = "Album";
  });
  const artistBigImg = artist.picture_xl;
  console.log(artistBigImg);
  artistaBanner.style.backgroundImage = `url(${artistBigImg})`;
  aboutImg.style.backgroundImage = `url(${artistBigImg})`;
};

const canzone = document.querySelectorAll(".canzone");
const player = document.getElementById("player");

const artistId = "";

canzone.forEach(canzone => {
  canzone.addEventListener("click", () => {
    player.querySelector("p").innerText = canzone.querySelector("p").innerText;
    player.querySelector("p+p").innerText = document.querySelector("h1").innerText;
    player.querySelector("img").src = canzone.querySelector("img").src;
  });
});
