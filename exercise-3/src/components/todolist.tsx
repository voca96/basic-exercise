import { Fragment } from 'react/jsx-runtime';
import { DeleteIcon, DragIcon } from '../Icons';
import { ItemId, ToDoItems } from '../mock/list';
import { useState } from 'react';

interface ToDoListProps {
	filteredTodos: ToDoItems[];
	handleCheck: (id: ItemId) => () => void;
	handleClick: (id: ItemId) => () => void;
	sortTodo: (todoItem: ToDoItems, positionToInsert: number) => void;
	updateTodo: (id: ItemId, text: string) => void;
}

export function ToDoList({
	filteredTodos,
	handleCheck,
	handleClick,
	sortTodo,
	updateTodo,
}: ToDoListProps) {
	// UPDATE STATES

	const [textToUpdate, setTextToUpdate] = useState<string>('');
	const [updateId, setUpdateId] = useState<ItemId | null>(null);

	// DRAG AND DROP STATES
	const [dropAreaActive, setDropAreaActive] = useState<number | null>(null);

	// UPDATE FUNCTION
	function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			updateTodo(updateId!, e.currentTarget.value);
			setUpdateId(null);
			setTextToUpdate('');
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTextToUpdate(e.target.value);
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
							draggable={setUpdateId === null}
							onDragStart={(e) => handleDragStart(e, item)}
							onDragEnd={handleDragEnd}
							onClick={() => {
								if (updateId !== item.id) setUpdateId(null);
							}}
						>
							<span>
								<DragIcon />
							</span>
							<input
								type='checkbox'
								checked={item.finished}
								onChange={handleCheck(item.id)}
							/>
							<p
								onDoubleClick={() => {
									setUpdateId(item.id);
									setTextToUpdate(item.text);
								}}
							>
								{item.text}
							</p>
							<input
								type='text'
								className='update-input'
								value={textToUpdate}
								hidden={item.id !== updateId}
								onKeyDown={handleEnter}
								onChange={handleChange}
							/>
							<span onClick={handleClick(item.id)}>
								<DeleteIcon />
							</span>

							{/* Aca se puede crear el input para el update */}
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
