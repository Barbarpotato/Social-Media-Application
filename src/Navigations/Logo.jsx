import { SiTwitter } from "react-icons/si"
import { IconContext } from "react-icons"

function Logo() {
    return (
        <IconContext.Provider value={{ color: '#1DA1F2', size: '2em' }}>
            <SiTwitter />
        </IconContext.Provider >
    )
}

export default Logo