import { Avatar, Box, Button, Heading, HStack, VStack, Text, Image, StackDivider } from '@chakra-ui/react'
import OtherContentLoading from '../Loading/OtherUserContent'
import { BiBookmark } from "react-icons/bi"
import { useWindowSize } from '../Custom/useWindowSize'
import React from 'react'
import { withContent } from '../HOC/withContent'

const BookmarkTitle = () => {
    return (
        <React.Fragment>
            <Heading size={'md'}>Your Saved Content</Heading>
        </React.Fragment>
    )
}

const mainContent = ({
    handleUnBookMark, getBookmark, isBookmarkSuccess,
    isBookmarkLoading, toast
}) => {
    if (isBookmarkLoading) return <OtherContentLoading />

    return (
        <>
            <BookmarkTitle />
            {isBookmarkSuccess && getBookmark ? getBookmark.bookmarkList.map((item, idx) => (
                <VStack key={idx} align={'left'}>
                    <Box>
                        <HStack margin={'10px 20px 20px 10px'} align={'top'}>
                            <Avatar src={item.profilePicture} />
                            <VStack align={'left'}>
                                <Heading size={'md'}>{item.author}</Heading>
                                <Text>{item.description}</Text>
                                <Image borderRadius={'30px'} src={item.imageURL} />
                                <HStack>
                                    <Button onClick={() => {
                                        handleUnBookMark(item)
                                        toast({
                                            title: 'You Unbookmark the content',
                                            status: 'success',
                                            duration: 2000,
                                            isClosable: false,
                                        })
                                    }}>
                                        <BiBookmark /> Unbookmark
                                    </Button>
                                </HStack>
                            </VStack>
                        </HStack>
                    </Box>
                </VStack>
            )) : null}
        </>
    )
}

const BookmarkContent = withContent(mainContent)

function Bookmark() {

    const windowType = useWindowSize()

    return (
        <VStack spacing={4}
            align={'left'}
            divider={< StackDivider borderColor='gray.200' />}
            width={'80%'}
            height={'100vh'}
            padding={windowType === 'Desktop' ? '100px' : '0px'} >
            <BookmarkContent />
        </VStack >
    )
}

export default Bookmark