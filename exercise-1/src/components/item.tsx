import { ItemId } from "../App"

const Item = (
    {id, text, handleClick} : 
    {id: ItemId, text: string, handleClick: () => void}) => {
    return(
        <li key={id}>
            {text}
            <button onClick={handleClick}>
                Eliminar elemento
            </button>
        </li>
    )
}

export default Item