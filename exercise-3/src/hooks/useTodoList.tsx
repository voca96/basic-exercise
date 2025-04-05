import { useReducer } from 'react';
import { ItemId, ToDoItems } from '../mock/list';

import {
	InitialState,
	TODO_LIST_ACTION,
	todoReducer,
} from '../reducers/todoListReducer';

export function useTodoList() {
	const [state, dispatch] = useReducer(todoReducer, InitialState);

	function addTodo(todo: string) {
		dispatch({
			type: TODO_LIST_ACTION.ADD,
			payload: { text: todo },
		});
	}

	function deleteTodo(id: ItemId) {
		dispatch({
			type: TODO_LIST_ACTION.DELETE,
			payload: { id },
		});
	}

	function deleteCompletes() {
		dispatch({
			type: TODO_LIST_ACTION.DELETE_ALL_COMPLETE,
			// payload: {}, // podria ser una solucion ...
		});
	}

	function finishTodo(id: ItemId) {
		dispatch({
			type: TODO_LIST_ACTION.FINISH,
			payload: { id },
		});
	}

	function sortTodo(todoItem: ToDoItems, positionToInsert: number) {
		dispatch({
			type: TODO_LIST_ACTION.SORT,
			payload: { item: todoItem, postion: positionToInsert },
		});
	}

	return {
		todoList: state,
		addTodo,
		deleteTodo,
		deleteCompletes,
		finishTodo,
		sortTodo,
	};
}
