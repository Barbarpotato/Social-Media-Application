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

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onEmojiClick = (emojiObject, _event) => {
        setText(prevState => prevState + emojiObject.emoji)
    };

    const clearState = () => {
        setImageUrl('')
        setImage('')
        setText('')
    }

    const handlePostTweetUser = async () => {
        let base64 = ''
        try {
            base64 = await convertToBase64(image)
        } catch (_err) {
            base64 = ''
        }
        const postObject = {
            profilePicture: parseUserAccount.profilePicture,
            author: parseUserAccount.username,
            description: text,
            imageURL: base64,
            likes: [],
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
                        colorScheme={'purple'}
                        bg={'#885cd4'}
                        borderRadius={'20px 20px 20px 20px'}
                        width={'70px'} padding={'8px 10px 8px 10px'}>
                        Post
                    </Button>
                </Box>
            </HStack>
            {isOpen ? <Picker height={'300px'} onEmojiClick={onEmojiClick} /> : <></>}
        </VStack >
    )
}

function CreateTweetUser() {

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