import {
  getDataFromAPI,
  renderCard,
  goToDetailAnime,
  goToDetailManga,
} from "/app/base/utils.js";

let listAnime = localStorage.getItem("anime_saved");
let listManga = localStorage.getItem("manga_saved");
listAnime = JSON.parse(listAnime);
listManga = JSON.parse(listManga);

let hapusMenu = false;

const animeListCard = document.getElementById("my-anime");
const mangaListCard = document.getElementById("my-manga");

const deleteToogle = document.getElementById("deleteBtn");
deleteToogle.addEventListener("click", () => {
  deleteToogle.classList.toggle("active-hapus")
    ? (hapusMenu = true)
    : (hapusMenu = false);
});

async function main() {
  let animeDatas = new Array();
  let mangaDatas = new Array();

  if (listAnime != null) {
    animeDatas = await Promise.all(
      listAnime.map(async (id) => {
        let data = await getDataFromAPI("https://api.jikan.moe/v4/anime/" + id);
        return data;
      })
    );
  }

  if (listManga != null) {
    mangaDatas = await Promise.all(
      listManga.map(async (id) => {
        let data = await getDataFromAPI("https://api.jikan.moe/v4/manga/" + id);
        return data;
      })
    );
  }

  animeListCard.innerHTML = renderCard(animeDatas);
  mangaListCard.innerHTML = renderCard(mangaDatas);

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (hapusMenu) {
        if (card.classList.contains("manga")) {
          deleteManga(card.id);
        } else {
          deleteAnime(card.id);
        }
        window.location.href = "";
        return;
      }

      if (card.classList.contains("manga")) {
        goToDetailManga(card.id);
      } else {
        goToDetailAnime(card.id);
      }
    });
  });
}

function deleteAnime(id) {
  let arr = localStorage.getItem("anime_saved");
  arr = JSON.parse(arr);

  let newData = arr.filter((mal_id) => mal_id != id);
  newData = JSON.stringify(newData);
  localStorage.setItem("anime_saved", newData);
}

function deleteManga(id) {
  let arr = localStorage.getItem("manga_saved");
  arr = JSON.parse(arr);

  let newData = arr.filter((mal_id) => mal_id != id);
  newData = JSON.stringify(newData);
  localStorage.setItem("manga_saved", newData);
}

main();
