import React from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { CurrentNavProvider } from '../Context/CurrentNavContext';
import Logo from './Logo'
import NavListDesktop from './NavListDesktop';
import NavListMobile from './NavListMobile';
import { useWindowSizeContext } from '../Context/WindowSizeContext';

function NavBar() {

    const windowType = useWindowSizeContext()

    console.log('render NavBar')
    return (
        <Box
            w={'20%'} height={'100vh'}>
            <VStack className='side-bar'
                position={'fixed'}
            >
                <Box height={'100vh'} paddingLeft={"20px"} paddingTop={"30%"}>
                    <Logo />
                    <CurrentNavProvider>
                        {windowType === 'Desktop' ? <NavListDesktop /> : <NavListMobile></NavListMobile>}
                    </CurrentNavProvider>
                </Box>
            </VStack>
        </Box>
    )
}

export default NavBar