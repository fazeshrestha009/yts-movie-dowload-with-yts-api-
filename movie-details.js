const apiURL = 'https://yts.mx/api/v2/';

async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    try {
        const response = await axios.get(`${apiURL}movie_details.json?movie_id=${movieId}`);
        const movie = response.data.data.movie;
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('moviePoster').src = movie.medium_cover_image;
        document.getElementById('movieDescription').innerText = movie.description_full;
        document.getElementById('movieRating').innerText = `${movie.rating} / 10`;
        document.getElementById('movieGenres').innerHTML = movie.genres && movie.genres.length > 0
            ? movie.genres.map(genre => `<span>${genre}</span>`).join(', ')
            : 'Genre not available';
    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}

fetchMovieDetails();

