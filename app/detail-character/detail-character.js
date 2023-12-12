import { getAPIDetail } from "/app/base/utils.js";

let mainElement = document.querySelector("main");
let id_item = localStorage.getItem("id_item");

async function main() {
  let detail = await getAPIDetail(id_item, "characters");
  mainElement.innerHTML = renderDetail(detail);
}

function renderDetail(detail) {
  let about = detail.about.replace(/\n/g, "<br>");

  return `
  <div class="title-area">
        <h4>${detail.name}</h4>
      </div>
      <div class="container">
        <img
          src="${detail.images.webp.image_url}"
          alt="image"
          class="img-thumbnail"
        />
        <div class="detail-area">
          <h4><i class="fa-solid fa-heart"></i> ${formatNumber(
            detail.favorites
          )}</h4>
          <h4>Nama Kanji: ${detail.name_kanji}</h4>
          <h4>About</h4>
        <p>${about}</p>
        </div>
      </div>
  `;
}

function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

main();
