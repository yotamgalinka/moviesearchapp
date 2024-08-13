// URLs for fetching data from TMDb API
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

// Selecting DOM elements
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Fetch initial list of popular movies
getMovies(API_URL)

// Function to fetch movies from the API
async function getMovies(url) {
    document.getElementById('loading').style.display = 'block'; // Show loading indicator
    const res = await fetch(url); // Fetch data from the API
    const data = await res.json(); // Convert response to JSON
    document.getElementById('loading').style.display = 'none'; // Hide loading indicator

    showMovies(data.results);
}

// Function to display movies on the page
function showMovies(movies) {
    main.innerHTML = ''

    // If no movies found - show an error message
    if (movies.length === 0) {
        main.innerHTML = `<p class="error">No movies found</p>`;
        return;
    }

    // Loop through the movie list and create elements for each movie
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div') // Create a movie element
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl) // Add the movie element to the main container
    })
}

// Function to determine the rating color
function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green' // High rating
    } else if(vote >= 5) {
        return 'orange' // Medium rating
    } else {
        return 'red' // Low rating
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value // Get value from the search input

    // If the search input is not empty, fetch the search results
    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload() // Reload the page if the search input is empty
    }
})
