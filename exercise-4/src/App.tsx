import React, { useState } from 'react';
import './App.css';

type ElementId = `${string}-${string}-${string}-${string}-${string}`;

type ElementType = {
	id: ElementId;
	image: string;
	title?: string;
	description?: string;
	type?: string;
};

interface ModalProps {
	handleClose: (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>,
		movie: Omit<ElementType, 'id'> | null
	) => void;
	movie: Omit<ElementType, 'id'> | null;
}

const getImages = (): ElementType[] => {
	const images = new Array(3).fill(0).map((_, i: number) => {
		return {
			id: crypto.randomUUID(),
			image: `../src/images/images${i + 1}.jpg`,
			type: '',
		};
	});
	return images;
};

interface TierListProps {
	onHandleDrop: (e: React.DragEvent<HTMLDivElement>, type: string) => void;
	type: string;
	data: ElementType[] | null;
}

const TierListCat: React.FC<TierListProps> = ({ onHandleDrop, type, data }) => {
	return (
		<div
			className='tier-list-cat'
			onDragOver={(e) => e.preventDefault()}
			onDragEnter={() => {}}
			onDragLeave={() => {}}
			onDrop={(e) => onHandleDrop(e, type)}
		>
			<div>{type}</div>
			<div>
				{data?.map((e) => {
					return (
						<img
							src={e.image}
							alt=''
						/>
					);
				})}
			</div>
		</div>
	);
};

const Modal: React.FC<ModalProps> = ({ handleClose, movie }) => {
	return (
		<div
			className='modal-back'
			onClick={(e) => handleClose(e, null)}
		>
			<div className='modal'>
				<img
					src={movie?.image}
					alt=''
				/>
				<div>
					<h1>Title</h1>
					<p>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat ad
						iusto et qui repellat in suscipit reprehenderit minima voluptatum
						numquam aperiam, consequatur excepturi perferendis? Quae eum iure
						recusandae amet aperiam.
					</p>
				</div>
			</div>
		</div>
	);
};

// data structure
// the data is more handle complex
//  1[{ type: '', movies: []}, { type: '', movies: []}]

//  this structure has an easy way to update and sort between the diferent lists
// // 2type ElementType = {
// 	id: ElementId;
// 	image: string;
// 	title?: string;
// 	description?: string;
// 	type: string
// };

function App() {
	const [modal, setModal] = useState(false);
	const [movies, setMovies] = useState<ElementType[]>(getImages());
	const [movie, setMovie] = useState<Omit<ElementType, 'id'> | null>(null);
	// const b = ['aa', 'bb', 'cc'] as const;
	// type a = (typeof b)[number];

	const handleClick = (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>,
		movie: Omit<ElementType, 'id'> | null
	) => {
		e.stopPropagation();
		setMovie(movie);
		setModal(!modal);
	};

	const handleDragStart = (
		e: React.DragEvent<HTMLLIElement>,
		movieId: ElementId
	) => {
		e.dataTransfer.clearData();
		console.log(e.dataTransfer.getData('text'));
		e.dataTransfer.setData('text/plain', movieId);
	};
	// const handleDragEnd = () => {};
	// const handleDragEnter = () => {};
	// const handleDragLeave = () => {};
	const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
		const id: ElementId = e.dataTransfer.getData('text') as ElementId; // ... revisar verificar que si sea eso
		const elementIndex = movies.findIndex((elem) => elem.id === id);
		const newMoviesList = [
			...movies.slice(0, elementIndex),
			{ ...movies[elementIndex], type },
			...movies.slice(elementIndex + 1),
		];

		setMovies(newMoviesList);
	};

	return (
		<main>
			<h1>Movie Tierlist</h1>
			<section>
				<TierListCat
					type='buena'
					data={movies.filter((e) => e.type == 'buena')}
					onHandleDrop={handleDragDrop}
				/>
				<TierListCat
					type='mala'
					data={movies.filter((e) => e.type == 'mala')}
					onHandleDrop={handleDragDrop}
				/>
				<TierListCat
					type='horrible'
					data={movies.filter((e) => e.type == 'horrible')}
					onHandleDrop={handleDragDrop}
				/>
				<TierListCat
					type='...'
					data={movies.filter((e) => e.type == '...')}
					onHandleDrop={handleDragDrop}
				/>
				<TierListCat
					type='why does this exist'
					data={movies.filter((e) => e.type == 'why does this exist')}
					onHandleDrop={handleDragDrop}
				/>
			</section>
			<h2>Movies</h2>
			<ul>
				{movies.map(({ id, ...movie }) => {
					return (
						<li
							key={id}
							onClick={(e) => handleClick(e, movie)}
							draggable
							onDragStart={(e) => handleDragStart(e, id)}
							onDragEnd={() => {}}
						>
							<img
								src={movie.image}
								alt=''
							/>
						</li>
					);
				})}
			</ul>

			{modal && (
				<Modal
					handleClose={handleClick}
					movie={movie}
				/>
			)}
		</main>
	);
}

export default App;
