import { useMovie } from './hooks/useMovies';
import { MoviesList } from './components/movies';
import { useRef } from 'react';
import './App.css';

function App() {
	const { movies, getMovies, setSort } = useMovie();

	const debounce = useRef(null);
	// PUNTO EXTRA NUMERO TRES ES MUY INEFICIENTE HACE MUCHAS LLAMASDAS A LA API
	// const handleChange = (e) => {
	// 	getMovies(e.target.value);
	// };

	const handleChange = (e) => {
		// Debounce
		clearTimeout(debounce.current);

		debounce.current = setTimeout(() => {
			getMovies(e.target.value);
		}, 450);
	};

	const handleChangeSort = () => {
		setSort((prev) => !prev);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		clearTimeout(debounce.current);
		const { search } = Object.fromEntries(new FormData(e.target));
		getMovies(search);
	};

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
