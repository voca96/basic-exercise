import { API_KEY } from '../config';

type apiMovieType = {
	imdbID: string;
	Title: string;
	Year: string;
	Poster: string;
};

export type movieType = {
	id: string;
	title: string;
	year: string;
	poster: string;
};

function moviesFormat(moviesToFormats: apiMovieType[]): movieType[] {
	return moviesToFormats?.map((movie: apiMovieType) => ({
		id: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
	}));
}

export async function getMoviesService(search: string) {
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
