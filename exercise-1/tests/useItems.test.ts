import { describe, expect, test } from "vitest";
import {renderHook, act} from "@testing-library/react"
import { useItem } from "../src/hooks/useItems";

describe("useItems hook", () => {
    test('shoud add and remove items', () => {
        const {result} = renderHook(() => useItem())
        expect(result.current.items).toEqual([])


        // si se usa async await no funcionaria ya que el proceso additem es sincrono 
        // mientras que el proceso interno de react que funciona dentro de la misma funcion 
        // de add items es asincrono por lo tanto no es posible determinar cuando va a ocurrir
        act(() => {
            result.current.addItem('jugar videojuegos')
            result.current.addItem('escalar')
        })

        expect(result.current.items.length).toBe(2)

        act(() => {
            result.current.removeItem(result.current.items[0].id)
        })

        expect(result.current.items.length).toBe(1)
    })
})

// pasar el custom hook a reducer
// usar local storage
// respnsive
// test de useSEO

// hacer blog explicando roles html 