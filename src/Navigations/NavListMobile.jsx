import { Fragment } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { useCurrentNavContext } from '../Context/CurrentNavContext'
import { Link } from 'react-router-dom';
import { RiHome3Fill, RiSearchFill, RiUserFill, RiBookmarkFill, RiFileList2Fill } from "react-icons/ri";
import { IconContext } from "react-icons"

function NavListMobile() {

    const { active, setActive } = useCurrentNavContext()

    const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))

    const activeNavBarStyle = (type) => {
        return { color: active === type ? '#885cd4' : 'black', marginTop: '20%' }
    }

    return (
        <Fragment>
            <IconContext.Provider value={{ size: '1.5em' }} >
                <Box paddingTop={'20px'} onClick={() => setActive('Home')} style={activeNavBarStyle('Home')}>
                    <Link to={'/Content'}>
                        <RiHome3Fill />
                    </Link>
                </Box>
                <Box paddingTop={'20px'} onClick={() => setActive('Explore')} style={activeNavBarStyle('Explore')}>
                    <Link to={'/Explore'}>
                        <RiSearchFill />
                    </Link>
                </Box>
                <Box paddingTop={'20px'} onClick={() => setActive('Bookmark')} style={activeNavBarStyle('Bookmark')}>
                    <HStack spacing={4}>
                        <Link to={'/Bookmark'}>
                            <RiBookmarkFill />
                        </Link>
                    </HStack>
                </Box>
                <Box paddingTop={'20px'} onClick={() => setActive('List')} style={activeNavBarStyle('List')}>
                    <HStack spacing={4}>
                        <Link to={`/Friends/followers/${parseUserAccount.id}`}>
                            <RiFileList2Fill />
                        </Link>
                    </HStack>
                </Box>
                <Box paddingTop={'20px'} onClick={() => setActive('Other')} style={activeNavBarStyle('Other')}>
                    <HStack spacing={4}>
                        <Link to={`/Profile/${parseUserAccount.id}`}>
                            <RiUserFill />
                        </Link>
                    </HStack>
                </Box>
            </IconContext.Provider>
        </Fragment >
    )
}

export default NavListMobile