import { createContext, useContext, useState } from "react";

const CurrentNavContext = createContext(null)

export const CurrentNavProvider = ({ children }) => {
    const [active, setActive] = useState('Home')

    return (
        <CurrentNavContext.Provider value={{ active, setActive }}>
            {children}
        </CurrentNavContext.Provider>
    )
}

export const useCurrentNavContext = () => useContext(CurrentNavContext)