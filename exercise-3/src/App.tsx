import './style.css';
import { useRef, useState } from 'react';
import { mockList, type ToDoItems, type ItemId } from './mock/list';
import React from 'react';

function setLocalStorage(list: ToDoItems[]) {
	window.localStorage.setItem('todoList', JSON.stringify(list));
}

function getLocalStorage(): ToDoItems[] {
	return JSON.parse(window.localStorage.getItem('todoList')!) || mockList;
}

function App() {
	const [todoList, setTodoList] = useState<ToDoItems[]>(getLocalStorage());
	const todoListRef = useRef<ToDoItems[]>([]);

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

	function handleList() {
		if (todoListRef.current.length !== 0) setTodoList(todoListRef.current);
	}

	// WE CAN CREATE ONE FUNCTION THAT IMPLEMENT THE TWO CASE
	function handledFinishedList() {
		if (todoListRef.current.length === 0) todoListRef.current = todoList;
		const finishedList = todoListRef.current.filter((item) => item.finished);
		setTodoList(finishedList);
	}

	function handledNoFinishedList() {
		if (todoListRef.current.length === 0) todoListRef.current = todoList;
		const finishedList = todoListRef.current.filter((item) => !item.finished);
		setTodoList(finishedList);
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

	function handleDragEnd(e: React.DragEvent<HTMLLIElement>) {
		console.log('end');
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
			newTodoList.splice(positionToInsert, 0, todoItem);
			setTodoList(newTodoList);
		}
	}

	return (
		<main>
			<section>
				<header>
					<h1>ToDo List</h1>{' '}
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='todo'
						/>
					</form>
				</header>
				<ul>
					<div
						onDragEnter={() => console.log('enter')}
						onDragLeave={() => console.log('leave')}
						onDrop={(e) => handleDrop(e, 0)}
						onDragOver={(e) => e.preventDefault()}
					>
						Drop here
					</div>
					{todoList.map((item, index) => {
						return (
							<React.Fragment key={item.id}>
								<li
									className={item.finished ? 'finished' : ''}
									draggable
									onDragStart={(e) => handleDragStart(e, item)}
									onDragEnd={handleDragEnd}
								>
									<input
										type='checkbox'
										checked={item.finished}
										onChange={handleCheck(item.id)}
									/>
									{item.text}
									<button onClick={handleClick(item.id)}>eliminar</button>
								</li>
								<div
									onDragEnter={() => console.log('enter')} // manejo css
									onDragLeave={() => console.log('leave')} // manejo css
									onDrop={(e) => handleDrop(e, index + 1)} // actualizacion de estado
									onDragOver={(e) => e.preventDefault()}
								>
									Drop here
								</div>
							</React.Fragment>
						);
					})}
				</ul>
				<footer>
					<button onClick={handleList}>todos</button>
					<button onClick={handledFinishedList}>terminados</button>
					<button onClick={handledNoFinishedList}>faltantes</button>
					<button onClick={handleDeleteFinished}>borrar terminados</button>
				</footer>
			</section>
		</main>
	);
}

export default App;
