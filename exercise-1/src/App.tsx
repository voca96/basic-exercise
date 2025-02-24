import './App.css'
import Item from './components/item'
import { useItem } from './hooks/useItems'
import { useSeo } from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`
export interface Item {
  id: ItemId
  timestamp: number,
  text: string
}

function App() {
  const {items, addItem, removeItem} = useItem()
  useSeo({title: `[${items.length}] lista de elementos`,
        description: "Anadir y eliminar elementos de una lista"})

  // Manera no controlada no hay un estado para cada input
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // e.target.value -> para escuchar un onChange de un input, no es recomendable si hay un form
    // es mas practico y limpio extraer los lementos desde el form

    const {elements} = event.currentTarget

    // es necesario de realizar una comprobacion de tipos
    // Estrategia 1, "trmpa de typescript"
    // const input = elements.namedItem('item') as HTMLInputElement

    // estratedia 2 asegurarte que realmente es lo que es
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if(!isInput || input == null) return 

    //addItem
    addItem(input.value)

    input.value = ''

  }

  // genera una funcion independiante para cada uno de los Items
  const createHandleRemoveItem = (id: ItemId) => ()=>{
    // removeItem
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>prueba tecnica de React</h1>
        <h2>Anadir y eliminar elementos de uina lista</h2>
        <form onSubmit={handleSubmit} aria-label='anadir elementos a la lista'>
          <label htmlFor="item">elemento a introducir
            <input 
              name="item" 
              type="text" 
              required 
              placeholder='Videojuegos'/>
          </label>
          <button>Anadir elementos a la lista</button>
        </form>
      </aside>
      <section>
        <h2>lista de elementos</h2>
        {
          items.length === 0 ? 
          (
            <p><strong>no hay elementos en la lista</strong></p>
          )
            :
          (  
            <ul>
              {items.map(item=>{
                return (
                  <Item {...item} handleClick={createHandleRemoveItem(item.id)} key={item.id}/>
                )
              })}
            </ul>
          )
        }
      </section>
    </main>
  )
}

export default App
