import { useState } from 'react';
import { API_KEY } from '../config';

export function useMovie() {
	const [movies, setMovies] = useState([]);

	// ESTO PUEDE SER PASADO A UN SERVICIO
	const moviesFormat = movies?.map((movie) => ({
		id: movie.imdbID,
		title: movie.Title,
		year: movie.Year,
		poster: movie.Poster,
	}));

	function getMovies(search) {
		fetch(`https://www.omdbapi.com/?s=${search}&page=1&apikey=${API_KEY}`)
			.then((res) => res.json())
			.then(({ Search }) => setMovies(Search));
	}
	// HASTA ACA

	return { mappedMovies: moviesFormat, getMovies };
}

//   sortedMovies= sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
