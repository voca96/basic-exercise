import './style.css';
import { useRef, useState } from 'react';
import { mockList, type ToDoItems, type ItemId } from './mock/list';

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

	return (
		<main>
			<section>
				<header>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							name='todo'
						/>
					</form>
				</header>
				<ul>
					{todoList.map((item) => {
						return (
							<li
								key={item.id}
								className={item.finished ? 'finished' : ''}
							>
								<input
									type='checkbox'
									checked={item.finished}
									onChange={handleCheck(item.id)}
								/>
								{item.text}
								<button onClick={handleClick(item.id)}>eliminar</button>
							</li>
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
