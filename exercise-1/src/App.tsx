import './App.css';
import Item from './components/item';
import { useItem } from './hooks/useItems';
import { useSeo } from './hooks/useSEO';
import { type ItemId } from './types/item';

function App() {
	const { items, addItem, removeItem } = useItem();
	useSeo({
		title: `[${items.length}] lista de elementos`,
		description: 'Añadir y eliminar elementos de una lista',
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { elements } = event.currentTarget;

		const input = elements.namedItem('item');
		const isInput = input instanceof HTMLInputElement;
		if (!isInput || input == null) return;

		addItem(input.value);

		input.value = '';
	};

	const createHandleRemoveItem = (id: ItemId) => () => {
		removeItem(id);
	};

	return (
		<main>
			<aside>
				<h1>Prueba técnica de React</h1>
				<h2>Añadir y eliminar elementos de una lista</h2>
				<form
					onSubmit={handleSubmit}
					aria-label='anadir elementos a la lista'
				>
					<label htmlFor='item'>
						Elemento a introducir
						<input
							name='item'
							type='text'
							required
							placeholder='Videojuegos'
						/>
					</label>
					<button>Añadir elementos a la lista</button>
				</form>
			</aside>
			<section>
				<h2>Lista de elementos</h2>
				{items.length === 0 ? (
					<p>
						<strong>No hay elementos en la lista</strong>
					</p>
				) : (
					<ul>
						{items.map((item) => {
							return (
								<Item
									{...item}
									handleClick={createHandleRemoveItem(item.id)}
									key={item.id}
								/>
							);
						})}
					</ul>
				)}
			</section>
		</main>
	);
}

export default App;
