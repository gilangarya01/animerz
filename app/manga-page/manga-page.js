import { getDataFromAPI, renderCard, cardClick } from "/app/base/utils.js";

const animeListCard = document.querySelector(".list-card");
const searchInput = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchBtn");

async function main() {
  let animeList = await getDataFromAPI(
    "https://api.jikan.moe/v4/manga?limit=24"
  );

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
    let list = await getDataFromAPI(
      "https://api.jikan.moe/v4/manga?limit=24&q=" + searchInput.value
    );
    if (list.length < 1) {
      cards = "<p>--No Data--</p>";
    } else {
      cards = renderCard(list);
    }
  }
  animeListCard.innerHTML = cards;
  const newCards = document.querySelectorAll(".card");
  cardClick(newCards);
}

main();
