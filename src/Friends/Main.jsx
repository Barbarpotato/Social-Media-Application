import React from 'react'
import {
    Heading, Avatar, Button, Text, Popover, PopoverTrigger, Center, useToast,
    PopoverContent, PopoverBody, PopoverArrow, HStack, VStack, StackDivider
} from '@chakra-ui/react'
import NewsLoading from '../Loading/NewsLoading'
import { useWindowSize } from '../Custom/useWindowSize'
import { getFriendList, manageFriend } from '../Fetch/friendList'
import { useQuery } from 'react-query'
import { useCustomMutation } from '../Custom/useCustomMutations'


const TitlePage = () => {
    console.log('render title friends')
    return (
        <React.Fragment>
            <Heading size={'md'}>Your Friend List</Heading>
        </React.Fragment>
    )
}

function Friends() {

    const windowType = useWindowSize()

    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const toast = useToast()

    const { data, isLoading, isSuccess } = useQuery('friend-list', getFriendList, {
        select: (data) => {
            const userData = data.find(element => element.id == parseUserAccount.id)
            return userData
        }
    })

    const { mutate: unfollowFriend } = useCustomMutation(manageFriend, 'friend-list')

    const handleUnfollowFriendList = (dataId) => {
        const deleteFriend = data.friendList.filter(element => element.id !== dataId)
        parseUserAccount.friendList = deleteFriend
        unfollowFriend(parseUserAccount)
    }

    if (isLoading) {
        return (
            <NewsLoading />
        )
    }

    return (
        <VStack spacing={4}
            align={'left'}
            divider={<StackDivider borderColor='gray.200' />}
            width={windowType === 'Desktop' ? '50%' : '80%'}
            height={'100vh'}
            padding={'15px 5px 5px 15px'}>
            <TitlePage />
            {isSuccess && !data ?
                <Center>
                    <Heading>There is no friends</Heading>
                </Center>
                :
                data.friendList.map(friend => (
                    <HStack>
                        <Popover trigger='hover'>
                            <PopoverTrigger>
                                <Avatar size={'lg'} src={friend.imageURL} onClick={() => console.log('click avatar!')} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <HStack align={'center'}>
                                        <Avatar src={friend.imageURL} />
                                        <VStack align={'left'}>
                                            <Heading size={'sm'}>{friend.name}</Heading>
                                            <Text fontSize={'md'}>{friend.email}</Text>
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
                            <Text fontSize={'2xl'}>{friend.name}</Text>
                            <Text fontSize={'xl'}>{friend.email}</Text>
                        </VStack>
                        <Button onClick={() => {
                            handleUnfollowFriendList(friend.id)
                            toast({
                                description: "You Unfollow Your Friends",
                                status: 'error',
                                duration: 2000,
                                isClosable: false,
                            })
                        }}
                            colorScheme={'blue'} bg={'#1DA1F2'} color={'white'} borderRadius={'25px'}>Unfollow</Button>
                    </HStack>
                ))
            }
        </VStack>
    )
}

export default Friends