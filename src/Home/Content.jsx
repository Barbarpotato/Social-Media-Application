import React, { memo } from 'react'
import { Heading, VStack, StackDivider } from '@chakra-ui/react'
import CreateTweetUser from './CreateTweetUser'
import OhterUserContent from './OhterUserContent'

function Content() {

    const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))

    return (
        <VStack
            spacing={4}
            align={'left'}
            divider={<StackDivider borderColor='gray.200' />}
            width={"80%"}
            height={'100vh'}
            padding={'0px'}>
            <Heading size={'md'}>Home</Heading>
            <CreateTweetUser />
            <OhterUserContent />
        </VStack>
    )
}
//? memo : Prevent unnecessary re-render when the props are the same.
export default memo(Content)