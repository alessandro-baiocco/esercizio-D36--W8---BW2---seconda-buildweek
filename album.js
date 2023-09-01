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

window.onload = async () => {
  let url = new URLSearchParams(window.location.search);
  let id = url.get("idAlbum");
  if (!id) window.location.assign("/index.html");

  //----------------freccie per avanti e indietro
  const comeBack = document.querySelector(".bi-chevron-left");

  comeBack.addEventListener("click", () => {
    history.back();
  });
  const goAheadFool = document.querySelector(".bi-chevron-right");

  goAheadFool.addEventListener("click", () => {
    history.forward();
  });
  //----------------------------------------
  // prima sezione
  const firstSection = async () => {
    let row = document.querySelector(".containerAlbum");
    let res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id);
    let album = await res.json();

    row.innerHTML += `<div class ="imgAlbum d-flex d-md-block"> <img
    src="${album.cover_medium}"
    alt=""
  /></div>
  <div class="album-cont">
    <p class = d-none d-md-block>ALBUM</p>
    <h2>${album.title}</h2>
    <p class="paragrafoAlbum">
      <ion-icon name="person-circle-outline"></ion-icon>
      <a href="./artist.html?idArtist=${album.artist.id}"> ${album.artist.name}</a> - ${new Date(
      album.release_date
    ).getFullYear()} - Brani: ${album.nb_tracks}, Durata: ${Math.floor(album.duration / 60)}min
    </p>
  </div>`;
  };
  firstSection();

  // seconda sezione

  const secondSection = async () => {
    let row = document.querySelector(".containerTabella");
    let res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id);

    let data = await res.json();
    const songs = data.tracks.data;

    for (let i = 0; i < songs.length; i++) {
      row.innerHTML += `<td class="ms-5 col col-1 d-none d-md-table-cell" scope="row">${i + 1}</td>
      <td colspan="1" class="col col-5 songTitle">${songs[i].title_short}</td>
      <p class="d-none track-mp3">${songs[i].preview}</p>
      <td class="col col-5 d-none d-md-table-cell">${songs[i].rank} </td>
      <td class="col col-1 d-none d-md-table-cell" colspan="5">
      ${(songs[i].duration / 60).toFixed(2)} min
      </td>`;
    }
    let songDiNuovo = document.querySelectorAll(".songTitle");
    const mp3s = document.querySelectorAll(".track-mp3");
    songDiNuovo.forEach((canzone) => {
      canzone.addEventListener("click", () => {
        lapsedSeconds = 0;
        songTime.innerText = "0:00";
        realPlayer.src = document.querySelector(".track-mp3").innerText;
        if (playing) {
          pauseBtn.forEach((pageBtn) => {
            pageBtn.classList.add("d-none");
          });
          pauseBtnMobile.classList.add("d-none");
          playBtn.forEach((pageBtn) => {
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
  secondSection();

  //terza sezione
  const thirdSection = async () => {
    let row = document.querySelector(".thirdSectionAlbum");
    let res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id);
    let data = await res.json();
    let res2 = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${data.artist.name}`);
    let data2 = await res2.json();
    let myAlbums = [data2.data[4], data2.data[2], data2.data[10], data2.data[8], data2.data[15]];
    myAlbums.forEach(({ album, artist }, i) => {
      row.innerHTML += `<div class="cards col col-5 col-md-2 ${i == 4 ? "nascondiCard" : " "}">
      <img
      src="${album.cover_medium}"
      alt="${album.title}"
      />
      <div>
      <a href="./album.html?idAlbum=${album.id}">
      <h5 class="text-truncate">${album.title}</h5></a>
      <a href="./artist.html?idArtist=${artist.id}">
      <p class="text-truncate">${artist.name}</p></a>
      </div>
    </div>`;
    });
  };
  thirdSection();
};

document.querySelectorAll(".bi-shuffle").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("text-green");
    const activeDot = icon.parentElement.querySelector(".bi-dot");
    if (activeDot) {
      activeDot.classList.toggle("d-none");
    }
  });
});
document.querySelectorAll(".bi-arrow-clockwise").forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("text-green");
    icon.parentElement.querySelector(".bi-dot").classList.toggle("d-none");
  });
});

const switchPlayPauseBtns = () => {
  if (playing) {
    playing = false;
    pauseBtn.forEach((pageBtn) => {
      pageBtn.classList.add("d-none");
    });
    playBtn.forEach((pageBtn) => {
      pageBtn.classList.remove("d-none");
    });
    pauseBtnMobile.classList.add("d-none");
    playBtnMobile.classList.remove("d-none");
    clearInterval(songInterval);
    realPlayer.pause();
  } else {
    playing = true;
    playBtn.forEach((pageBtn) => {
      pageBtn.classList.add("d-none");
    });
    playBtnMobile.classList.add("d-none");
    pauseBtn.forEach((pageBtn) => {
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

playBtn.forEach((btn) => {
  btn.addEventListener("click", switchPlayPauseBtns);
});

playBtnMobile.addEventListener("click", switchPlayPauseBtns);

pauseBtn.forEach((btn) => {
  btn.addEventListener("click", switchPlayPauseBtns);
});

pauseBtnMobile.addEventListener("click", switchPlayPauseBtns);
