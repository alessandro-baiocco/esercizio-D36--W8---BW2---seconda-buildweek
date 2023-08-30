const apiKey = 'X-RapidAPI-Key'
const apiValue = 'c39ea51001msh0b48f18ff7528dfp178bb6jsnbcb227f7b0fe'

window.onload = () => {
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
    const artistId = 412
    const fetchUrl = `https://api.deezer.com/artist/${artistId}/top?limit=6`
    const re = await fetch(fetchUrl, {
        method: "GET",
        headers: {
        'X-RapidAPI-Key': apiValue,
        },
    });
    if (!re.ok) {
        throw new Error("error");
    }
    const product = await re.json();
}

const canzone = document.querySelectorAll(".canzone");
const player = document.getElementById("player");

const artistId = ''

canzone.forEach(canzone => {
  canzone.addEventListener("click", () => {
    player.querySelector("p").innerText = canzone.querySelector("p").innerText;
    player.querySelector("p+p").innerText = document.querySelector("h1").innerText;
    player.querySelector("img").src = canzone.querySelector("img").src;
  });
});
