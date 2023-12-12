// Ambil data dari api
function getDataFromAPI(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data);
}

// Render Data
function renderCard(list) {
  let cards = "";

  var maxLength = 18;

  list.forEach((item) => {
    cards += `
    <div id="${item.mal_id}" class="card ${
      item.type == "Manga" ? "manga" : "anime"
    }">
    <img
      src="${item.images.webp.image_url}"
      alt="images"
      class="card-image"
    />
    <div class="card-footer">
      <span>${
        item.title.length > maxLength
          ? item.title.substring(0, maxLength) + "..."
          : item.title
      }</span>
    </div>
  </div>`;
  });
  return cards;
}

// Render Data
function renderCardChara(list) {
  let cards = "";

  var maxLength = 25;

  list.forEach((item) => {
    cards += `
    <div id="${item.mal_id}" class="card chara">
    <img
      src="${item.images.webp.image_url}"
      alt="images"
      class="card-image"
    />
    <div class="card-footer">
      <span>${
        item.name.length > maxLength
          ? item.name.substring(0, maxLength) + "..."
          : item.name
      }</span>
    </div>
  </div>`;
  });
  return cards;
}

function goToDetailAnime(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "/app/detail-anime/detail-anime.html";
}

function goToDetailManga(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "/app/detail-manga/detail-manga.html";
}

function goToDetailChara(id) {
  localStorage.setItem("id_item", id);
  window.location.href = "/app/detail-character/detail-character.html";
}

function goToExpandList(api, judul) {
  localStorage.setItem("url_api", api);
  localStorage.setItem("expand_judul", judul);
  window.location.href = "/app/expand-list/expand-list.html";
}

function cardClick(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("manga")) {
        goToDetailManga(card.id);
      } else if (card.classList.contains("chara")) {
        goToDetailChara(card.id);
      } else {
        goToDetailAnime(card.id);
      }
    });
  });
}

function addBookmark(id, type) {
  const storageKey = `${type}_saved`;
  let id_array = [];

  if (localStorage.getItem(storageKey)) {
    id_array = JSON.parse(localStorage.getItem(storageKey));

    if (!id_array.includes(id)) {
      id_array.push(id);
    }
  } else {
    id_array.push(id);
  }

  localStorage.setItem(storageKey, JSON.stringify(id_array));

  window.location.href = "";
}

function getAPIDetail(id, type) {
  return fetch(`https://api.jikan.moe/v4/${type}/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

export {
  getDataFromAPI,
  renderCard,
  renderCardChara,
  goToDetailAnime,
  goToDetailManga,
  goToDetailChara,
  goToExpandList,
  cardClick,
  addBookmark,
  getAPIDetail,
};
