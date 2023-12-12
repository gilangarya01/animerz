import { getDataFromAPI, renderCardChara, cardClick } from "/app/base/utils.js";

const animeListCard = document.querySelector(".list-card");
const searchInput = document.getElementById("inputSearch");
const searchButton = document.getElementById("searchBtn");

async function main() {
  let charaList = await getDataFromAPI(
    "https://api.jikan.moe/v4/characters?limit=24"
  );

  // Tampilkan data ke Halaman HTML
  animeListCard.innerHTML = renderCardChara(charaList);
  searchButton.addEventListener("click", () => {
    cariDataCharacter();
  });
  const cards = document.querySelectorAll(".card");
  cardClick(cards);
}

async function cariDataCharacter() {
  let cards = "";
  if (searchInput.value.length == 0) {
    return;
  } else {
    let list = await getDataFromAPI(
      "https://api.jikan.moe/v4/characters?limit=24&q=" + searchInput.value
    );
    cards = renderCardChara(list);
  }
  animeListCard.innerHTML = cards;
  const newCards = document.querySelectorAll(".card");
  cardClick(newCards);
}

main();
