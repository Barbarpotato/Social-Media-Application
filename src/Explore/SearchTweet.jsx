import React, { useState } from 'react'
import {
    Input, Box, Center, Text, HStack, Avatar, VStack, Heading,
    Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query'

export const FetchTweetUser = async () => {
    const response = await fetch(`http://localhost:4000/userAccount`)
    return response.json()
}

function SearchTweet() {

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [openSearchBox, setOpenSearchBox] = useState(false)

    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const { data: UserAccount } = useQuery('search-tweet', FetchTweetUser, {
        select: (data) => {
            const selectiveAccount = data.filter(element => element.id !== parseUserAccount.id)
            return selectiveAccount
        }
    })

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
            <Input focusBorderColor='#885cd4' onFocus={() => setOpenSearchBox(!openSearchBox)}
                onChange={handleSearchInputChange} borderRadius={'20px 20px 20px 20px'} placeholder='Search Twitter'></Input>
            {openSearchBox &&
                <Box padding={'10px 10px 10px 10px'} bg={'gray.100'} marginTop={'20px'} borderRadius={'20px 20px 20px 20px'}>
                    {searchResult.length === 0 || search.length === 0 ?
                        <Text padding={'10px 10px 10px 10px'}>
                            <Center>Try searching for people...</Center></Text>
                        :
                        <Box overflowY={'scroll'} overflowX={'hidden'}>
                            {searchResult.map((property, idx) => (
                                <HStack key={idx}>
                                    <Popover trigger='hover'>
                                        <PopoverTrigger>
                                            <Link to={`/Profile/${property.id}`}>
                                                <Avatar src={property.profilePicture} />
                                            </Link>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <HStack align={'center'}>
                                                    <Avatar src={property.profilePicture} />
                                                    <VStack align={'left'}>
                                                        <Heading size={'sm'}>{property.name}</Heading>
                                                        <Text fontSize={'md'}>{property.email}</Text>
                                                        <Text textAlign={'justify'}>{property.description}</Text>
                                                        <HStack>
                                                            <Text>{property.followers.length + "  Followers"}</Text>
                                                            <Text>{property.followers.length + "  Following"}</Text>
                                                        </HStack>
                                                    </VStack>
                                                </HStack>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
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