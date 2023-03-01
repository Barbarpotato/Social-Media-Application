import React from 'react'
import { Box, VStack, Heading } from '@chakra-ui/react'
import { CurrentNavProvider } from '../Context/CurrentNavContext';
import NavListDesktop from './NavListDesktop';
import NavListMobile from './NavListMobile';
import { useWindowSizeContext } from '../Context/WindowSizeContext';

function NavBar() {

    const windowType = useWindowSizeContext()

    return (
        <Box
            w={'20%'} height={'100vh'}>
            <VStack className='side-bar'
                position={'fixed'}
            >
                <Box height={'100vh'} paddingLeft={"20px"} paddingTop={"30%"}>
                    {windowType === 'Desktop' ? <Heading colorScheme={'purple'} size={'md'} color={'#885cd4'}><em>Social Media App</em></Heading> : null}
                    <CurrentNavProvider>
                        {windowType === 'Desktop' ? <NavListDesktop /> : <NavListMobile></NavListMobile>}
                    </CurrentNavProvider>
                </Box>
            </VStack>
        </Box>
    )
}

export default NavBar