const apiKey = "X-RapidAPI-Key";
const apiValue = "c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe";
const h1 = document.querySelector("h1");
const titoliCanzone = document.querySelectorAll(".titolo-canzone");
const mp3s = document.querySelectorAll(".track-mp3");
const albumCanzoniPopolari = document.querySelectorAll(".album-canzoni-popolari");
const riproduzioni = document.querySelectorAll(".numero-riproduzioni");
const durateCanzoni = document.querySelectorAll(".durata-canzone");
const albums = document.querySelectorAll(".album");
const albumsMobile = document.querySelectorAll(".album-mobile");
const artistaBanner = document.querySelector("#artista-banner");
const aboutImg = document.querySelector(".about-inner");
const realPlayer = document.querySelector("audio");
const playBtn = document.querySelectorAll(".bi-play-circle-fill");
const pauseBtn = document.querySelectorAll(".bi-pause-circle-fill");
const playBtnMobile = document.querySelector(".bi-play-fill");
const pauseBtnMobile = document.querySelector(".bi-pause-fill");
const songBarTime = document.querySelector(".song-bar");
const songTime = document.querySelector(".song-time");
let activeTrackMp3 = null;
let songInterval = null;
let playing = false;
let lapsedSeconds = 0;

albums.forEach(album => [
  album.addEventListener("click", () => {
    const id = album.querySelector(".album-id").innerText;
    window.location.assign("./album.html" + "?idAlbum=" + id);
  }),
]);
albumsMobile.forEach(album => [
  album.addEventListener("click", () => {
    const id = album.querySelector(".album-id").innerText;
    window.location.assign("./album.html" + "?idAlbum=" + id);
  }),
]);
document.querySelectorAll(".bi-shuffle").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("text-green");
    const activeDot = icon.parentElement.querySelector(".bi-dot");
    if (activeDot) {
      activeDot.classList.toggle("d-none");
    }
  });
});
document.querySelectorAll(".bi-arrow-clockwise").forEach(icon => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("text-green");
    icon.parentElement.querySelector(".bi-dot").classList.toggle("d-none");
  });
});

window.onload = async () => {
  const idArtist = new URLSearchParams(window.location.search).get("idArtist");
  const fetchUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtist}`;
  let re = await fetch(fetchUrl);
  if (!re.ok) {
    throw new Error("error");
  }
  const artist = await re.json();
  const artistName = artist.name;
  const artistImg = artist.picture;
  const fanNb = artist.nb_fan;
  h1.innerText = artistName;
  document.querySelectorAll(".link-artista").forEach(link => (link.innerText = artistName));
  document.querySelectorAll(".ascoltatori-mensili").forEach(span => {
    span.innerText = fanNb;
  });
  document.querySelector(".immagine-artista").src = artistImg;
  const trackListUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtist}/top?limit=5`;
  re = await fetch(trackListUrl);
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
    mp3s[index].innerText = track.preview;
    albumCanzoniPopolari[index].src = track.album.cover_small;
    // let rank = track.rank.toString().split("").reverse().join().replace(/.{3}/g, "$&.");
    // console.log(rank);
    // riproduzioni[index].innerText = track.rank
    //   .toString()
    //   .split("")
    //   .reverse()
    //   .replace(/\d{3}/g, "$&.")
    //   .reverse()
    //   .join("");
    riproduzioni[index].innerText = track.rank;
    const durata = track.duration;
    const minuti = Math.floor(durata / 60);
    const secondi = String(durata % 60).padStart(2, "0");
    const durataMS = `${minuti}:${secondi}`;
    durateCanzoni[index].innerText = durataMS;
  });
  const albumsUrl = `https://striveschool-api.herokuapp.com/api/deezer/artist/${idArtist}/top?limit=100`;
  re = await fetch(albumsUrl);
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
  albumsArr.forEach(album => {
    album.closest(".col").className = "d-none";
  });
  if (trueAlbumList.length < 18) {
    if (trueAlbumList.length <= 6) {
      document.querySelector(".piace:nth-of-type(3)").className = "d-none";
      document.querySelector(".piace:nth-of-type(4)").className = "d-none";
    } else if (trueAlbumList.length <= 12) {
      document.querySelector(".piace:nth-of-type(4)").className = "d-none";
    }
  }

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
      lapsedSeconds = 0;
      songTime.innerText = "0:00";
      realPlayer.src = canzone.querySelector(".track-mp3").innerText;
      if (playing) {
        pauseBtn.forEach(pageBtn => {
          pageBtn.classList.add("d-none");
        });
        pauseBtnMobile.classList.add("d-none");
        playBtn.forEach(pageBtn => {
          pageBtn.classList.remove("d-none");
        });
        playBtnMobile.classList.remove("d-none");
      }
      clearInterval(songInterval);
      songBarTime.style.width = "0%";
      player.querySelector("p").innerText = canzone.querySelector(".titolo-canzone").innerText;
      playerMobile.querySelector("p").innerText = canzone.querySelector(".titolo-canzone").innerText;
      player.querySelector("p+p").innerText = document.querySelector("h1").innerText;
      player.querySelector("img").src = canzone.querySelector("img").src;
    });
  });
};

const switchPlayPauseBtns = () => {
  if (playing) {
    playing = false;
    pauseBtn.forEach(pageBtn => {
      pageBtn.classList.add("d-none");
    });
    playBtn.forEach(pageBtn => {
      pageBtn.classList.remove("d-none");
    });
    pauseBtnMobile.classList.add("d-none");
    playBtnMobile.classList.remove("d-none");
    clearInterval(songInterval);
    realPlayer.pause();
  } else {
    playing = true;
    playBtn.forEach(pageBtn => {
      pageBtn.classList.add("d-none");
    });
    playBtnMobile.classList.add("d-none");
    pauseBtn.forEach(pageBtn => {
      pageBtn.classList.remove("d-none");
    });
    pauseBtnMobile.classList.remove("d-none");
    songInterval = setInterval(() => {
      lapsedSeconds++;
      lapsedSecondsString = lapsedSeconds.toString().padStart(2, "0");
      songTime.innerText = `0:${lapsedSecondsString}`;
      songBarTime.style.width = `${(lapsedSeconds / 30) * 100}%`;
      if (lapsedSeconds >= 30) {
        clearInterval(songInterval);
        switchPlayPauseBtns();
      }
    }, 1000);
    realPlayer.play();
  }
};

playBtn.forEach(btn => {
  btn.addEventListener("click", switchPlayPauseBtns);
});

playBtnMobile.addEventListener("click", switchPlayPauseBtns);

pauseBtn.forEach(btn => {
  btn.addEventListener("click", switchPlayPauseBtns);
});

pauseBtnMobile.addEventListener("click", switchPlayPauseBtns);
