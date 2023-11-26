let listAnime = localStorage.getItem("anime_saved");
let listManga = localStorage.getItem("manga_saved");
listAnime = JSON.parse(listAnime);
listManga = JSON.parse(listManga);

const animeListCard = document.getElementById("animeku");
const mangaListCard = document.getElementById("mangaku");

async function main() {
  let animeDatas = new Array();
  let mangaDatas = new Array();

  if (listAnime != null) {
    animeDatas = await Promise.all(
      listAnime.map(async (id) => {
        let data = await getAPI("https://api.jikan.moe/v4/anime/" + id);
        return data;
      })
    );
  }

  if (listManga != null) {
    mangaDatas = await Promise.all(
      listManga.map(async (id) => {
        let data = await getAPI("https://api.jikan.moe/v4/manga/" + id);
        return data;
      })
    );
  }

  animeListCard.innerHTML = renderCard(animeDatas);
  mangaListCard.innerHTML = renderCard(mangaDatas);

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
}

// Render Data
function renderCard(list) {
  let cards = "";
  var maxLength = 25;

  if (list.length == 0) {
    return "<p>Data tidak ditemukan</p>";
  }

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
function getAPI(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);
}

function detailAnime(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "./detail-anime.html";
}

function detailManga(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "./detail-manga.html";
}

main();
