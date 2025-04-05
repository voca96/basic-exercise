import { type Item } from '../types/item';

export const INITIALS_ITEMS: Item[] = [
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'videojuegos',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'libros',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'películas',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'comics',
	},
];
