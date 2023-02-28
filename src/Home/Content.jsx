import React, { memo } from 'react'
import { Heading, VStack, StackDivider } from '@chakra-ui/react'
import CreateTweetUser from './CreateTweetUser'
import { useWindowSizeContext } from '../Context/WindowSizeContext'
import OhterUserContent from './OhterUserContent'

const TitlePage = () => {
    return (
        <React.Fragment>
            <Heading size={'md'}>Home</Heading>
        </React.Fragment>
    )
}

function Content() {
    console.log('render content')

    const windowType = useWindowSizeContext()

    return (
        <VStack
            spacing={4}
            align={'left'}
            divider={<StackDivider borderColor='gray.200' />}
            width={windowType === 'Desktop' ? '50%' : '80%'}
            height={'100vh'}
            padding={'15px 5px 5px 15px'}>
            <TitlePage />
            <CreateTweetUser />
            <OhterUserContent />
        </VStack>
    )
}
//? memo : Prevent unnecessary re-rendet when the props are the same.
export default memo(Content)