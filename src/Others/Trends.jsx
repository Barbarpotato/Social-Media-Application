import React from 'react'
import SearchTweet from './SearchTweet'
import { Box } from '@chakra-ui/react'
import UserSuggest from './UserSuggest'

function Trends() {
    return (
        <Box width={'25%'} height={'100vh'} marginTop={'30px'}>
            <SearchTweet />
            <UserSuggest />
        </Box>
    )
}

export default Trends