import { useState } from 'react';
import { ItemId, mockList, ToDoItems } from '../mock/list';

export function setLocalStorage(list: ToDoItems[]) {
	window.localStorage.setItem('todoList', JSON.stringify(list));
}

export function getLocalStorage(): ToDoItems[] {
	return JSON.parse(window.localStorage.getItem('todoList')!) || mockList;
}

export function useTodoList() {
	const [todoList, setTodoList] = useState<ToDoItems[]>(getLocalStorage());

	function addTodo(todo: string) {
		const newTodoList = [
			...todoList,
			{ id: crypto.randomUUID(), text: todo, finished: false },
		];
		setLocalStorage(newTodoList);
		setTodoList(newTodoList);
	}

	function deleteTodo(id: ItemId) {
		const newList = todoList.filter((item) => item.id !== id);
		setLocalStorage(newList);
		setTodoList(newList);
	}

	function deleteCompletes() {
		const newTodoList = todoList.filter((item) => !item.finished);
		setLocalStorage(newTodoList);
		setTodoList(newTodoList);
	}

	function finishTodo(id: ItemId) {
		const itemIndexById = todoList.findIndex((item) => item.id === id);

		const newTodoList = [
			...todoList.slice(0, itemIndexById),
			{
				...todoList[itemIndexById],
				finished: !todoList[itemIndexById].finished,
			},
			...todoList.slice(itemIndexById + 1),
		];
		setLocalStorage(newTodoList);
		setTodoList(newTodoList);
	}

	function sortTodo(todoItem: ToDoItems, positionToInsert: number) {
		const itemIndexById = todoList.findIndex((item) => item.id === todoItem.id);
		if (
			itemIndexById !== positionToInsert &&
			itemIndexById + 1 !== positionToInsert
		) {
			const newTodoList = todoList.filter((item) => item.id !== todoItem.id);
			newTodoList.splice(positionToInsert - 1, 0, todoItem);
			setTodoList(newTodoList);
		}
	}

	return {
		todoList,
		addTodo,
		deleteTodo,
		deleteCompletes,
		finishTodo,
		sortTodo,
	};
}
