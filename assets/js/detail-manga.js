let container = document.querySelector(".container");
let id_item = localStorage.getItem("id_item");

async function main() {
  let detail = await getAPIDetail(id_item);
  container.innerHTML = renderDetail(detail);

  const addButton = document.querySelectorAll(".add-bookmark-anime");
  addButton.forEach((add) => {
    add.addEventListener("click", () => {
      addBookmark(add.id);
    });
  });
}

function addBookmark(id) {
  let id_array;
  console.log(id);
  if (localStorage.getItem("manga_saved")) {
    arr = localStorage.getItem("manga_saved");
    arr = JSON.parse(arr);

    if (!arr.includes(id)) {
      arr.push(id);
    }

    id_array = JSON.stringify(arr);
  } else {
    arr = [id];
    id_array = JSON.stringify(arr);
  }
  localStorage.setItem("manga_saved", id_array);
  window.location.href = "";
}

function getAPIDetail(id) {
  return fetch("https://api.jikan.moe/v4/manga/" + id)
    .then((res) => res.json())
    .then((res) => res.data);
}

function renderDetail(detail) {
  let gen = "";
  detail.genres.forEach((genre) => {
    gen += `<p>- ${genre.name}</p>`;
  });
  let synopsis = detail.synopsis.replace(/\n/g, "<br>");

  return `
    <h1 class="judul-detail">${detail.title}</h1>
    <div class="detail-head">
      <img
        src="${detail.images.webp.image_url}"
        alt="gambar"
        height="360px"
        width="240px"
      />
      <ul>
        <li>Rating: ${detail.score} <i class="fa-solid fa-star"></i></li>
        <li>Airing: ${detail.published.string}</li>
        <li>Chapter: ${detail.chapters}</li>
        <li>Volume: ${detail.volumes}</li>
        <li>${detail.status}</li>
        <li>Genre: ${gen}</li>
        <button id="${detail.mal_id}" class="add-bookmark add-bookmark-anime"><i class="fa-solid fa-plus"></i></button>
      </ul>
    </div>

    <div class="detail-body">
      <h2>Sinopsis</h2>
      <p>
        ${synopsis}
      </p>
    </div>
  `;
}

main();
