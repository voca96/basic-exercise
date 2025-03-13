import './App.css';

type ElementId = `${string}-${string}-${string}-${string}-${string}`;

type ElementType = {
	id: ElementId;
	image: string;
};

const getImages = (): ElementType[] => {
	const images = new Array(50).fill(0).map((_, i: number) => {
		return {
			id: crypto.randomUUID(),
			image: `../src/images/images${i + 1}.jpg`,
		};
	});
	return images;
};

function App() {
	return (
		<main>
			<ul>
				{getImages().map(({ id, image }) => {
					return (
						<li key={id}>
							<img
								src={image}
								alt=''
							/>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default App;
