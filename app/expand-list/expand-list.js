import { getAllDataFromAPI, renderCard, cardClick } from "/app/base/utils.js";

let urlApiData = localStorage.getItem("url_api");
let expandJudulData = localStorage.getItem("expand_judul");

const expandCard = document.getElementById("expand-card");
const expandJudul = document.getElementById("expand-judul");

async function main() {
  let expandList = await getAllDataFromAPI(urlApiData);
  expandCard.innerHTML = renderCard(expandList);
  expandJudul.textContent = expandJudulData;

  const cards = document.querySelectorAll(".card");
  cardClick(cards);
}

main();
