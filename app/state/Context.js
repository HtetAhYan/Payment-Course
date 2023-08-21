"use client";
import { createContext, useContext, useState } from 'react';
const LoadContext = createContext()

export const LoadContextProvider = ({ children }) => {
    const [load, setLoad] = useState(false)
    return (
        <LoadContext.Provider value={{ load, setLoad }} > { children }
        </LoadContext.Provider >
    )
}
export const useLoadContext = () => useContext(LoadContext)