const apiURL = 'https://yts.mx/api/v2/';
let currentMovie = {};

async function fetchMovieDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    try {
        const response = await axios.get(`${apiURL}movie_details.json?movie_id=${movieId}`);
        const movie = response.data.data.movie;
        const sampleDescription = "A gripping tale of intrigue and suspense, this movie follows the journey of a young detective as he uncovers layers of deception and faces insurmountable odds. With every twist and turn, viewers are drawn deeper into the mystery, making it a thrilling experience from start to finish.";
        const originalPrice = 2000.00;
        const discount = 0.20;
        const discountedPrice = originalPrice * (1 - discount);
        document.getElementById('movieTitle').innerText = movie.title;
        document.getElementById('moviePoster').src = movie.medium_cover_image;
        document.getElementById('movieDescription').innerText = movie.description_full || sampleDescription;
        document.getElementById('movieRating').innerText = `${movie.rating} / 10`;
        document.getElementById('movieGenres').innerHTML = movie.genres && movie.genres.length > 0
            ? movie.genres.map(genre => `<span>${genre}</span>`).join(', ')
            : 'Genre not available';
        document.getElementById('moviePrice').innerText = `₨${originalPrice.toFixed(2)}`;
        document.getElementById('discountedPrice').innerText = `₨${discountedPrice.toFixed(2)}`;
        currentMovie = {
            id: movie.id,
            title: movie.title,
            poster: movie.medium_cover_image,
            rating: movie.rating,
            description: movie.description_full || sampleDescription,
            genres: movie.genres,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice
        };

    } catch (error) {
        console.error("Error fetching movie details:", error);
        alert("Error fetching movie details. Please try again later.");
    }
}
function addToCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingMovie = cart.find(item => item.id === currentMovie.id);

    if (existingMovie) {
        const goToCheckout = confirm("This movie is already in the cart. Would you like to go to the checkout page?");
        if (goToCheckout) {
            window.location.href = 'checkout.html';
        }
    } else {
        cart.push(currentMovie);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Movie added to cart!");
        window.location.href = 'checkout.html';
    }
}
fetchMovieDetails();
document.getElementById('addToCartBtn').addEventListener('click', addToCart);
