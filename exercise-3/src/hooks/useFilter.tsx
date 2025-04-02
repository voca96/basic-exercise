import { useMemo, useState } from 'react';
import { FiltersValue, TODO_FILTERS } from '../types/filters';
import { ToDoItems } from '../mock/list';

export function useFilters({ todoList }: { todoList: ToDoItems[] }) {
	const [filter, setFilter] = useState<FiltersValue>(TODO_FILTERS.ALL);

	function handleFilter(filterToUse: FiltersValue) {
		return function () {
			setFilter(filterToUse);
		};
	}

	const filteredTodos = useMemo(() => {
		return todoList.filter((todo) => {
			if (filter === TODO_FILTERS.ACTIVE) return !todo.finished;
			if (filter === TODO_FILTERS.COMPLETED) return todo.finished;
			return todo;
		});
	}, [filter, todoList]);

	return [filteredTodos, handleFilter] as const;
}
