import { Fragment } from 'react'
import { Box, Heading, HStack } from '@chakra-ui/react'
import { useCurrentNavContext } from '../Context/CurrentNavContext'
import { Link } from 'react-router-dom';
import { RiHome3Fill, RiSearchFill, RiUserFill, RiBookmarkFill, RiFileList2Fill } from "react-icons/ri";
import { IconContext } from "react-icons"

function NavListDesktop() {

    const { active, setActive } = useCurrentNavContext()

    const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))

    const activeNavBarStyle = (type) => {
        return { color: active === type ? '#885cd4' : 'black', marginTop: '20%' }
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: '1.5em' }} >
                <Link to={'/Content'}>
                    <Box onClick={() => setActive('Home')} style={activeNavBarStyle('Home')}>
                        <HStack spacing={4}>
                            <RiHome3Fill />
                            <Heading as='h1' size='md' noOfLines={1}>
                                Home
                            </Heading>
                        </HStack>
                    </Box>
                </Link>
                <Link to={'/Explore'}>
                    <Box onClick={() => setActive('Explore')} style={activeNavBarStyle('Explore')}>
                        <HStack spacing={4}>
                            <RiSearchFill />
                            <Heading as='h1' size='md' noOfLines={1}>
                                Explore
                            </Heading>
                        </HStack>
                    </Box>
                </Link>
                <Link to={'/Bookmark'}>
                    <Box onClick={() => setActive('Bookmark')} style={activeNavBarStyle('Bookmark')}>
                        <HStack spacing={4}>
                            <RiBookmarkFill />
                            <Heading as='h1' size='md' noOfLines={1}>
                                Bookmark
                            </Heading>
                        </HStack>
                    </Box>
                </Link>
                <Link to={`/Friends/followers/${parseUserAccount.id}`}>
                    <Box onClick={() => setActive('List')} style={activeNavBarStyle('List')}>
                        <HStack spacing={4}>
                            <RiFileList2Fill />
                            <Heading as='h1' size='md' noOfLines={1}>
                                Friends
                            </Heading>
                        </HStack>
                    </Box>
                </Link>
                <Link to={`/Profile/${parseUserAccount.id}`}>
                    <Box onClick={() => setActive('Other')} style={activeNavBarStyle('Other')}>
                        <HStack spacing={4}>
                            <RiUserFill />
                            <Heading as='h1' size='md' noOfLines={1}>
                                Profile
                            </Heading>
                        </HStack>
                    </Box>
                </Link>
            </IconContext.Provider>
        </Fragment >
    )
}

export default NavListDesktop