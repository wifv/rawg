const exampleBlock = `
<div class="block game-card">
	<img src="" alt="no image or bad connection">
	<div class="bottom">
		<p></p>
		<div class="plus">
			<h5 class="plus-direct-child">+</h5>
			<h5>no data</h5>
		</div>
	</div>
	<div class="active-block">
    <h4></h4>
    <h4></h4>
    <div class="show-more-button">
      Show more like this
      <img src="./images/right.svg">
    </div>
	</div>
</div>`;
const key = "73d26e50a7cf40d7a5ce139d275e2bfc";
const basicUrl = "https://api.rawg.io/api/games";
const input = document.getElementById("search");
const calendarElement = document.getElementById("calendar");
const monthsElement = document.getElementById("months");
const months = document.getElementsByClassName("month")
const blocksContainer = document.getElementById("blocks-container");
const blocks = document.getElementsByClassName("block");
const bestOfYearElement = document.getElementById("best-of-year");
const bestOfLastYearElement = document.getElementById("best-of-last-year");
const top250Element = document.getElementById("top-250");
const searchWrapper = document.querySelector(".search-wrapper");
const dropwdownList = document.querySelector(".dropdown_list");
const notFound = document.querySelector(".not_found_res");
const listItem = document.querySelector(".dropdown_list_item");
const listItemText = document.querySelector(".list_item_text");
const list_item_image = document.querySelector(".list_item_image");
const loader = document.querySelectorAll(".loader");
const searchIcon = document.querySelector("#search-icon");
const searchIconBlack = document.querySelector("#search-icon_black");
let clickedCategory = "Home";
document.querySelector("html").addEventListener("click", (e) => {
  if (
    e.target !== searchWrapper &&
    e.target !== input &&
    e.target !== searchIcon &&
    e.target !== dropwdownList &&
    e.target !== listItem &&
    e.target !== listItemText &&
    e.target !== list_item_image
  ) {
    searchWrapper.style.display = "none";
    dropwdownList.innerHTML = "";
  }
});

const homePage = document.getElementById("home");
const last30 = document.getElementById("last-month");
const this7 = document.getElementById("this-week");
const next7 = document.getElementById("next-week");

let page = 1;
let date = new Date();
date = date.toISOString().split("T")[0];

homePage.addEventListener("click", () => {
  clickedCategory = "Home";
  home();
});
last30.addEventListener("click", () => {
  clickedCategory = "Last 30 Days";
  lastMonth();
});
this7.addEventListener("click", () => {
  clickedCategory = "Last Week";
  thisWeek();
});
next7.addEventListener("click", () => {
  clickedCategory = "Next Week";
  nextWeek();
});

bestOfYearElement.addEventListener("click", () => {
  clickedCategory = "Best Of The Year";
  bestOfYear();
});

bestOfLastYearElement.addEventListener("click", () => {
  clickedCategory = "Best Of The Last Year";
  bestOfLastYear();
});

top250Element.addEventListener("click", () => {
  clickedCategory = "Top 250";
  top250();
});

calendarElement.addEventListener("click", () => {
  clickedCategory = "Release calendar";
  monthsElement.style.display = "flex";
  monthly("00")
});

input.addEventListener("keyup", (key) => {
  let value = key.target.value;

  if (value !== "") {
    input.style.backgroundColor = "white";
    searchIcon.style.display = "none";
    searchIconBlack.style.display = "inline";
    // searchIcon.style.backgroundColor = "black"
    searchIcon.style.fill = "black";
    if (key.key === "Enter") {
      searchWrapper.style = "display: flex";
      dropwdownList.style = "display: flex";
      dropwdownList.innerHTML = "";
      dropwdownList.append(loader[0]);
      loader[0].style.display = "inline-block";
      setTimeout(() => {
        search(value)
          .then(async (res) => {
            try {
              loader[0].style.display = "none";
              let li1 = document.createElement("li");
              let span1 = document.createElement("span");
              if (res.count > 0) {
                li1.innerText = "Games";
                span1.innerHTML = `&ThinSpace; ${res?.count}`;
                span1.className = "game_number";
                li1.className = "dropdown_list_item subheader";
                li1.append(span1);
                dropwdownList.appendChild(li1);

                return res.results.map((game) => {
                  let li = document.createElement("li");
                  let span = document.createElement("span");
                  let p = document.createElement("p");
                  let img = document.createElement("img");

                  img.src = game?.background_image;
                  span;
                  img.className = "list_item_image";
                  img.alt = "game_image";
                  span.className = "additional_layer";
                  p.className = "list_item_text";
                  p.innerText = game?.name;
                  li.className = "dropdown_list_item";
                  li.append(img);
                  li.append(span);
                  li.append(p);
                  return dropwdownList.appendChild(li);
                });
              } else {
                notFound.style.display = "block";
                dropwdownList.style.display = "none";
              }
            } catch (error) {
              notFound.style.display = "none";
              notFound.innerHTML = error.message;
              console.log(error);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            loader[0].style.display = "none";
          });
      }, 5000);
    }
  } else {
    input.style.backgroundColor = "#ffffff29";
    searchWrapper.style.display = "none";
    searchIcon.style.display = "inline";
    searchIconBlack.style.display = "none";
    dropwdownList.style = "display: flex";
  }
});

searchIconBlack.addEventListener("click", () => {
  search(input.value)
    .then(async (res) => {
      try {
        let li1 = document.createElement("li");
        let span1 = document.createElement("span");
        if (res.count > 0) {
          notFound.style.display = "none";
          li1.innerText = "Games";
          span1.innerHTML = `&ThinSpace; ${res?.count}`;
          span1.className = "game_number";
          li1.className = "dropdown_list_item subheader";
          li1.append(span1);
          dropwdownList.appendChild(li1);

          return res.results.map((game) => {
            let li = document.createElement("li");
            let span = document.createElement("span");
            let p = document.createElement("p");
            let img = document.createElement("img");

            img.src = game?.background_image;
            span;
            img.className = "list_item_image";
            img.alt = "game_image";
            span.className = "additional_layer";
            p.className = "list_item_text";
            p.innerText = game?.name;
            li.className = "dropdown_list_item";
            li.append(img);
            li.append(span);
            li.append(p);
            return dropwdownList.appendChild(li);
          });
        } else {
          notFound.style.display = "block";
          dropwdownList.style.display = "none";
        }
      } catch (error) {
        notFound.style.display = "none";
        notFound.innerHTML = error.message;
        console.log(error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

async function home() {
	monthsElement.style.display = "none";

  loader[1].style.display = "block";
  let lastYear = days(365, "-");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${lastYear},${date}&fields=announced,unannounced&ordering=-released-rating&page=${page}`
  );
  const data = await response.json();
  repeatingLoop(data);
}

async function lastMonth() {
	monthsElement.style.display = "none";

  let lastMonth = days(31, "-");
  loader[1].style.display = "block";
  
  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${lastMonth},${date}&fields=released`
    );
    const data = await response.json();
    repeatingLoop(data);
}
  
async function thisWeek() {
  monthsElement.style.display = "none";
  loader[1].style.display = "block";

  let thisWeek = days(7, "-");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${thisWeek},${date}&fields=released`
  );
  const data = await response.json();
  repeatingLoop(data);
}

async function nextWeek() {
	monthsElement.style.display = "none";

  loader[1].style.display = "block";
  let nextWeek = days(7, "+");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${date},${nextWeek}&fields=announced,unanounced`
  );
  const data = await response.json();
  repeatingLoop(data);
}

async function bestOfYear() {
	monthsElement.style.display = "none";

  let date1 = new Date();
  let date2 = new Date();
  loader[1].style.display = "block";
  date2.setFullYear(date1.getFullYear() + 1);
  date2.setMonth("00");
  date2.setDate("01");
  date2 = date2.toISOString().split("T")[0];
  date1 = handleMonths("00");

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${date1},${date2}&page=1&ordering=-rating,-metacritic`
  );
  const data = await response.json();

  repeatingLoop(data);
}

async function bestOfLastYear() {
	monthsElement.style.display = "none";

  let date1 = new Date();
  let date2 = new Date();
  date1.setFullYear(date1.getFullYear() - 1);
  date2.setMonth("00");
  date2.setDate("01");
  date1.setMonth("00");
  date1.setDate("01");
  date2 = date2.toISOString().split("T")[0];
  date1 = date1.toISOString().split("T")[0];
  loader[1].style.display = "block";

  const response = await fetch(
    `${basicUrl}?key=${key}&dates=${date1},${date2}&page=1&ordering=-rating,-metacritic`
  );
  const data = await response.json();
  repeatingLoop(data);
}

async function top250() {
	monthsElement.style.display = "none";

  loader[1].style.display = "block";

  const response = await fetch(
    `${basicUrl}?key=${key}&page=1&page-size=40&ordering=-rating,-metacritic`
  );
  const data = await response.json();
  repeatingLoop(data);
}

function handleMonths(month) {
  let s = new Date();
  
  s.setMonth(month);
  s.setDate(1);
  s = s.toISOString().split("T")[0];
  return s;
}

async function monthly(month) {
	loader[1].style.display = "block";
	let date1 = handleMonths(month);
	let date2 = handleMonths(month + 1)
	const response = await fetch(`${basicUrl}?key=${key}&dates=${date1},${date2}&page=${page}&ordering=-release`);
	const data = await response.json();
	repeatingLoop(data);
}

for(let i = 0; i < 12; i++) {
	months[i].addEventListener("click", () => {
		monthly(months[i].value)
	})
}

const m = document.getElementById('m');

function repeatingLoop(data) {
  m.innerHTML = `<h2 id="category" style="display: inline; position: absolute; top: -30px; left: 4px; font-size: 80px">${clickedCategory}</h2>`;
  blocksContainer.innerHTML = "";
  loader[1].style.display = "none";
  for (let i = 0; i < data.results.length; i++) {
    blocksContainer.innerHTML = blocksContainer.innerHTML + exampleBlock;
    blocks[i].firstElementChild.src = data.results[i].background_image;
    blocks[i].children[1].firstElementChild.innerText = data.results[i].name;
	
    let genres = [];
    for(let j = 0; j < data.results[i].genres.length; j++) {
      genres.push(data.results[i].genres[j].name);
    }
	  blocks[i].lastElementChild.firstElementChild.innerText = "Release date: " + data.results[i].released;
	  blocks[i].lastElementChild.children[1].innerText = `Genres: ${genres}`;
  }

  let a = document.getElementsByClassName("block");
  for (let i = 0; i < a.length; i++) {
    a[i].addEventListener("mouseenter", () => {
      a[i].style.zIndex = 5;
      a[i].lastElementChild.style.zIndex = 5;
      a[i].style.borderBottomLeftRadius = 0;
      a[i].style.borderBottoьRightRadius = 0;
      a[i].lastElementChild.style.display = "flex";
      a[i].style.scale = 1.03;
    });
    a[i].addEventListener("mouseleave", () => {
      a[i].style.zIndex = 1;
      a[i].lastElementChild.style.zIndex = 1;
      a[i].style.scale = 1;
      a[i].style.borderBottomLeftRadius = "10px";
      a[i].style.borderBottoьRightRadius = "10px";
      a[i].lastElementChild.style.display = "none"
    });
  }
}

/** takes
 * @param {number} days amount of days
 * @param {string} sign plus or minus
 * @returns {Date} YYYY-MM-DD format
 *
 * a new Date() incremented or decremented depending
 * on the given sign by given Number (integer)
 */
function days(days, sign) {
  let date = new Date();
  if (sign == "+") {
    const newDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    return newDate.toISOString().split("T")[0];
  }
  if (sign == "-") {
    date.setDate(date.getDate() - days);
  } else {
    return "";
  }
  date = date.toISOString().split("T")[0];
  return date;
}

// Search func

async function search(searchValue) {
  const response = await fetch(
    `${basicUrl}?key=${key}&search=${searchValue}&page=1`
  );
  const data = await response.json();
  return data;
}

home();
