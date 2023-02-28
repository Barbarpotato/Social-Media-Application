import React from 'react'
import { Avatar, Box, Button, Heading, HStack, VStack, Text, Image } from '@chakra-ui/react'
import { AiFillLike, AiOutlineComment, AiOutlineRetweet } from "react-icons/ai"
import { BiBookmark } from "react-icons/bi";
import OtherContentLoading from "../Loading/OtherUserContent"
import CommentModal from "./CommentModal"
import DisplayComment from "./DisplayComment"
import { withContent } from '../HOC/withContent';

const mainContent = ({
    handleBookmark, handleCommentDisplay, handleLikeButton,
    data, isSuccess, isLoading,
    toast, errorBookmark,
    dataPoint, setDataPoint, isOpenComment,
    onOpenModalComment, onCloseModalComment, isOpenModalComment,
    fetchNextPage, isFetchingNextPage
}) => {

    if (isLoading) return <OtherContentLoading />

    return (
        <React.Fragment>
            <CommentModal onOpen={onOpenModalComment} onClose={onCloseModalComment} isOpen={isOpenModalComment}
                dataPoint={dataPoint}></CommentModal>
            {isSuccess && data.pages.map((content) =>
                content.map((item) => (
                    <VStack key={item.id} align={'left'}>
                        <Box>
                            <HStack margin={'10px 20px 20px 10px'} align={'top'}>
                                <Avatar src={item.profilePicture} />
                                <VStack align={'left'}>
                                    <Heading size={'md'}>{item.author}</Heading>
                                    <Text>{item.description}</Text>
                                    <Image onClick={() => {
                                        setDataPoint(item)
                                    }} borderRadius={'30px'} src={item.imageURL} />
                                    <HStack>
                                        <Button onClick={() => handleCommentDisplay(item)}>
                                            <AiOutlineComment />{item.comments.length}
                                        </Button>
                                        <Button onClick={() => handleLikeButton(item, item.likes)}>
                                            <AiFillLike /> {item.likes.length}
                                        </Button>
                                        <Button onClick={() => {
                                            setDataPoint(item)
                                            onOpenModalComment()
                                        }}>
                                            <AiOutlineRetweet /> Tweet
                                        </Button>
                                        <Button onClick={() => {
                                            handleBookmark(item)
                                            if (errorBookmark) {
                                                toast({
                                                    title: 'Already Bookmark',
                                                    status: 'error',
                                                    duration: 2000,
                                                    isClosable: false,
                                                })
                                            }
                                            else {
                                                toast({
                                                    title: 'You Bookmark the content',
                                                    status: 'success',
                                                    duration: 2000,
                                                    isClosable: false,
                                                })
                                            }
                                        }}>
                                            <BiBookmark /> Bookmark
                                        </Button>
                                    </HStack>
                                    {isOpenComment.open && item.id === isOpenComment.index ?
                                        < DisplayComment dataPoint={dataPoint} />
                                        :
                                        null
                                    }
                                </VStack>
                            </HStack>
                        </Box >
                    </VStack >
                ))
            )
            }
            <Button colorScheme={'white'}
                width={'100%'}
                bg={'white'}
                color={'#1DA1F2'} disabled={isFetchingNextPage}
                marginTop={'10px'} size={'lg'}
                borderRadius={'10px'}
                onClick={() => fetchNextPage()}>More</Button>
        </React.Fragment >
    )
}

const HomeContent = withContent(mainContent)

function OhterUserContent() {

    return (
        <React.Fragment>
            <HomeContent />
        </React.Fragment >
    )
}
export default OhterUserContent