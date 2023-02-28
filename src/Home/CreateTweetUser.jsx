import React, { useState, useRef, useEffect } from 'react'
import { GrEmoji, GrGallery } from "react-icons/gr";
import Picker from 'emoji-picker-react';
import { Box, HStack, Avatar, Textarea, VStack, Button, Image, useToast } from '@chakra-ui/react'
import { postTweet } from '../Fetch/OtherUserContent';
import { useCustomMutation } from '../Custom/useCustomMutations';
import { useWindowSizeContext } from '../Context/WindowSizeContext';
import './CustomInputImage.css';

const TextAreaTweet = () => {

    const windowType = useWindowSizeContext()
    const toast = useToast()
    const [text, setText] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState('')
    const [imageURL, setImageUrl] = useState('')
    const inputFile = useRef(null);

    const userAccount = sessionStorage.getItem('user-account')
    const parseUserAccount = JSON.parse(userAccount)

    const { mutate: postUserTweet } = useCustomMutation(postTweet)

    useEffect(() => {
        if (image) setImageUrl(URL.createObjectURL(image))
    }, [image])

    const onEmojiClick = (emojiObject, _event) => {
        setText(prevState => prevState + emojiObject.emoji)
    };

    const clearState = () => {
        setImageUrl('')
        setImage('')
        setText('')
    }

    const handlePostTweetUser = () => {
        //! Hardcoded object
        const postObject = {
            profilePicture: "https://randomuser.me/api/portraits/med/men/50.jpg",
            author: parseUserAccount.username,
            description: text,
            imageURL: imageURL,
            likes: 0,
            comments: []
        }
        if (!text) return null
        else {
            postUserTweet(postObject)
            return true
        }
    }

    return (
        <VStack align={'left'}>
            <Textarea onFocus={() => setIsOpen(false)} id='text-area' resize={'none'} placeholder={'What`s Happening?'}
                value={text}
                size={'lg'}
                rows={4}
                variant={'unstyled'} onChange={(e) => setText(e.target.value)} />
            {imageURL &&
                <Box>
                    <Button size={'xs'} colorScheme={'gray'} onClick={() => setImageUrl('')}>Remove</Button>
                    <Image boxSize={'230px'} src={imageURL}></Image>
                </Box>
            }
            <HStack>
                <Button colorScheme={'gray'} onClick={() => {
                    setIsOpen(false)
                    inputFile.current.click()
                }}>
                    <GrGallery />
                </Button>
                <input
                    ref={inputFile}
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }}
                />
                {windowType === 'Desktop' ?
                    <React.Fragment>
                        <Button onClick={() => setIsOpen(!isOpen)}>
                            <GrEmoji />
                        </Button>
                    </React.Fragment> : null}
                <Box>
                    <Button onClick={() => {
                        setIsOpen(false)
                        const valid = handlePostTweetUser()
                        if (!valid) {
                            toast({
                                title: 'Failed',
                                description: "Unable to post the the tweet due empty messages",
                                status: 'error',
                                duration: 2000,
                                isClosable: false,
                            })
                        } else {
                            toast({
                                title: 'Published Tweet!',
                                status: 'info',
                                duration: 2000,
                                isClosable: false,
                            })
                        }
                        clearState()
                    }}
                        colorScheme={'blue'}
                        bg={'#1DA1F2'}
                        borderRadius={'20px 20px 20px 20px'}
                        width={'70px'} padding={'8px 10px 8px 10px'}>
                        Tweet
                    </Button>
                </Box>
            </HStack>
            {isOpen ? <Picker height={'300px'} onEmojiClick={onEmojiClick} /> : <></>}
        </VStack >
    )
}

function CreateTweetUser() {

    console.log('render crete tweet')

    return (
        <React.Fragment>
            <HStack>
                <Box position={'static'} width={'10%'}>
                    <Avatar size={'sm'} />
                </Box>
                <Box width={'70%'}>
                    <TextAreaTweet />
                </Box>
            </HStack>
        </React.Fragment>
    )
}

export default CreateTweetUser