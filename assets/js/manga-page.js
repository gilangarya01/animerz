const animeListCard = document.querySelector(".list-card");
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

async function main() {
  let animeList = await getAPI("https://api.jikan.moe/v4/manga");

  // Tampilkan data ke Halaman HTML
  animeListCard.innerHTML = renderCard(animeList);
  searchButton.addEventListener("click", () => {
    cariDataAnime();
  });

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

async function cariDataAnime() {
  let cards = "";
  if (searchInput.value.length == 0) {
    return;
  } else {
    let list = await getAPI(
      "https://api.jikan.moe/v4/manga?q=" + searchInput.value
    );
    if (list.length < 1) {
      cards = "<p>--Data tidak ditemukan--</p>";
    } else {
      cards = renderCard(list);
    }
  }
  animeListCard.innerHTML = cards;
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
