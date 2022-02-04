// IMPORTS
import genres from './support/genres.js';


// SELECTORS
const mainContainer = document.querySelector('.main-container');
const searchForm = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const crossBtn = document.querySelector('.fa-times');
const searchBtn = document.querySelector('.fa-search');


// API KEY
const API_KEY = 'api_key=c3f2f908e782ed17e19472a6d81712c7';


// EVENTS
searchInput.addEventListener('input', showCrossBtn);

crossBtn.addEventListener('click', clearInput);

searchForm.addEventListener('submit', handleSubmit);

searchBtn.addEventListener('click', handleSearchBtn);


// START - QUERY POPULAR MOVIES
let urlPopular = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&page=1`;
getData(urlPopular);


// FUNCTIONS
async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    //console.log(data.results);
    showData(data.results)
  } catch(e) {
    console.error(e)
  }
};

function showData(results) {
  let result = [];

  for (let movie of results) {
    if (!(movie.poster_path || movie.backdrop_path)) continue;
    let posterSrc = `https://image.tmdb.org/t/p/w342` + (movie.poster_path || movie.backdrop_path);
    let rating = movie.vote_average;
    let ratingColor = getRatingColor(rating);
    let year = movie.release_date.slice(0, 4);
    let tags = buildGenres(movie.genre_ids);

    let card = `
    <div class="movie">

        <div class="movie-front">
          <img src="${posterSrc}" alt="poster">

          <span class="front-rating ${ratingColor}">${rating}</span>
          <h3 class="front-title">${movie.title}</h3>
        </div>

        <div class="movie-back">
          <h3 class="back-title">${movie.title}<span class="year">(${year})</span>
          </h3>
          <div class="back-info">
            <div class="genres">
              ${tags}
            </div>

            <span class="back-rating ${ratingColor}">${rating}</span>
          </div>
          <p class="back-description">
            ${movie.overview}
          </p>
        </div>

      </div>
    `;
    result.push(card);
  };

  mainContainer.innerHTML = '';
  mainContainer.insertAdjacentHTML('beforeend', result.join(' '))
};

function getRatingColor(rating) {
  if (rating >= 7.8) return 'top';
  if (rating >= 5.8) return 'med';
  return 'low';
};

function buildGenres(ids) {
  let result = '';

  for (let id of ids) {
    result += `<span>${genres[id]}</span>`
  }

  return result;
};

function handleSubmit(e) {
  e.preventDefault();
  let val = e.target[0].value;
  let query = val.split(' ').join('+');

  let urlSearch = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${query}`;

  getData(urlSearch);
};

function handleSearchBtn() {
  let val = searchInput.value;
  let query = val.split(' ').join('+');

  let urlSearch = `https://api.themoviedb.org/3/search/movie?${API_KEY}&query=${query}`;

  getData(urlSearch);
}

function showCrossBtn(e) {
  if (e.target.value) {
    crossBtn.classList.remove('hidden')
  } else {
    crossBtn.classList.add('hidden')
  }
};

function clearInput() {
  searchInput.value = '';
  crossBtn.classList.add('hidden');
};