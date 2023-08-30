const canzone = document.querySelectorAll(".canzone");
const player = document.getElementById("player");

canzone.forEach(canzone => {
  canzone.addEventListener("click", () => {
    player.querySelector("p").innerText = canzone.querySelector("p").innerText;
    player.querySelector("p+p").innerText = document.querySelector("h1").innerText;
    player.querySelector("img").src = canzone.querySelector("img").src;
  });
});
