import { useState } from "react"
import { ItemId, type Item } from "../App"

// const INITIALS_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'ideojuegos',
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'libros',
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'peliculas',
//   },
//   {
//     id: crypto.randomUUID(),
//     timestamp: Date.now(),
//     text: 'comics',
//   }
// ]


export const useItem = () => {
    // const [items, setItems] = useState<Item[]>(INITIALS_ITEMS)
  const [items, setItems] = useState<Item[]>([])

  const addItem = (text: string) =>{
      const newItem: Item = {
        id:crypto.randomUUID(),
        text,
        timestamp: Date.now()
      }
    
      setItems((prevItems) => [...prevItems, newItem])
  }

  const removeItem = (id: ItemId) => {
    setItems(prevItems => {
        return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return {
    items,
    addItem,
    removeItem
  }
}