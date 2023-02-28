import React from 'react'
import { VStack, Avatar, Heading, Text, Image, HStack, Box } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useWindowSize } from '../Custom/useWindowSize'

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

function Profile() {

    const windowType = useWindowSize()
    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const { data: userTweet, isSuccess, isLoading } = useQuery('user-tweet', fetchUserTweet, {
        select: (data) => {
            const tweet = data.filter(element => element.author === parseUserAccount.username)
            return tweet
        }
    })

    if (isSuccess) console.log(userTweet)

    return (
        <VStack spacing={2}
            align={'left'}
            width={windowType === 'Desktop' ? '50%' : '80%'}
            height={'100vh'}
            padding={'15px 5px 5px 15px'}>
            <ProfileTitle />
            <VStack align={'left'} spacing={-12} >
                <Image borderRadius={'10px'} src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg' />
                <Avatar size={'xl'} position={'relative'} left={5} src={'https://randomuser.me/api/portraits/med/men/16.jpg'} />
            </VStack>
            <Heading size={'md'}>{parseUserAccount.username}</Heading>
            <Text opacity={0.8}>@{parseUserAccount.email}</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quaerat, nulla velit error ipsam saepe vel exercitationem et architecto asperiores! Rem minima, mollitia architecto ipsum praesentium accusamus perferendis neque alias!</Text>
            <Text opacity={0.8}>Joined February 2023</Text>
            <HStack spacing={5}>
                <Text opacity={0.8}>50 Following</Text>
                <Text opacity={0.8}>520 Followers</Text>
            </HStack>
            <Heading marginY={'50px'} size={'md'}>Your Tweets</Heading>
            {userTweet ? userTweet.map((item, idx) => (
                <VStack key={idx} align={'left'}>
                    <Box>
                        <HStack margin={'10px 20px 20px 10px'} align={'top'}>
                            <Avatar src={item.profilePictureCreator} />
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
                null}
        </VStack>
    )
}

export default Profile