let riga = document.querySelector(".row");

window.onload = () => {
  for (let i = 0; i < ricercaObj.length; i++) {
    let cartaRicerca = document.createElement("div");
    cartaRicerca.classList.add("card");
    cartaRicerca.classList.add("col-xl-2");
    cartaRicerca.classList.add("col-lg-3");
    cartaRicerca.classList.add("col-md-4");
    cartaRicerca.classList.add("col-6");
    cartaRicerca.classList.add("casellaRicerca");
    cartaRicerca.classList.add("border-0");
    cartaRicerca.innerHTML = ` 
    <div class = "row border-none">
    <div class = "col-11 rounded m-0" style = "background-color:${ricercaObj[i].bg}">
    <span class="ricerca fs-2">${ricercaObj[i].titolo}</span>
    <div class="imgRicerca">
      <img
        src="${ricercaObj[i].img}"
        alt=""
        width="132px"
        height="132px"
      />
     </div>
    </div>
    </div> `;
    riga.appendChild(cartaRicerca);
  }
};

const noDef = (e) => {
  e.preventDefault();
};
