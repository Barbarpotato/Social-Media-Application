import React, { useState } from 'react'
import { useCustomQuery } from '../Custom/useCustomQuery'
import { Input, Box, Center, Text, HStack, Avatar, VStack, Heading } from '@chakra-ui/react'
import { FetchTweetUser } from '../Fetch/UserProfile'

const dataReturn = (data) => {
    const user = data.results.map((item) => {
        return { username: String(item.name.first), profile: item.picture.medium, email: item.email }
    })
    return user
}

function SearchTweet() {

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [openSearchBox, setOpenSearchBox] = useState(false)

    const { data: UserAccount } = useCustomQuery('search-tweet', FetchTweetUser, dataReturn)

    const handleSearchInputChange = (event) => {
        setSearch(event.target.value)
        if (search.length > 0) {
            setSearchResult(UserAccount.filter(property => {
                return property.username.match(search)
            }))
        } else {
            setSearchResult([])
        }
    }

    return (
        <Box>
            <Input onBlur={() => setOpenSearchBox(!openSearchBox)} onFocus={() => setOpenSearchBox(!openSearchBox)}
                onChange={handleSearchInputChange} borderRadius={'20px 20px 20px 20px'} placeholder='Search Twitter'></Input>
            {openSearchBox &&
                <Box padding={'10px 10px 10px 10px'} bg={'gray.100'} marginTop={'20px'} borderRadius={'20px 20px 20px 20px'}>
                    {searchResult.length === 0 || search.length === 0 ?
                        <Text padding={'10px 10px 10px 10px'}>
                            <Center>Try searching for people...</Center></Text>
                        :
                        <Box overflowY={'scroll'} overflowX={'hidden'} height={searchResult.length > 3 ? '300px' : '150px'}>
                            {searchResult.map(property => (
                                <HStack marginY={'10px'}>
                                    <Avatar src={property.profile} />
                                    <VStack align={'left'}>
                                        <Heading size={'sm'}>{property.username}</Heading>
                                        <Text>{property.email}</Text>
                                    </VStack>
                                </HStack>
                            ))}
                        </Box>
                    }
                </Box>
            }
        </Box>
    )
}

export default SearchTweet