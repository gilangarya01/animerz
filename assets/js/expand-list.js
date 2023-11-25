let urlApiData = localStorage.getItem("url_api");
let expandJudulData = localStorage.getItem("expand_judul");

const expandCard = document.getElementById("expand-card");
const expandJudul = document.getElementById("expand-judul");

async function main() {
  let expandList = await getAPIExpandList(urlApiData);
  expandCard.innerHTML = renderCard(expandList);
  expandJudul.textContent = expandJudulData;

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

function getAPIExpandList(url) {
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
