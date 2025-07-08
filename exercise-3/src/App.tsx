import './style.css';
import { type ItemId } from './mock/list';
import { ToDoList } from './components/todolist';
import { Filters } from './components/filters';
import { useFilters } from './hooks/useFilter';
import { useTodoList } from './hooks/useTodoList';

function App() {
	const {
		todoList,
		addTodo,
		deleteTodo,
		deleteCompletes,
		finishTodo,
		sortTodo,
		updateTodo,
	} = useTodoList();
	const [filteredTodos, handleFilter] = useFilters({ todoList });

	// crear un elemento
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { todo } = Object.fromEntries(new FormData(e.currentTarget));
		addTodo(todo.toString());
	}

	// Eliminar un solo elemento
	function handleClick(id: ItemId) {
		return () => deleteTodo(id);
	}

	//  marcar elemento como check
	function handleCheck(id: ItemId) {
		return () => finishTodo(id);
	}

	// DeleteCompletes
	const handleDeleteFinished = deleteCompletes;

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
						<ToDoList
							filteredTodos={filteredTodos} // todos list
							handleCheck={handleCheck} // finish
							handleClick={handleClick} // delete
							sortTodo={sortTodo}
							updateTodo={updateTodo}
						/>
						<footer>
							<Filters
								handleFilter={handleFilter}
								handleDeleteFinished={handleDeleteFinished}
							/>
						</footer>
					</>
				) : (
					<div className='no-todo'>
						<h2>No hay pendientes</h2>
					</div>
				)}
			</section>
			<section className='img'></section>
		</main>
	);
}

export default App;
