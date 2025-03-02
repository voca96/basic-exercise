import { useMovie } from './hooks/useMovies';
import { MoviesList } from './components/movies';
import './App.css';

function App() {
	const { mappedMovies, getMovies } = useMovie();

	const handleSubmit = (e) => {
		e.preventDefault();
		const { search } = Object.fromEntries(new FormData(e.target));
		getMovies(search);
	};

	return (
		<div>
			<header>
				<h1>Buscador de peliculas</h1>
				<form onSubmit={handleSubmit}>
					<label htmlFor='search'>
						Pelicula
						<input
							name='search'
							type='text'
							placeholder='Avenger, Star Wars ... '
						/>
					</label>
					<button>Buscar</button>
				</form>
			</header>
			<main>
				<MoviesList movies={mappedMovies} />
			</main>
		</div>
	);
}

export default App;
