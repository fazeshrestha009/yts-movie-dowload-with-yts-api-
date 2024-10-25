const apiURL = 'https://yts.mx/api/v2/';

async function fetchMoviesList() {
    try {
        const response = await axios.get(`${apiURL}list_movies.json`);
        console.log(response.data); 
        const movies = response.data.data.movies;
        const popularMovies = movies.slice(0, 4);  
        const latestMovies = movies.slice(4, 12);  
        const upcomingMovies = movies.slice(12, 20); 
        console.log({ popularMovies, latestMovies, upcomingMovies }); 
        renderMovies('popular-movies', popularMovies);
        renderMovies('latest-movies', latestMovies);
        renderMovies('upcoming-movies', upcomingMovies);
    } catch (error) {
        console.error("Error fetching movies list:", error);
        alert("There was an error fetching the movies. Please try again later.");
    }
}
function renderMovies(sectionId, moviesArray) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.innerHTML = moviesArray.map(movie => generateMovieHTML(movie)).join('');
    } else {
        console.warn(`Section with ID ${sectionId} not found.`);
    }
}
function generateMovieHTML(movie) {
    return `
        <div class="movie">
            <img src="${movie.medium_cover_image}" alt="${movie.title}">
            <div class="movie-details">
                <div class="rating">
                    <span class="star">★</span> ${movie.rating} / 10
                </div>
                ${movie.genres ? movie.genres.map(genre => `<p>${genre}</p>`).join('') : ''}
                <a href="movie-details.html?id=${movie.id}" class="details-btn">View Details</a>
            </div>
            <p class="movie-title">${movie.title}</p>
        </div>
    `;
}

async function fetchMovieDetails(movieId) {
    try {
        const response = await axios.get(`${apiURL}movie_details.json?movie_id=${movieId}`);
        const movie = response.data.data.movie;
        document.getElementById('movieTitle').textContent = movie.title;
        document.getElementById('moviePoster').src = movie.medium_cover_image;
        document.getElementById('movieDescription').textContent = movie.description_full;
        document.getElementById('movieRating').textContent = `${movie.rating} / 10`;
        document.getElementById('movieGenres').innerHTML = movie.genres && movie.genres.length > 0
            ? movie.genres.map(genre => `<span>${genre}</span>`).join(', ')
            : 'Genre not available';
    } catch (error) {
        console.error("Error fetching movie details:", error);
    }
}
async function searchMovies(query) {
    try {
        const response = await axios.get(`${apiURL}list_movies.json?query_term=${query}`);
        return response.data.data.movies; 
    } catch (error) {
        console.error("Error searching movies:", error);
        return []; 
    }
}

async function filterMovies() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';

    if (searchInput) {
        const filteredMovies = await searchMovies(searchInput);
        if (filteredMovies && filteredMovies.length > 0) {
            dropdown.style.display = 'block';
            filteredMovies.forEach(movie => {
                const movieItem = document.createElement('div');
                movieItem.classList.add('dropdown-item');
                movieItem.innerHTML = `
                    <img src="${movie.medium_cover_image}" alt="${movie.title}">
                    <span>${movie.title}</span>
                `; 
                movieItem.addEventListener('click', () => {
                    window.location.href = `movie-details.html?id=${movie.id}`; 
                });
                dropdown.appendChild(movieItem);
            });
        } else {
            dropdown.style.display = 'none';
            alert('No movies found for your search.');
        }
    } else {
        dropdown.style.display = 'none';
    }
}
fetchMoviesList();
document.getElementById('searchInput').addEventListener('input', filterMovies);
