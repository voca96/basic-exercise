import './style.css';
import { useState } from 'react';
import { DeleteIcon, DragIcon } from './Icons';
import { mockList, type ToDoItems, type ItemId } from './mock/list';
import React from 'react';

const TODO_FILTERS = {
	ALL: 'all',
	COMPLETED: 'completed',
	ACTIVE: 'active',
} as const;

const FILTERS_BUTTONS = {
	[TODO_FILTERS.ALL]: {
		text: 'todos',
	},
	[TODO_FILTERS.COMPLETED]: {
		text: 'completados',
	},
	[TODO_FILTERS.ACTIVE]: {
		text: 'activos',
	},
} as const;

type FiltersValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

function setLocalStorage(list: ToDoItems[]) {
	window.localStorage.setItem('todoList', JSON.stringify(list));
}

function getLocalStorage(): ToDoItems[] {
	return JSON.parse(window.localStorage.getItem('todoList')!) || mockList;
}

function App() {
	const [todoList, setTodoList] = useState<ToDoItems[]>(getLocalStorage());
	const [filter, setFilter] = useState<FiltersValue>(TODO_FILTERS.ALL);
	const [dropAreaActive, setDropAreaActive] = useState<number | null>(null);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { todo } = Object.fromEntries(new FormData(e.currentTarget));
		const newTodoList = [
			...todoList,
			{ id: crypto.randomUUID(), text: todo.toString(), finished: false },
		];
		setLocalStorage(newTodoList);
		setTodoList(newTodoList);
	}

	function handleClick(id: ItemId) {
		return function () {
			const newList = todoList.filter((item) => item.id !== id);
			setLocalStorage(newList);
			setTodoList(newList);
		};
	}

	function handleCheck(id: ItemId) {
		return function () {
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
		};
	}

	function handleFilter(filterToUse: FiltersValue) {
		return function () {
			setFilter(filterToUse);
		};
	}

	function handleDeleteFinished() {
		const newTodoList = todoList.filter((item) => !item.finished);
		setLocalStorage(newTodoList);
		setTodoList(newTodoList);
	}

	// DRAG AND DROP FUNCTIONS
	function handleDragStart(e: React.DragEvent<HTMLLIElement>, item: ToDoItems) {
		e.dataTransfer.clearData();
		e.dataTransfer.setData('text/plain', JSON.stringify(item));
	}

	function handleDragEnd() {
		setDropAreaActive(null);
	}

	function handleDrop(
		e: React.DragEvent<HTMLDivElement>,
		positionToInsert: number
	) {
		const todoItem = JSON.parse(e.dataTransfer.getData('text'));
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

	const filteredTodos = todoList.filter((todo) => {
		if (filter === TODO_FILTERS.ACTIVE) return !todo.finished;
		if (filter === TODO_FILTERS.COMPLETED) return todo.finished;
		return todo;
	});

	return (
		<main>
			<section className='todo'>
				<header>
					<h1>ToDo List</h1>{' '}
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='todo'
						/>
					</form>
				</header>
				{filteredTodos.length !== 0 ? (
					<>
						<ul className='todo-list'>
							<div
								className={dropAreaActive === 0 ? 'drop_area' : 'drop_hide'}
								onDragEnter={() => setDropAreaActive(0)}
								onDragLeave={() => setDropAreaActive(null)}
								onDrop={(e) => handleDrop(e, 0)}
								onDragOver={(e) => e.preventDefault()}
							>
								Drop here
							</div>
							{filteredTodos.map((item, index) => {
								return (
									<React.Fragment key={item.id}>
										<li
											className={item.finished ? 'finished' : ''}
											draggable
											onDragStart={(e) => handleDragStart(e, item)}
											onDragEnd={handleDragEnd}
										>
											<span>
												<DragIcon />
											</span>
											<input
												type='checkbox'
												checked={item.finished}
												onChange={handleCheck(item.id)}
											/>
											{item.text}
											<span onClick={handleClick(item.id)}>
												<DeleteIcon />
											</span>
										</li>
										<div
											className={
												dropAreaActive === index + 1 ? 'drop_area' : 'drop_hide'
											}
											onDragEnter={() => setDropAreaActive(index + 1)}
											onDragLeave={() => setDropAreaActive(null)}
											onDrop={(e) => handleDrop(e, index + 1)}
											onDragOver={(e) => e.preventDefault()}
										>
											Drop here
										</div>
									</React.Fragment>
								);
							})}
						</ul>
						<footer>
							<ul>
								{Object.entries(FILTERS_BUTTONS).map(([key, { text }]) => {
									return (
										<li key={key}>
											<span onClick={handleFilter(key as FiltersValue)}>
												{text}
											</span>
										</li>
									);
								})}
								<li>
									<span onClick={handleDeleteFinished}>borrar terminados</span>
								</li>
							</ul>
						</footer>
					</>
				) : (
					<div className='no-todo'>
						<h2>No hay pendientes</h2>
					</div>
				)}
			</section>
			<section className='a'></section>
		</main>
	);
}

export default App;
