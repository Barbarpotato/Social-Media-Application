import React, { useEffect, useState } from 'react'
import {
    Heading, Avatar, Text, Popover, PopoverTrigger, useToast, Button,
    PopoverContent, PopoverBody, PopoverArrow, HStack, VStack, StackDivider
} from '@chakra-ui/react'
import { CiSquareRemove } from "react-icons/ci"
import NewsLoading from '../Loading/NewsLoading'
import { Link } from 'react-router-dom'
import { useWindowSize } from '../Custom/useWindowSize'
import { useMutation, useQuery } from 'react-query'
import { fetchProfile, editFriend } from '../Fetch/Profile'
import { useParams } from 'react-router-dom'

function Friends() {

    const [personalAccount, setPersonalAccount] = useState(false)

    const { category, id } = useParams()

    const windowType = useWindowSize()

    const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))

    const toast = useToast()

    const { data, isLoading, isSuccess, refetch } = useQuery('friend-list', fetchProfile, {
        select: (data) => {
            let followers = []
            let following = []
            const user = data.filter(element => element.id === parseInt(id))
            for (let x = 0; x < user[0].followers.length; x++) {
                const userFollowers = data.filter(element => element.id === user[0].followers[x].authorId)
                followers.push(userFollowers[0])
            }
            for (let y = 0; y < user[0].following.length; y++) {
                const userFollowing = data.filter(element => element.id === user[0].following[y].authorId)
                following.push(userFollowing[0])
            }
            return { ...user[0], followers: followers, following: following }
        }
    })

    const { mutateAsync: EditFriend } = useMutation(editFriend)

    useEffect(() => {
        if (parseInt(id) === parseUserAccount.id) setPersonalAccount(true)
        else setPersonalAccount(false)
    }, [id, parseUserAccount.id])

    const handleEditFriend = async (dataPoint) => {
        const removeFollowers = dataPoint.followers.filter(element => element.authorId !== data.id)
        const removeFollowing = data.following.filter(element => element.id !== dataPoint.id)
        const reduceRemoveFollowingObject = removeFollowing.map(element => ({ authorId: element.id }))
        try {
            await EditFriend({ ...dataPoint, followers: removeFollowers })
            await EditFriend({ ...data, following: reduceRemoveFollowingObject })
            refetch()
            toast({
                status: 'success',
                description: 'You Unfollowed Your Friend'
            })
        } catch (err) {
            console.error(err)
        }
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
            padding={windowType === 'Desktop' ? '100px' : '0px'}>
            <Heading size={'md'}>{category.toUpperCase()}</Heading>
            {isSuccess && category === 'following' ? data.following.map(element => (
                <React.Fragment  >
                    <HStack>
                        <Popover trigger='hover'>
                            <PopoverTrigger>
                                <Link to={`/Profile/${element.id}`}><Avatar src={element.profilePicture} /></Link>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody>
                                    <HStack align={'center'}>
                                        <Avatar src={element.profilePicture} />
                                        <VStack align={'left'}>
                                            <Heading size={'sm'}>{element.username}</Heading>
                                            <Text fontSize={'md'}>{element.email}</Text>
                                            <Text textAlign={'justify'}>{element.description}</Text>
                                            <HStack>
                                                <Text>{element.followers.length + "  Followers"}</Text>
                                                <Text>{element.following.length + "  Following"}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                        <VStack align={'left'}>
                            <Heading size={'md'}>{element.username}</Heading>
                            <Heading opacity={0.7} size={'sm'}>{element.email}</Heading>
                        </VStack>
                        {personalAccount ? <Button onClick={() => handleEditFriend(element)} variant={'ghost'} size={'sm'}><CiSquareRemove size={'lg'} /></Button> : null}
                    </HStack>
                    {data.following.length === 0 ? <Heading size={'sm'}>You have no Following</Heading> : null}
                </React.Fragment>
            ))
                :
                data.followers.map(element => (
                    <React.Fragment  >
                        <HStack>
                            <Popover trigger='hover'>
                                <PopoverTrigger>
                                    <Link to={`/Profile/${element.id}`}><Avatar src={element.profilePicture} /></Link>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody>
                                        <HStack align={'center'}>
                                            <Avatar src={element.profilePicture} />
                                            <VStack align={'left'}>
                                                <Heading size={'sm'}>{element.username}</Heading>
                                                <Text fontSize={'md'}>{element.email}</Text>
                                                <Text textAlign={'justify'}>{element.description}</Text>
                                                <HStack>
                                                    <Text>{element.followers.length + "  Followers"}</Text>
                                                    <Text>{element.following.length + "  Following"}</Text>
                                                </HStack>
                                            </VStack>
                                        </HStack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                            <VStack align={'left'}>
                                <Heading size={'md'}>{element.username}</Heading>
                                <Heading opacity={0.7} size={'sm'}>{element.email}</Heading>
                            </VStack>
                            {personalAccount ? <Button onClick={() => {
                                handleEditFriend(element)
                            }} variant={'ghost'} size={'sm'}><CiSquareRemove size={'lg'} /></Button> : null}
                        </HStack>
                    </React.Fragment>
                ))
            }
            {category === 'following' && data.following.length === 0 ? <Heading size={'sm'}>You Have No {category}</Heading> : null}
            {category === 'followers' && data.followers.length === 0 ? <Heading size={'sm'}>You Have No {category}</Heading> : null}
        </VStack >
    )
}

export default Friends