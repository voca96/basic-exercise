import { useState } from 'react';

import { useRef } from 'react';
import { getMoviesService } from '../services/getMovies';

export function useMovie() {
	const [movies, setMovies] = useState([]);
	const [sort, setSort] = useState(false);
	const lastSearch = useRef('');

	// ACA SE VUELVE A CREAR CADA VEZ QUE EL SORT CAMBIA SIN NINGUN TIPO DE SENTIDO YA QUE ESTA FUNCION NO DEPENDE DEL SORT
	async function getMovies(search) {
		if (search === lastSearch.current) return;
		lastSearch.current = search;
		const movies = await getMoviesService(search);
		setMovies(movies);
	}

	const sortedMovies = sort
		? [...movies].sort((a, b) => a.title.localeCompare(b.title))
		: movies;

	return { movies: sortedMovies, getMovies, setSort };
}
