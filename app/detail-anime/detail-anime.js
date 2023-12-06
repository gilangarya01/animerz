import { getAPIDetail, addBookmark } from "/app/base/utils.js";

let mainElement = document.querySelector("main");
let id_item = localStorage.getItem("id_item");

async function main() {
  let detail = await getAPIDetail(id_item, "anime");
  mainElement.innerHTML = renderDetail(detail);

  const addButton = document.querySelectorAll(".add-bookmark-anime");
  addButton.forEach((add) => {
    add.addEventListener("click", () => {
      addBookmark(add.id, "anime");
    });
  });
}

function renderDetail(detail) {
  let gen = "";
  detail.genres.forEach((genre) => {
    gen += `<h6>- ${genre.name}</h6>`;
  });
  let synopsis = detail.synopsis.replace(/\n/g, "<br>");

  return `
  <div class="title-area">
        <h4>${detail.title}</h4>
      </div>
      <div class="container">
        <img
          src="${detail.images.webp.image_url}"
          alt="image"
          class="img-thumbnail"
        />
        <div class="detail-area">
          <h4><i class="fa-solid fa-star"></i> ${detail.score}</h4>
          <h4>${detail.season} (${detail.year})</h4>
          <h5>Type: ${detail.type}</h5>
          <h5>${detail.episodes} Episodes (${detail.duration})</h5>
          <h5>${detail.rating}</h5>
          <h5>Genre:</h5>
          ${gen}
          <button id="${detail.mal_id}" class="add-bookmark add-bookmark-anime">
            <i class="fa-solid fa-plus"></i> Add to bookmark
          </button>
        </div>
      </div>
      <hr />
      <div class="synopsis-trailer">
        <div class="synopsis">
          <h4>Synopsis</h4>
          <p>${synopsis}</p>
        </div>
        <div class="trailer">
          <h4>Trailer</h4>
          <iframe
            src="https://www.youtube.com/embed/${detail.trailer.youtube_id}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
  `;
}

main();
