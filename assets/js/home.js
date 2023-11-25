// Variabel DOM HTML
const listAnimeSeasonIni = document.getElementById("anime-season-ini");
const listAnimeRekomendasi = document.getElementById("anime-rekomendasi");
const listMangaRekomendasi = document.getElementById("manga-rekomendasi");

async function main() {
  // Ambil data dari API
  let animeSeasonIni = await getAPIForHomePage(
    "https://api.jikan.moe/v4/seasons/now"
  );
  let animeRekomendasi = await getAPIForHomePage(
    "https://api.jikan.moe/v4/top/anime"
  );
  let mangaRekomendasi = await getAPIForHomePage(
    "https://api.jikan.moe/v4/top/manga"
  );

  // Tampilkan data ke Halaman HTML
  listAnimeSeasonIni.innerHTML = renderCard(animeSeasonIni);
  listAnimeRekomendasi.innerHTML = renderCard(animeRekomendasi);
  listMangaRekomendasi.innerHTML = renderCard(mangaRekomendasi);

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("manga")) {
        detailManga(card.id);
      } else {
        detailAnime(card.id);
      }
    });
  });

  const expandButton = document.querySelectorAll(".expand");
  expandButton.forEach((exp) => {
    exp.addEventListener("click", (e) => {
      if (exp.classList.contains("exp-anime-season-ini")) {
        expandList(
          "https://api.jikan.moe/v4/seasons/now",
          "Anime Season Ini :"
        );
      } else if (exp.classList.contains("exp-rekomen-anime")) {
        expandList("https://api.jikan.moe/v4/top/anime", "Rekomendasi Anime :");
      } else if (exp.classList.contains("exp-rekomen-manga")) {
        expandList("https://api.jikan.moe/v4/top/manga", "Rekomendasi Manga :");
      }
    });
  });
}

// Render Data
function renderCard(list) {
  let cards = "";

  var maxLength = 25;

  list.forEach((item) => {
    cards += `
      <div id="${item.mal_id}" class="card ${
      item.type == "Manga" ? "manga" : "anime"
    }">
        <div class="card-head">
          <img src="${item.images.webp.image_url}" alt="images" />
        </div>
        <div class="card-body">
          <h3>${
            item.title.length > maxLength
              ? item.title.substring(0, maxLength) + "..."
              : item.title
          }</h3>
          <h4>Skor: ${item.score} <i class="fa-solid fa-star"></i></h4>
        </div>
      </div>`;
  });
  return cards;
}

// Ambil data dari api
function getAPIForHomePage(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.slice(0, 6));
}

function detailAnime(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "./pages/detail-anime.html";
}

function detailManga(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "./pages/detail-manga.html";
}

function expandList(api, judul) {
  localStorage.setItem("url_api", api);
  localStorage.setItem("expand_judul", judul);
  window.location.href = "./pages/expand-list.html";
}

main();
