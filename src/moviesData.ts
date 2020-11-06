const API_BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "31130935abddbbdced16d98fedf5b274";
const MOVIE_IMAGE_BASE_PATH = "https://image.tmdb.org/t/p";

export function getMovieImageURL(
    posterPath: string,
    size: "w500" | "original" = "w500"
): string {
    return `${MOVIE_IMAGE_BASE_PATH}/${size}/${posterPath}`;
}

interface IMovieCategories {
    [key: string]: {
        fetchURL: string;
        headline: string;
    };
}

export const movieCategories: IMovieCategories = {
    trending: {
        fetchURL: `${API_BASE_PATH}/trending/all/week?api_key=${API_KEY}`,
        headline: "Trending",
    },
    netflixOriginals: {
        fetchURL: `${API_BASE_PATH}/discover/tv?api_key=${API_KEY}&with_networks=213`,
        headline: "Netflix originals",
    },
    topRated: {
        fetchURL: `${API_BASE_PATH}/movie/top_rated?api_key=${API_KEY}`,
        headline: "Top rated",
    },
    actionMovies: {
        fetchURL: `${API_BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=28`,
        headline: "Action",
    },
    comedyMovies: {
        fetchURL: `${API_BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=35`,
        headline: "Comedy",
    },
    horrorMovies: {
        fetchURL: `${API_BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=27`,
        headline: "Horror",
    },
    romanceMovies: {
        fetchURL: `${API_BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
        headline: "Romance",
    },
    documentaryMovies: {
        fetchURL: `${API_BASE_PATH}/discover/movie?api_key=${API_KEY}&with_genres=99`,
        headline: "Documentary",
    },
};
