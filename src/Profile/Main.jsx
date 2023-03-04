import React, { useEffect, useState } from 'react'
import { VStack, Avatar, Heading, Text, Image, HStack, Box, Button, useDisclosure, ModalOverlay } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useWindowSize } from '../Custom/useWindowSize'
import { useParams } from 'react-router-dom'
import EditProfileModal from './EditProfileModal'
import EditImageProfile from './EditImageProfile'
import EditBackground from './EditBackground'

const fetchUserTweet = async () => {
    const response = await fetch('http://localhost:4000/usersPost')
    return response.json()
}

const fetchProfile = async () => {
    const response = await fetch('http://localhost:4000/userAccount')
    return response.json()
}

const OverlayOne = () => (
    <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
    />
)

function Profile() {

    const { id } = useParams()

    const [personalAccount, setPersonalAccount] = useState(false)

    const { isOpen: isOpenEditProfile, onOpen: onOpenEditProfile, onClose: onCloseEditProfile } = useDisclosure()
    const { isOpen: isOpenProfilePic, onOpen: onOpenProflePic, onClose: onCloseProfilePic } = useDisclosure()
    const { isOpen: isOpenBackground, onOpen: onOpenBackground, onClose: onCloseBackground } = useDisclosure()

    const [overlay, setOverlay] = useState(<OverlayOne />)

    const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))
    const windowType = useWindowSize()

    const { data: profile, isSuccess: isProfleSuccess, isLoading: isProfileLoading } = useQuery('user-profile', fetchProfile, {
        select: (data) => {
            const tweet = data.filter(element => element.id === parseInt(id))
            return tweet[0]
        }
    })

    const { data: userTweet, isSuccess: isUserTweetSuccess, isLoading: isUserTweetLoading } = useQuery('user-tweet', fetchUserTweet, {
        select: (data) => {
            const tweet = data.filter(element => element.authorId === parseInt(id))
            const joinProfileData = tweet.map(element =>
                ({ ...element, profilePicture: profile.profilePicture, username: profile.username }))
            return joinProfileData
        }
    })

    useEffect(() => {
        if (parseInt(id) === parseUserAccount.id) setPersonalAccount(true)
        else setPersonalAccount(false)
    }, [])

    if (isUserTweetLoading && isProfileLoading) return <React.Fragment>Loading...</React.Fragment>

    return (
        <VStack spacing={2}
            align={'left'}
            width={"80%"}
            height={'100vh'}
            padding={windowType === 'Desktop' ? '100px' : '0px'}>
            <Heading size={'md'}>My Profile</Heading>
            {isProfleSuccess && <EditProfileModal dataPoint={profile}
                isOpen={isOpenEditProfile} onClose={onCloseEditProfile} overlay={overlay} />}
            {personalAccount && isProfleSuccess ?
                <EditImageProfile dataPoint={profile} isOpen={isOpenProfilePic} onClose={onCloseProfilePic} overlay={overlay} /> : null}
            {personalAccount && isProfleSuccess ?
                <EditBackground dataPoint={profile} isOpen={isOpenBackground} onClose={onCloseBackground} overlay={overlay} /> : null}
            <VStack align={'left'} spacing={-12} >
                {isUserTweetSuccess && isProfleSuccess && userTweet.length !== 0 ?
                    <React.Fragment>
                        <Image height={'400px'} onClick={onOpenBackground} borderRadius={'10px'}
                            src={profile.backgroundPicture ? profile.backgroundPicture : 'https://i.pinimg.com/originals/4f/d6/22/4fd622433a21e15d7c12d7e2390f87ad.jpg'} />
                        <Avatar onClick={onOpenProflePic} size={'xl'} position={'relative'} left={5}
                            src={profile.profilePicture ? profile.profilePicture : ''} />
                    </React.Fragment> :
                    <React.Fragment>
                        <Image height={'400px'} onClick={onOpenBackground} borderRadius={'10px'}
                            src={profile ? profile.backgroundPicture : 'https://i.pinimg.com/originals/4f/d6/22/4fd622433a21e15d7c12d7e2390f87ad.jpg'} />
                        <Avatar onClick={onOpenProflePic} size={'xl'} position={'relative'} left={5} src={''} />
                    </React.Fragment>}
            </VStack>
            {isProfleSuccess || profile ?
                <React.Fragment>
                    <HStack>
                        <Heading size={'md'}>{profile.username}</Heading>
                        {personalAccount === true &&
                            <Button onClick={() => {
                                setOverlay(<OverlayOne />)
                                onOpenEditProfile()
                            }} size={'sm'} colorScheme={'purple'}>Edit Profile</Button>}
                    </HStack>
                    <Text opacity={0.8}>@{profile.email}</Text>
                    <Text>{profile.description}</Text>
                    <Text opacity={0.8}>Joined {profile.joined}</Text>
                </React.Fragment> : null
            }
            <HStack spacing={5}>
                {isProfleSuccess &&
                    <React.Fragment>
                        <Text opacity={0.8}>{profile.following.length} Following</Text>
                        <Text opacity={0.8}>{profile.followers.length} Followers</Text>
                    </React.Fragment>
                }
            </HStack>
            <Heading marginY={'50px'} size={'md'}>Your Tweets</Heading>
            {
                userTweet ? userTweet.map((item, idx) => (
                    <VStack key={idx} align={'left'}>
                        <Box>
                            <HStack margin={'10px 20px 20px 10px'} align={'top'}>
                                <Avatar src={item.profilePicture} />
                                <VStack align={'left'}>
                                    <Heading size={'md'}>{item.username}</Heading>
                                    <Text>{item.description}</Text>
                                    <Image borderRadius={'30px'} src={item.imageURL} />
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                )) : null
            }
        </VStack >
    )
}

export default Profile