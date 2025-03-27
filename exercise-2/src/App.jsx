import { useMovie } from './hooks/useMovies';
import { useDebounce } from './hooks/useDebounce';
import { MoviesList } from './components/movies';
import './App.css';
import { useEffect } from 'react';

function App() {
	const { movies, getMovies, setSort } = useMovie();
	const [debounce, clearDebounce] = useDebounce();

	const handleChange = (e) => {
		debounce(() => {
			getMovies(e.target.value);
		}, 450);
	};

	const handleChangeSort = () => {
		setSort((prev) => !prev);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearDebounce();
		const { search } = Object.fromEntries(new FormData(e.target));
		getMovies(search);
	};

	useEffect(() => {
		console.log('eeeee');
	}, [debounce, clearDebounce]);

	return (
		<div>
			<header>
				<h1>Buscador de películas</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='search'>
						Película
						<input
							name='search'
							type='text'
							placeholder='Avenger, Star Wars ... '
							onChange={handleChange}
						/>
					</label>
					<label htmlFor='sorted'>
						Ordenar por nombre
						<input
							type='checkbox'
							name='sorted'
							onChange={handleChangeSort}
						/>
					</label>
					<button>Buscar</button>
				</form>
			</header>
			<main>
				<MoviesList movies={movies} />
			</main>
		</div>
	);
}

export default App;
