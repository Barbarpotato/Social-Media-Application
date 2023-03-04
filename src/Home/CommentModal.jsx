import React, { useState } from 'react'
import { useCustomMutation } from '../Custom/useCustomMutations'
import { commentOtherUserContent } from '../Fetch/OtherUserContent'
import {
    Heading, HStack, Text, Avatar, Modal, ModalOverlay, ModalContent, ModalHeader,
    ModalFooter, ModalBody, ModalCloseButton, Textarea, Button, VStack, useToast
} from '@chakra-ui/react'

function CommentModal({ isOpen, onClose, dataPoint }) {

    const toast = useToast()
    const { mutate: commentOtherPost } = useCustomMutation(commentOtherUserContent, 'user-Content')
    const [tweet, setTweet] = useState('')

    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const handleTweetOtherUserPost = (event) => {
        setTweet(event.target.value)
    }

    const handleReplyTweet = () => {
        //! hardcoded profle data.
        const tweetObject = [
            ...dataPoint.comments, {
                "authorId": parseUserAccount.id,
                "id": dataPoint.comments.length + 1,
                "comment": tweet
            }
        ]
        commentOtherPost({ ...dataPoint, comments: tweetObject })
    }

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack align={'top'}>
                            <Avatar src={dataPoint.profilePicture} />
                            <VStack align={'left'}>
                                <Heading fontSize={'sm'}>{dataPoint.author}</Heading>
                                <Text fontSize={'sm'}>{dataPoint.description}</Text>
                            </VStack>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody paddingX={'30px'}>
                        <Textarea onChange={handleTweetOtherUserPost} resize={'none'} variant={'unstyled'} placeholder={'Tweet Your reply...'} />
                    </ModalBody>
                    <ModalFooter>
                        <Button isDisabled={!tweet} colorScheme='purple' bg={'#885cd4'} mr={3} onClick={() => {
                            handleReplyTweet()
                            toast({
                                title: 'Comment Has Been Sent!',
                                status: 'info',
                                duration: 2000,
                                isClosable: false,
                            })
                            onClose()
                        }}>
                            Reply
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default CommentModal