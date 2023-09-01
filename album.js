window.onload = async () => {
  let url = new URLSearchParams(window.location.search);
  let id = url.get("idAlbum");
  if (!id) window.location.assign("/index.html");
  console.log(id);

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
    console.log(album);
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
    console.log(res);
    let data = await res.json();
    const songs = data.tracks.data;
    console.log(songs);
    for (let i = 0; i < songs.length; i++) {
      row.innerHTML += `<td class="ms-5 col col-1 d-none d-md-table-cell" scope="row">${i + 1}</td>
      <td colspan="1" class="col col-5">${songs[i].title_short}</td>
      <td class="col col-5 d-none d-md-table-cell">${songs[i].rank} </td>
      <td class="col col-1 d-none d-md-table-cell" colspan="5">
        ${(songs[i].duration / 60).toFixed(2)} min
      </td>`;
    }
  };
  secondSection();

  //terza sezione
  const thirdSection = async () => {
    let row = document.querySelector(".thirdSectionAlbum");
    let res = await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id);
    let data = await res.json();
    console.log(data);
    let res2 = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${data.artist.name}`);
    let data2 = await res2.json();
    console.log(data2);
    let myAlbums = [data2.data[4], data2.data[2], data2.data[10], data2.data[8], data2.data[15]];
    console.log(myAlbums);
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
