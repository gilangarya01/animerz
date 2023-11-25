let container = document.querySelector(".container");
let id_item = localStorage.getItem("id_item");

async function main() {
  let detail = await getAPIDetail(id_item);
  container.innerHTML = renderDetail(detail);
}

function getAPIDetail(id) {
  return fetch("https://api.jikan.moe/v4/characters/" + id)
    .then((res) => res.json())
    .then((res) => res.data);
}

function renderDetail(detail) {
  let about = detail.about.replace(/\n/g, "<br>");
  return `
    <h1 class="judul-detail">${detail.name}</h1>
    <div class="detail-head">
      <img
        src="${detail.images.webp.image_url}"
        alt="gambar"
        height="360px"
        width="240px"
      />
      <div class="detail-body">
        <h2>About</h2>
        <p>
            ${about}
        </p>
      </div>
    </div>
  `;
}

main();
