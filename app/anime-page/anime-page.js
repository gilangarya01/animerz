import { getAllDataFromAPI, renderCard, cardClick } from "/app/base/utils.js";

const animeListCard = document.querySelector(".list-card");
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

async function main() {
  let animeList = await getAllDataFromAPI("https://api.jikan.moe/v4/anime");

  // Tampilkan data ke Halaman HTML
  animeListCard.innerHTML = renderCard(animeList);
  searchButton.addEventListener("click", () => {
    cariDataAnime();
  });
  const cards = document.querySelectorAll(".card");
  cardClick(cards);
}

async function cariDataAnime() {
  let cards = "";
  if (searchInput.value.length == 0) {
    return;
  } else {
    let list = await getAllDataFromAPI(
      "https://api.jikan.moe/v4/anime?q=" + searchInput.value
    );
    if (list.length < 1) {
      cards = "<p>--Data tidak ditemukan--</p>";
    } else {
      cards = renderCard(list);
    }
  }
  animeListCard.innerHTML = cards;
  const newCards = document.querySelectorAll(".card");
  cardClick(newCards);
}

main();
