import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResizeWindow = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', () => {
            handleResizeWindow()
        })
        return () => {
            window.removeEventListener('resize', () => { handleResizeWindow() })
        }
    }, [width])

    if (width > 1300) {
        return 'Desktop'
    } else if (width < 1300 && width > 600) {
        return 'Mobile'
    }
}