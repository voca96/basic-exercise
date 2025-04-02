import { FILTERS_BUTTONS, FiltersValue } from '../types/filters';

interface FiltersProps {
	handleFilter: (filterToUse: FiltersValue) => () => void;
	handleDeleteFinished: () => void;
}

export function Filters({ handleFilter, handleDeleteFinished }: FiltersProps) {
	return (
		<ul>
			{Object.entries(FILTERS_BUTTONS).map(([key, { text }]) => {
				return (
					<li key={key}>
						<span onClick={handleFilter(key as FiltersValue)}>{text}</span>
					</li>
				);
			})}
			<li>
				<span onClick={handleDeleteFinished}>borrar terminados</span>
			</li>
		</ul>
	);
}
