const DIVISIONS = [];
const divisionContainer = document.querySelector(".main");
const header = document.querySelector(".header");
const text = document.querySelector(".text");
const errorText = document.querySelector(".error");
const section = document.querySelector(".section");
const searchElem = document.querySelector(".search");
const container = document.querySelector(".division-container");
const searchInput = document.querySelector("#division");
const endpoint = `https://emajency.com/js/numbers.json`;

async function getDivisions() {
  try {
    const name = await fetch(endpoint);
    if(name.status!==200){
      return displayError()
    }
    const divisions = await name.json();
    DIVISIONS.push(...divisions);
    bootstrapHTML(DIVISIONS);
  } catch (error) {
    console.log(error);
  }
}

function displayError() {
  const message = `Failed to load divisions. Check network connection and try again`;
  section.style.display = "none";
  errorText.textContent = message;
}

function bootstrapHTML(arr) {
  section.style.display = "none";
  const html = arr
    .map((elem) => {
      const name = elem.name;
      const number = elem.number;
      return `<div class="division-container" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Phone number: <span class="text">${number}</span></p>
      </div>
      <div class="call-body">
        <a href="tel:${number}"> <i class="fas fa-phone fa-2x"></i> </a>
      </div>
    </div>
        `;
    })
    .join("");
  divisionContainer.innerHTML = html;
  searchElem.style.display = "flex";
}

function findMatches(wordToMatch, divisions) {
  return divisions.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.name.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, DIVISIONS);
  bootstrapHTML(matchArray);
}

setTimeout(() => {
  getDivisions();
}, 2000);

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
