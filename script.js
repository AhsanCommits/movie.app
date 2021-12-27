const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d46ab8283fae64bed5ecb94e4908727&page=1&page=2&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const IMG_PATH_SMALL = 'https://image.tmdb.org/t/p/w300';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=6d46ab8283fae64bed5ecb94e4908727&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const movieClicked = document.querySelector('#div');
const body = document.getElementsByTagName('body');
const textOfSmall = document.getElementById('text');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const {
      original_language,
      backdrop_path,
      release_date,
      vote_count,
      title,
      poster_path,
      vote_average,
      overview,
    } = movie;

    const movieEl = document.createElement('div');

    movieEl.innerHTML = `<div class="movie">
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>`;

    main.appendChild(movieEl);

    movieEl.addEventListener('click', () => {
      textOfSmall.innerHTML = `<small id="text" onclick="window.location.reload()"
        >Back To Home</small
      >`;
      movieClicked.classList.toggle('active');
      main.classList.toggle('active');
      movieClicked.innerHTML = `<div class="movie-clicked" style="background: url(${IMG_PATH + backdrop_path
        }) no-repeat center center/cover"><div class="movie-img" style="background: url(${IMG_PATH_SMALL + poster_path
        })"></div>
      <div class="movie-text">
        <div class="movie-title">
          <h1>${title}</h1>
        </div>
        <div class="movie-features">
          <div class="feature">
  <div class="value" style="border: 4px solid ${getBorderColorByRate(
          vote_average * 10
        )}">${vote_average * 10} %</div>
            <div class="text">User Score</div>
          </div>
          <div class="feature">
            <div class="value" style="border: 4px solid ${getBorderColorByRate(
          vote_average * 10
        )}">${release_date.slice(0, 4)}</div>
            <div class="text">Year</div>
          </div>
          <div class="feature">
            <div class="value" style="border: 4px solid ${getBorderColorByRate(
          vote_average * 10
        )}">${vote_count}</div>
            <div class="text">Votes</div>
          </div>
          <div class="feature">
            <div class="value" style="border: 4px solid ${getBorderColorByRate(
          vote_average * 10
        )}">${original_language.toUpperCase()}</div>
            <div class="text">Language</div>
          </div>
        </div>
      </div>
      </div>`;
    });
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function getBorderColorByRate(vote) {
  if (vote >= 80) {
    return 'green';
  } else if (vote >= 50) {
    return 'orange';
  } else {
    return 'red';
  }
}
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
