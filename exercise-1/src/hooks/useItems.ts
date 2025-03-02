import { useReducer } from 'react';
import { type ItemId } from '../types/item';
import { ITEMS_ACTION_TYPES, reducer, INITIAL_STATE } from '../reducers/items';

export const useItem = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	const addItem = (text: string) => {
		dispatch({ type: ITEMS_ACTION_TYPES.addItems, payload: { text } });
	};

	const removeItem = (id: ItemId) => {
		dispatch({ type: ITEMS_ACTION_TYPES.removeItem, payload: { id } });
	};

	return {
		items: state,
		addItem,
		removeItem,
	};
};
