import React from 'react'
import { Heading, Button } from '@chakra-ui/react'

function TweetButton() {
    return (
        <Button colorScheme={'blue'}
            marginTop={'20%'}
            borderRadius={'20px 20px 20px 20px'}
            width={'100%'} padding={'8px 10px 8px 10px'}
            bg={'#1DA1F2'} >
            <Heading color={'white'} as={'h1'} size='md' alignItems={'center'}>
                Tweet
            </Heading>
        </Button >

    )
}

export default TweetButton