const animeListCard = document.querySelector(".list-card");
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

async function main() {
  let animeList = await getAPI("https://api.jikan.moe/v4/characters");

  // Tampilkan data ke Halaman HTML
  animeListCard.innerHTML = renderCard(animeList);
  searchButton.addEventListener("click", () => {
    cariDataAnime();
  });
  cardClick();
}

async function cariDataAnime() {
  let cards = "";
  if (searchInput.value.length == 0) {
    return;
  } else {
    let list = await getAPI(
      "https://api.jikan.moe/v4/characters?q=" + searchInput.value
    );
    if (list.length < 1) {
      cards = "<p>--Data tidak ditemukan--</p>";
    } else {
      cards = renderCard(list);
    }
  }
  animeListCard.innerHTML = cards;
  cardClick();
}

function cardClick() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      detailChara(card.id);
    });
  });
}

// Render Data
function renderCard(list) {
  let cards = "";

  var maxLength = 25;

  list.forEach((item) => {
    cards += `
        <div id="${item.mal_id}" class="card">
          <div class="card-head">
            <img src="${item.images.webp.image_url}" alt="images" />
          </div>
          <div class="card-body">
            <h3>${
              item.name.length > maxLength
                ? item.name.substring(0, maxLength) + "..."
                : item.name
            }</h3>
            <h4>Favorite: ${
              item.favorites
            } <i class="fa-solid fa-heart"></i></h4>
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

function detailChara(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "./detail-character.html";
}

main();
