export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export type ToDoItems = {
	id: ItemId;
	text: string;
	finished: boolean;
};

export const mockList: ToDoItems[] = [
	{
		id: crypto.randomUUID(),
		text: 'Mostrar lista de elementos en una lista',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Agregar elementos a la lista mediante un input',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Eliminar elementos de la lista',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Marcar y desmarcar el elementos en la lista ya terminados',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Guardar los elementos de la lista en LocalStorage',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Filtrar los elementos (Terminados y no terminados)',
		finished: false,
	},
	{
		id: crypto.randomUUID(),
		text: 'Agregar una opcion para eliminar los elementos de la lista ya terminados',
		finished: false,
	},
];
