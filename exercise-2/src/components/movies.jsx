function MovieToShow({ movies }) {
	return (
		<>
			<h2>Lista de peliculas</h2>
			<ul>
				{movies?.map((movie) => {
					return (
						<li key={movie.id}>
							<img
								src={movie.poster}
								alt={`Poster of ${movie.title}`}
							/>
							<h3>{movie.title}</h3>
							<p>{movie.year}</p>
						</li>
					);
				})}
			</ul>
		</>
	);
}

function NoMoviesToShow() {
	return <p>No se encontraron resultados para esta busqueda</p>;
}

export function MoviesList({ movies }) {
	return movies.length > 0 ? (
		<MovieToShow movies={movies} />
	) : (
		<NoMoviesToShow />
	);
}
