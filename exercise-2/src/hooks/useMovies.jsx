import { useCallback, useState } from 'react';

import { useRef } from 'react';
import { getMoviesService } from '../services/getMovies';

export function useMovie() {
	const [movies, setMovies] = useState([]);
	const [sort, setSort] = useState(false);
	const lastSearch = useRef('');

	// Storage comsuption
	const getMovies = useCallback(async (search) => {
		if (search === lastSearch.current || search === '') return;
		console.log('me volvi a llamar');
		lastSearch.current = search;
		const movies = await getMoviesService(search.trim());
		setMovies(movies);
	}, []);

	console.log('movies');
	const sortedMovies = sort
		? [...movies].sort((a, b) => a.title.localeCompare(b.title))
		: movies;

	return { movies: sortedMovies, getMovies, setSort };
}
