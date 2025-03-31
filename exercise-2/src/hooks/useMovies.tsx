import { useCallback, useState } from 'react';

import { useRef } from 'react';
import { getMoviesService, movieType } from '../services/getMovies';

export function useMovie() {
	const [movies, setMovies] = useState<movieType[]>([]);
	const [sort, setSort] = useState(false);
	const lastSearch = useRef('');

	// Storage comsuption
	const getMovies = useCallback(async (search: string) => {
		if (search === lastSearch.current || search === '') return;
		lastSearch.current = search;
		const movies = await getMoviesService(search.trim());
		if (movies) setMovies(movies);
	}, []);

	const sortedMovies = sort
		? [...movies].sort((a, b) => a.title.localeCompare(b.title))
		: movies;

	return { movies: sortedMovies, getMovies, setSort };
}
