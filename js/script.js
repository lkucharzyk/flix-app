

const state ={
    currentPage: window.location.pathname

}

//highlight active link

function highlightActiveLink(){
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link =>{
        if(link.getAttribute('href') === state.currentPage){
            link.classList.add('active');
        } 
    })
}

async function fetchAPIData(endpoint){
    const APIKey = '9bdba24599e2e9c77fcd3fd09d83c7eb';
    const APIURL = 'https://api.themoviedb.org/3/';
    showSpinner();
    
    const res = await fetch(`${APIURL}${endpoint}?api_key=${APIKey}&language=pl-PL`);
    const data = await res.json();

    hideSpinner();
    return data;
}



async function displayPopularMovies(){
    const { results } = await fetchAPIData('movie/popular');
    results.forEach(movie =>{
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML = `<a href="movie-details.html?id=${movie.id}">
        <img
        ${
            movie.poster_path ? 
         `src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"`:

          ` src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.name}"`
        }
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>`
      document.querySelector('#popular-movies').appendChild(movieCard);
    })
}

async function displayPopularShows(){
    const { results } = await fetchAPIData('tv/popular');
    console.log(results);
    results.forEach(movie =>{
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML = `<a href="tv-details.html?id=${movie.id}">
        <img
        ${
            movie.poster_path ? 
         `src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.name}"`:

          ` src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.name}"`
        }
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air date: ${movie.first_air_date}</small>
        </p>
      </div>`
      document.querySelector('#popular-shows').appendChild(movieCard);
    })
}

async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];
    const results = await fetchAPIData('movie/' + movieId);

    const div = document.createElement('div');
    div.setAttribute('id', 'movie-details');
    div.innerHTML = `<div class="details-top">
    <div>
    <img
    ${
        results.poster_path ? 
     `src="https://image.tmdb.org/t/p/w500${results.poster_path}"
      class="card-img-top"
      alt="${results.title}"`:

      ` src="images/no-image.jpg"
          class="card-img-top"
          alt="${results.title}"`
    }
    >
    </div>
    <div>
      <h2>${results.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${results.vote_average.toFixed(2)}
      </p>
      <p class="text-muted">Release Date: ${results.release_date}</p>
      <p>
        ${results.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${results.genres.map((genre)=> `<li>${genre.name}</li>`).join('')}
      </ul>
      ${ results.homepage ? 
        `<a href="${results.homepage }" target="_blank" class="btn">Visit Movie Homepage</a>` : ''
      }
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${results.budget}</li>
      <li><span class="text-secondary">Revenue:</span> $${results.revenue}</li>
      <li><span class="text-secondary">Runtime:</span> ${results.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${results.status} </li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${results.production_companies.map(company => company.name).join(', ')}
    </div>
  </div>
  </div>
  `;
    document.querySelector('.main').appendChild(div);
    displayBackgroundImage('movie', results.backdrop_path);
}

function displayBackgroundImage(type, path){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie'){
       document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
  
    const show = await fetchAPIData(`tv/${showId}`);
  
    // Overlay for background image
    
    const div = document.createElement('div');
  
    div.innerHTML = `
    <div class="details-top">
    <div>
    ${
      show.poster_path
        ? `<img
      src="https://image.tmdb.org/t/p/w500${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />`
        : `<img
    src="../images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />`
    }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
      }</li>
      <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
      }</li>
      <li><span class="text-secondary">Status:</span> ${show.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
    </div>
  </div>
    `;
    div.setAttribute('id', 'show-details');
    document.querySelector('.main').appendChild(div);
    displayBackgroundImage('tv', show.backdrop_path);
  
  }

function displayBackgroundImage(type, path){
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie'){
       document.querySelector('#movie-details').appendChild(overlayDiv);
    }else{
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

function showSpinner(){
    const spinnner = document.querySelector('.spinner');
    spinnner.classList.add('show');
}

function hideSpinner(){
    const spinnner = document.querySelector('.spinner');
    spinnner.classList.remove('show');
}

function init(){
    switch (state.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
        break;
        case '/shows.html':
            displayPopularShows();
        break;
        case '/movie-details.html':
            displayMovieDetails();
        break;
        case '/tv-details.html':
            displayShowDetails();
        break;
        case 'search.html':

        break;
    }
    highlightActiveLink()
    
}

document.addEventListener('DOMContentLoaded', init);