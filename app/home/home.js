import {
  getDataFromAPI,
  renderCard,
  goToExpandList,
  cardClick,
} from "/app/base/utils.js";

// Variabel DOM HTML
const listAnimeSeasonIni = document.getElementById("anime-season-ini");
const listAnimeRekomendasi = document.getElementById("anime-rekomendasi");
const listMangaRekomendasi = document.getElementById("manga-rekomendasi");

async function main() {
  // Ambil data dari API
  let animeSeasonIni = await getDataFromAPI(
    "https://api.jikan.moe/v4/seasons/now",
    6
  );
  let animeRekomendasi = await getDataFromAPI(
    "https://api.jikan.moe/v4/top/anime",
    6
  );
  let mangaRekomendasi = await getDataFromAPI(
    "https://api.jikan.moe/v4/top/manga",
    6
  );

  // Tampilkan data ke Halaman HTML
  listAnimeSeasonIni.innerHTML = renderCard(animeSeasonIni);
  listAnimeRekomendasi.innerHTML = renderCard(animeRekomendasi);
  listMangaRekomendasi.innerHTML = renderCard(mangaRekomendasi);

  const cards = document.querySelectorAll(".card");
  cardClick(cards);

  const expandButton = document.querySelectorAll(".expand");
  expandButton.forEach((exp) => {
    exp.addEventListener("click", (e) => {
      if (exp.classList.contains("exp-anime-season-ini")) {
        goToExpandList(
          "https://api.jikan.moe/v4/seasons/now",
          "Anime Season Ini :"
        );
      } else if (exp.classList.contains("exp-rekomen-anime")) {
        goToExpandList(
          "https://api.jikan.moe/v4/top/anime",
          "Rekomendasi Anime :"
        );
      } else if (exp.classList.contains("exp-rekomen-manga")) {
        goToExpandList(
          "https://api.jikan.moe/v4/top/manga",
          "Rekomendasi Manga :"
        );
      }
    });
  });
}

main();
