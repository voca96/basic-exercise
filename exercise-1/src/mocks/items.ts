import { type Item } from '../types/item';

export const INITIALS_ITEMS: Item[] = [
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'ideojuegos',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'libros',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'peliculas',
	},
	{
		id: crypto.randomUUID(),
		timestamp: Date.now(),
		text: 'comics',
	},
];
