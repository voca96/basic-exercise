import { ItemId, mockList, ToDoItems } from '../mock/list';

export const TODO_LIST_ACTION = {
	ADD: 'ADD_TODO',
	DELETE: 'DELETE_TODO',
	DELETE_ALL_COMPLETE: 'DELETE_COMPLETES',
	FINISH: 'FINISH_TODO',
	SORT: 'SORT_TODO',
	UPDATE: 'UPDATE_TODO',
} as const;

// type Actions = (typeof TODO_LIST_ACTION)[keyof typeof TODO_LIST_ACTION];

// REVISAR, tal vez usar payload en vez de declarar cada valor o conun diccionario
// export type reducerAction = {
// 	type: Actions;
// 	payload: {
// 		id?: ItemId;
// 		text?: string;
// 		item?: ToDoItems;
// 		postion?: number;
// 	};
// };

// Opcion 2
type AllTodo = {
	type: typeof TODO_LIST_ACTION.ADD;
	payload: { text: string };
};

type DelTodo = {
	type: typeof TODO_LIST_ACTION.DELETE;
	payload: { id: ItemId };
};

type DelCompleteTodo = {
	type: typeof TODO_LIST_ACTION.DELETE_ALL_COMPLETE;
};

type FinishTodo = {
	type: typeof TODO_LIST_ACTION.FINISH;
	payload: { id: ItemId };
};

type SortTodo = {
	type: typeof TODO_LIST_ACTION.SORT;
	payload: { item: ToDoItems; postion: number };
};

type UpdateTodo = {
	type: typeof TODO_LIST_ACTION.UPDATE;
	payload: { id: ItemId; text: string };
};

type Action =
	| AllTodo
	| DelTodo
	| DelCompleteTodo
	| FinishTodo
	| SortTodo
	| UpdateTodo;

function setLocalStorage(list: ToDoItems[]) {
	window.localStorage.setItem('todoList', JSON.stringify(list));
}

function getLocalStorage(): ToDoItems[] {
	return JSON.parse(window.localStorage.getItem('todoList')!) || mockList;
}

export const InitialState = getLocalStorage();

export const todoReducer = (state: ToDoItems[], action: Action) => {
	switch (action.type) {
		case TODO_LIST_ACTION.ADD: {
			const { text } = action.payload;
			const newTodoList = [
				...state,
				{
					id: crypto.randomUUID(),
					text: text,
					finished: false,
				},
			];
			setLocalStorage(newTodoList);
			return newTodoList;
		}

		case TODO_LIST_ACTION.DELETE: {
			const { id } = action.payload;

			const newList = state.filter((item) => item.id !== id);
			setLocalStorage(newList);
			return newList;
		}

		case TODO_LIST_ACTION.DELETE_ALL_COMPLETE: {
			const newTodoList = state.filter((item) => !item.finished);
			setLocalStorage(newTodoList);
			return newTodoList;
		}

		case TODO_LIST_ACTION.FINISH: {
			const { id } = action.payload;
			const itemIndexById = state.findIndex((item) => item.id === id);

			const newTodoList = [
				...state.slice(0, itemIndexById),
				{
					...state[itemIndexById],
					finished: !state[itemIndexById].finished,
				},
				...state.slice(itemIndexById + 1),
			];
			setLocalStorage(newTodoList);
			return newTodoList;
		}

		case TODO_LIST_ACTION.SORT: {
			const { item: todoItem, postion: positionToInsert } = action.payload;
			const itemIndexById = state.findIndex((item) => item.id === todoItem.id);

			if (
				itemIndexById !== positionToInsert &&
				itemIndexById + 1 !== positionToInsert
			) {
				const newTodoList = state.filter((item) => item.id !== todoItem.id);
				console.log(newTodoList);
				newTodoList.splice(positionToInsert, 0, todoItem!);
				return newTodoList;
			}
			return state;
		}

		case TODO_LIST_ACTION.UPDATE: {
			const { id, text } = action.payload;
			const itemIndexById = state.findIndex((item) => item.id === id);

			const newTodoList = [
				...state.slice(0, itemIndexById),
				{
					...state[itemIndexById],
					text,
				},
				...state.slice(itemIndexById + 1),
			];
			setLocalStorage(newTodoList);
			return newTodoList;
		}

		default: {
			return state;
		}
	}
};
