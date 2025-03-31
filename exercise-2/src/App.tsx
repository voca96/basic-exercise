import { useMovie } from './hooks/useMovies';
import { useDebounce } from './hooks/useDebounce';
import { MoviesList } from './components/movies';
import './App.css';

function App() {
	const { movies, getMovies, setSort } = useMovie();
	const [debounce, clearDebounce] = useDebounce();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounce(() => {
			getMovies(e.target.value);
		}, 450);
	};

	const handleChangeSort = () => {
		setSort((prev) => !prev);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		clearDebounce();
		const { search } = Object.fromEntries(new FormData(e.currentTarget));
		getMovies(search.toString());
	};

	return (
		<div>
			<header>
				<h1>Buscador de películas</h1>
				<form
					onSubmit={handleSubmit}
					aria-label='search movie'
				>
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
