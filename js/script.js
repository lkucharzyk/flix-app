

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
    const APIKey = 'placeholder';
    const APIURL = 'https://api.themoviedb.org/3/';
    
    const res = await fetch(`${APIURL}${endpoint}?api_key=${APIKey}&language=pl-PL`);
    const data = await res.json();

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
              alt="Movie Title"`
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


function init(){
    switch (state.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
        break;
        case '/shows.html':

        break;
        case '/movie-details.html':

        break;
        case 'tv-details.html':

        break;
        case 'search.html':

        break;
    }
    highlightActiveLink()
    
}

document.addEventListener('DOMContentLoaded', init);