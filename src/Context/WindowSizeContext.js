import React, { createContext, useContext } from "react";
import { useWindowSize } from "../Custom/useWindowSize";

const WindowSizeContext = createContext(null)

export const WindowSizeProvider = ({ children }) => {

    const windowType = useWindowSize()

    return (
        <WindowSizeContext.Provider value={windowType}>
            {children}
        </WindowSizeContext.Provider>
    )
}

export const useWindowSizeContext = () => useContext(WindowSizeContext)