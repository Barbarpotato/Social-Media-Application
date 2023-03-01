import React from 'react'
import { VStack, Avatar, Heading, Text, Image, HStack, Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useWindowSize } from '../Custom/useWindowSize'
import { useParams } from 'react-router-dom'

const ProfileTitle = () => {
    return (
        <React.Fragment>
            <Heading size={'md'}>My Profile</Heading>
        </React.Fragment>
    )
}

const fetchUserTweet = async () => {
    const response = await fetch('http://localhost:4000/usersPost')
    return response.json()
}

const fetchProfile = async () => {
    const response = await fetch('http://localhost:4000/userAccount')
    return response.json()
}

function Profile() {

    const { username } = useParams()
    const windowType = useWindowSize()

    const { data: userTweet, isSuccess: isUserTweetSuccess, isLoading: isUserTweetLoading } = useQuery('user-tweet', fetchUserTweet, {
        select: (data) => {
            const tweet = data.filter(element => element.author === username)
            return tweet
        }
    })

    const { data: profile, isSuccess: isProfleSuccess, isLoading: isProfileLoading } = useQuery('user-profile', fetchProfile, {
        select: (data) => {
            const tweet = data.filter(element => element.username === username)
            return tweet
        }
    })

    if (isUserTweetLoading && isProfileLoading) return <>Loading...</>

    return (
        <VStack spacing={2}
            align={'left'}
            width={"80%"}
            height={'100vh'}
            padding={windowType === 'Desktop' ? '100px' : '0px'}>
            <ProfileTitle />
            <VStack align={'left'} spacing={-12} >
                {isUserTweetSuccess && userTweet.length !== 0 ?
                    <>
                        <Image borderRadius={'10px'} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' />
                        <Avatar size={'xl'} position={'relative'} left={5} src={userTweet[0].profilePicture} ></Avatar>
                    </> :
                    <>
                        <Image borderRadius={'10px'} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' />
                        <Avatar size={'xl'} position={'relative'} left={5} src={''} ></Avatar>
                    </>}
            </VStack>
            {isProfleSuccess ?
                <>
                    <Heading size={'md'}>{profile[0].username}</Heading>
                    <Text opacity={0.8}>@{profile[0].email}</Text>
                    <Text>{profile[0].description}</Text>
                    <Text opacity={0.8}>Joined {profile[0].joined}</Text>
                </> : null
            }
            <HStack spacing={5}>
                {isProfleSuccess &&
                    <>
                        <Text opacity={0.8}>{profile[0].following.length} Following</Text>
                        <Text opacity={0.8}>{profile[0].followers.length} Followers</Text>
                    </>
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
                                    <Heading size={'md'}>{item.author}</Heading>
                                    <Text>{item.description}</Text>
                                    <Image borderRadius={'30px'} src={item.imageURL} />
                                </VStack>
                            </HStack>
                        </Box>
                    </VStack>
                ))
                    :
                    null
            }
        </VStack >
    )
}

export default Profile