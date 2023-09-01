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
const mp3s = document.querySelectorAll(".track-mp3");

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
