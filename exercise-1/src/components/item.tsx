import { type ItemId } from '../types/item';

const Item = ({
	id,
	text,
	handleClick,
}: {
	id: ItemId;
	text: string;
	handleClick: () => void;
}) => {
	return (
		<li key={id}>
			{/* <p>{text}</p> */}
			{text}
			<button onClick={handleClick}>Eliminar elemento</button>
		</li>
	);
};

export default Item;
