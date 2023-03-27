const searchBtn = document.getElementById("search__btn");
const movieList = document.getElementById("movies");
const input = document.getElementById("search__input");
const searchInput = document.getElementById("search__input");
searchBtn.addEventListener("click", getMovieList);

searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault(); // prevent form submission
    getMovieList();
  }
});

async function getMovieList() {
  let searchInputTxt = document.getElementById("search__input").value.trim();
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=4d79dfe6&s=${searchInputTxt || undefined}`
  );
  const moviesData = await movies.json();
  movieList.innerHTML = moviesData.Search?.slice(0, 8)
    .map((movie) => MovieList(movie))
    .join("");

  function MovieList(movie) {
    return `<div class="movie" id="movies" data-id = ${movie.imdbID}>
                        <figure class="movie__img--wrapper">
                            <img src="${movie.Poster}" class="movie__img">
                        </figure>
                        <div class="movie__title">
                            ${movie.Title}
                        </div>
                        <div class="movie__year">
                            <p>${movie.Year}</p>
                        </div>
                    </div>`;
  }
}

getMovieList();
