import React from 'react'
import { useCustomQuery } from '../Custom/useCustomQuery'
import { useCustomMutation } from '../Custom/useCustomMutations'
import { useQuery, useQueryClient } from 'react-query'
import { postFriendList, manageFriend, getFriendList } from '../Fetch/friendList'
import { FetchRandomUserSuggest } from '../Fetch/UserProfile'
import NewsLoading from '../Loading/NewsLoading'
import {
    Box, Heading, Avatar, Button, Text, Popover, PopoverTrigger,
    PopoverContent, PopoverBody, PopoverArrow, HStack, VStack, useToast, Center
} from '@chakra-ui/react'

const dataReturn = (data) => {
    const newData = data.results.map((item) => {
        return {
            name: item.name.first + " " + item.name.last, city: item.location.city,
            state: item.location.state,
            country: item.location.country, email: item.email,
            imageURL: item.picture.medium
        }
    })
    return newData
}

function UserSuggest() {
    const toast = useToast()
    const queryClient = useQueryClient()

    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const { data: userSuggest, isSuccess, isLoading,
        refetch: fetchOtherUser, isFetching } = useCustomQuery('user-suggestion',
            FetchRandomUserSuggest, dataReturn)

    const { data: isUserHaveFriend } = useQuery('friend-list', getFriendList, {
        select: (data) => {
            const checkUserFriendList = data.find(element => element.id === parseUserAccount.id)
            if (checkUserFriendList !== undefined) {
                return checkUserFriendList
            }
            else return false
        }
    })

    const { mutate: addFriend } = useCustomMutation(postFriendList, 'friend-list')
    const { mutate: addFriends } = useCustomMutation(manageFriend, 'friend-list')

    const followFriends = (dataPoint, index) => {
        queryClient.setQueryData('user-suggestion', (previousData) => {
            return {
                ...previousData,
                results: previousData.results.filter((_, idx) => idx !== index)
            }
        })
        if (!isUserHaveFriend) {
            parseUserAccount.friendList = [dataPoint]
            addFriend(parseUserAccount)
        }
        else {
            isUserHaveFriend.friendList.push(dataPoint)
            addFriends(isUserHaveFriend)
        }
    }

    const findOtherUser = () => {
        fetchOtherUser()
    }

    if (isLoading && isFetching) {
        return (
            <NewsLoading />
        )
    }

    return (
        <Box borderRadius={'30px'} bg={'whiteAlpha.900'}>
            <Heading padding={'10px'} size={'md'}>Who To Follow</Heading>
            {isSuccess && userSuggest.map((user, idx) => (
                <HStack key={idx} padding={'2px'} align={'center'} marginY={'20px'}>
                    <Popover trigger='hover'>
                        <PopoverTrigger>
                            <Avatar size={'lg'} src={user.imageURL} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody>
                                <HStack align={'center'}>
                                    <Avatar src={user.imageURL} />
                                    <VStack align={'left'}>
                                        <Heading size={'sm'}>{user.name}</Heading>
                                        <Text fontSize={'md'}>{user.email}</Text>
                                        <Text textAlign={'justify'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perferendis porro optio amet est praesentium beatae aut? Neque, similique et?</Text>
                                        <HStack>
                                            <Text>{Math.floor(Math.random() * 10000) + "  Followers"}</Text>
                                            <Text>{Math.floor(Math.random() * 10000) + "  Following"}</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <VStack align={'left'}>
                        <Text>{user.name}</Text>
                        <Text fontSize={'small'}>{user.email}</Text>
                    </VStack>
                    <Button onClick={() => {
                        followFriends(user, idx)
                        toast({
                            position: 'bottom-right',
                            title: `You Follow ${user.name}`,
                            status: 'info',
                            duration: 1000,
                            isClosable: false
                        })
                    }} size={'md'} colorScheme={'blue'} bg={'#1DA1F2'} color={'white'} borderRadius={'25px'}>Follow</Button>
                </HStack>
            ))
            }
            <Center>
                <Button onClick={findOtherUser} variant={'unstyled'} color={'black'} colorScheme={'twitter'}>Others...</Button>
            </Center>
        </Box >
    )
}

export default UserSuggest