import React, { useEffect, useState } from 'react'
import { VStack, Avatar, Heading, Text, Image, HStack, Box, Button, useDisclosure, ModalOverlay } from '@chakra-ui/react'
import { HiUserAdd } from "react-icons/hi";
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { useWindowSize } from '../Custom/useWindowSize'
import { useParams } from 'react-router-dom'
import EditProfileModal from './EditProfileModal'
import EditImageProfile from './EditImageProfile'
import EditBackground from './EditBackground'
import { fetchProfile, fetchUserTweet, editFriend } from '../Fetch/Profile'
import { useCustomMutation } from '../Custom/useCustomMutations';

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
            const userProfile = data.filter(element => element.id === parseInt(id))
            const personalAccount = data.filter(element => element.id === parseUserAccount.id)
            return [userProfile[0], personalAccount[0]]
        }
    })

    const { data: userTweet, isSuccess: isUserTweetSuccess, isLoading: isUserTweetLoading } = useQuery('user-tweet', fetchUserTweet, {
        select: (data) => {
            const tweet = data.filter(element => element.authorId === parseInt(id))
            const joinProfileData = tweet.map(element =>
                ({ ...element, profilePicture: profile[0].profilePicture, username: profile[0].username }))
            return joinProfileData
        }
    })

    const { mutateAsync: EditFriend } = useCustomMutation(editFriend, 'user-profile')

    useEffect(() => {
        if (parseInt(id) === parseUserAccount.id) setPersonalAccount(true)
        else setPersonalAccount(false)
    }, [id, parseUserAccount.id])

    const handleFriend = async (isFollow) => {
        let followingList = profile[1].following
        let followerList = profile[0].followers
        if (isFollow === -1) {
            followingList.push({ authorId: profile[0].id })
            followerList.push({ authorId: profile[1].id })
            try {
                await EditFriend({ ...profile[1], following: followingList })
                await EditFriend({ ...profile[0], followers: followerList })
            } catch (err) {
                console.error(err)
            }
        } else {
            const removeFollowing = profile[1].following.filter(element => element.authorId !== profile[0].id)
            const removeFollowers = profile[0].followers.filter(element => element.authorId !== profile[1].id)
            try {
                await EditFriend({ ...profile[1], following: removeFollowing })
                await EditFriend({ ...profile[0], followers: removeFollowers })
            } catch (err) {
                console.error(err)
            }
        }
    }

    if (isUserTweetLoading && isProfileLoading) return <React.Fragment>Loading...</React.Fragment>

    return (
        <VStack spacing={2}
            align={'left'}
            width={"80%"}
            height={'100vh'}
            padding={windowType === 'Desktop' ? '100px' : '0px'}>
            <Heading size={'md'}>My Profile</Heading>
            {isProfleSuccess && <EditProfileModal dataPoint={profile[0]}
                isOpen={isOpenEditProfile} onClose={onCloseEditProfile} overlay={overlay} />}
            {personalAccount && isProfleSuccess ?
                <EditImageProfile dataPoint={profile[0]} isOpen={isOpenProfilePic} onClose={onCloseProfilePic} overlay={overlay} /> : null}
            {personalAccount && isProfleSuccess ?
                <EditBackground dataPoint={profile[0]} isOpen={isOpenBackground} onClose={onCloseBackground} overlay={overlay} /> : null}
            <VStack align={'left'} spacing={-12} >
                {isUserTweetSuccess && isProfleSuccess ?
                    <React.Fragment>
                        <Image height={'400px'} onClick={onOpenBackground} borderRadius={'10px'}
                            src={profile[0].backgroundPicture ? profile[0].backgroundPicture : 'https://i.pinimg.com/originals/4f/d6/22/4fd622433a21e15d7c12d7e2390f87ad.jpg'} />
                        <Avatar onClick={onOpenProflePic} size={'xl'} position={'relative'} left={5}
                            src={profile[0].profilePicture ? profile[0].profilePicture : ''} />
                    </React.Fragment> :
                    <React.Fragment>
                        <Image height={'400px'} onClick={onOpenBackground} borderRadius={'10px'}
                            src={profile[0] ? profile[0].backgroundPicture : 'https://i.pinimg.com/originals/4f/d6/22/4fd622433a21e15d7c12d7e2390f87ad.jpg'} />
                        <Avatar onClick={onOpenProflePic} size={'xl'} position={'relative'} left={5} src={''} />
                    </React.Fragment>}
            </VStack>
            {isProfleSuccess || profile[0] ?
                <React.Fragment>
                    <HStack paddingX={'10px'}>
                        <Heading size={'md'}>{profile[0].username}</Heading>
                        {personalAccount ?
                            <Button onClick={() => {
                                setOverlay(<OverlayOne />)
                                onOpenEditProfile()
                            }} size={'sm'} colorScheme={'purple'}>Edit Profile</Button> :
                            <Button onClick={() => handleFriend(profile[1].following.findIndex((element) => element.authorId === parseInt(id)))} size={'sm'} colorScheme={'purple'}>
                                <HiUserAdd />
                                {profile[1].following.findIndex((element) => element.authorId === parseInt(id)) === -1 ? 'Follow' : 'Unfollow'}
                            </Button>}
                    </HStack>
                    <Text paddingX={'10px'} opacity={0.8}>@{profile[0].email}</Text>
                    <Text paddingX={'10px'} align={'justify'}>{profile[0].description}</Text>
                    <Text paddingX={'10px'} opacity={0.8}>Joined {profile[0].joined}</Text>
                </React.Fragment> : null
            }
            <HStack paddingX={'10px'} spacing={5}>
                {isProfleSuccess &&
                    <React.Fragment>
                        <Link to={`/Friends/following/${id}`}><Text opacity={0.8}>{profile[0].following.length} Following</Text></Link>
                        <Link to={`/Friends/followers/${id}`}><Text opacity={0.8}>{profile[0].followers.length} Followers</Text></Link>
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
                                    <Text align={'justify'}>{item.description}</Text>
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