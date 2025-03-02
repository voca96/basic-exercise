import { API_KEY } from '../config';

function moviesFormat(moviesToFormats) {
	return moviesToFormats?.map((movie) => ({
		id: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
	}));
}

export async function getMoviesService(search) {
	if (search === '') return;

	try {
		const res = await fetch(
			`https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
		);
		const { Search: searchValue } = await res.json();

		if (!searchValue) return [];
		return moviesFormat(searchValue);
	} catch (error) {
		console.error(error);
	}
}
