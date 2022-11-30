import { createContext, useContext } from "react"
import { IPoint } from './@types/point';

export type ListContextType = {
    list : IPoint[] | null,
    updateList : (newList : IPoint[]) => void
}

export const ListContext =  createContext<ListContextType>({
    list : [],
    updateList : () => {}
});

export const useListContext = () => useContext(ListContext)
