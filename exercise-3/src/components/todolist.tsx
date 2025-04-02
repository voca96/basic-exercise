import { Fragment } from 'react/jsx-runtime';
import { DeleteIcon, DragIcon } from '../Icons';
import { ItemId, ToDoItems } from '../mock/list';
import { useState } from 'react';

interface ToDoListProps {
	filteredTodos: ToDoItems[];
	handleCheck: (id: ItemId) => () => void;
	handleClick: (id: ItemId) => () => void;
	sortTodo: (todoItem: ToDoItems, positionToInsert: number) => void;
}

export function ToDoList({
	filteredTodos,
	handleCheck,
	handleClick,
	sortTodo,
}: ToDoListProps) {
	const [dropAreaActive, setDropAreaActive] = useState<number | null>(null);
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
		//  ordenar lista
		const todoItem = JSON.parse(e.dataTransfer.getData('text'));
		sortTodo(todoItem, positionToInsert);
	}

	return (
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
					<Fragment key={item.id}>
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
					</Fragment>
				);
			})}
		</ul>
	);
}
