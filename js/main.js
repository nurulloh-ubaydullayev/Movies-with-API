const elMoviesList = document.querySelector(".list");
const elMoviesTemplate = document.querySelector("#movie__template").content;
const elMoviesForm = document.querySelector(".movies__form");
const elMoviesInput = document.querySelector(".movies__input");
const elMovieSelect = elMoviesForm.querySelector(".movie__type");

const API_KEY = "5a1d6773";

let page = 1;
let searchQuery = "shazam";

const elPrevBtn = document.querySelector(".prev-btn");
const elNextBtn = document.querySelector(".next-btn");

// fetch("https://www.omdbapi.com/?apikey=" + API_KEY + "&s=hulk&page=1")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

elMoviesForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  // console.log(elMovieSelect.value);
  fetchMovies(elMovieSelect.value);
});

function renderMovies(arr, element, type) {
  element.innerHTML = null;

  const movieFragment = document.createDocumentFragment();

  if (type === "series") {
    element.innerHTML = null;

    const typesArr = arr.filter((item) => item.Type === "series");

    typesArr.forEach((row) => {
      const movieTemplate = elMoviesTemplate.cloneNode(true);

      movieTemplate.querySelector(".movie__img").src = row.Poster;
      movieTemplate.querySelector(".movie__img").alt = row.Title;

      movieTemplate.querySelector(".movie__img").onerror = (evt) => {
        evt.target.src = "https://via.placeholder.com/100x150";
      };

      movieTemplate.querySelector(".movie__title").textContent = row.Title;
      movieTemplate.querySelector(".movie__type").textContent = row.Type;
      movieTemplate.querySelector(".movie__year").textContent = row.Year;
      movieTemplate.querySelector(".movie__imdbid").textContent = row.imdbID;

      movieFragment.appendChild(movieTemplate);
    });
  } else if (type === "movie") {
    element.innerHTML = null;

    const typesArr = arr.filter((item) => item.Type === "movie");

    typesArr.forEach((row) => {
      const movieTemplate = elMoviesTemplate.cloneNode(true);

      movieTemplate.querySelector(".movie__img").src = row.Poster;
      movieTemplate.querySelector(".movie__img").alt = row.Title;

      movieTemplate.querySelector(".movie__img").onerror = (evt) => {
        evt.target.src = "https://via.placeholder.com/100x150";
      };

      movieTemplate.querySelector(".movie__title").textContent = row.Title;
      movieTemplate.querySelector(".movie__type").textContent = row.Type;
      movieTemplate.querySelector(".movie__year").textContent = row.Year;
      movieTemplate.querySelector(".movie__imdbid").textContent = row.imdbID;

      movieFragment.appendChild(movieTemplate);
    });
  } else {
    arr.forEach((row) => {
      const movieTemplate = elMoviesTemplate.cloneNode(true);

      movieTemplate.querySelector(".movie__img").src = row.Poster;
      movieTemplate.querySelector(".movie__img").alt = row.Title;

      movieTemplate.querySelector(".movie__img").onerror = (evt) => {
        evt.target.src = "https://via.placeholder.com/100x150";
      };

      movieTemplate.querySelector(".movie__title").textContent = row.Title;
      movieTemplate.querySelector(".movie__type").textContent = row.Type;
      movieTemplate.querySelector(".movie__year").textContent = row.Year;
      movieTemplate.querySelector(".movie__imdbid").textContent = row.imdbID;

      movieFragment.appendChild(movieTemplate);
    });
  }

  element.appendChild(movieFragment);
}

async function fetchMovies(type) {
  try {
    elMoviesList.innerHTML = "<img src='./images/spinner.svg' alt='Spinner' />";
    const response = await fetch(
      "https://www.omdbapi.com/?apikey=" +
        API_KEY +
        "&s=" +
        searchQuery +
        "&page=" +
        page
    );

    const data = await response.json();
    if (data.Search.length) {
      renderMovies(data.Search, elMoviesList, type);
    }

    if (page <= 1) {
      elPrevBtn.disabled = true;
    } else {
      elPrevBtn.disabled = false;
    }

    const lastPage = Math.ceil(data.totalResults / 10);

    if (page === lastPage) {
      elNextBtn.disabled = true;
    } else {
      elNextBtn.disabled = false;
    }
  } catch (err) {
    // console.error("error", err);
  }
}

elPrevBtn.addEventListener("click", (evt) => {
  page--;
  fetchMovies(elMovieSelect.value);
});
elNextBtn.addEventListener("click", (evt) => {
  page++;
  fetchMovies(elMovieSelect.value);
});

elMoviesInput.addEventListener("change", (evt) => {
  searchQuery = evt.target.value.trim();
  fetchMovies();
});

fetchMovies();
