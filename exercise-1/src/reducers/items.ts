import { type Item, type ItemId } from '../types/item';

export const enum ITEMS_ACTION_TYPES {
	'addItems' = 'ADD_ITEM',
	'removeItem' = 'REMOVE_ITEM',
}

const updateLocalStorage = (item: Item[]) => {
	window.localStorage.setItem('item', JSON.stringify(item));
};

export const INITIAL_STATE: Item[] = JSON.parse(
	window.localStorage.getItem('item') || '[]'
);

export const reducer = (
	state: Item[],
	action: { payload: { id?: ItemId; text?: string }; type: string }
) => {
	const { type, payload } = action;
	switch (type) {
		case ITEMS_ACTION_TYPES.addItems: {
			const newItem: Item = {
				id: crypto.randomUUID(),
				text: payload.text!,
				timestamp: Date.now(),
			};
			const newState = [...state, newItem];
			updateLocalStorage(newState);
			return newState;
		}
		case ITEMS_ACTION_TYPES.removeItem: {
			const newState = state.filter(
				(currentItem: Item) => currentItem.id !== payload.id
			);
			updateLocalStorage(newState);
			return newState;
		}
	}

	return [];
};
