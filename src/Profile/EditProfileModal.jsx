import {
    Modal, ModalHeader, ModalBody, ModalFooter, Text, Button,
    ModalContent, ModalCloseButton, Input, Textarea, useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useCustomMutation } from '../Custom/useCustomMutations'
import { editProfileAccount } from '../Fetch/Account'

function EditProfileModal({ isOpen, onClose, overlay, dataPoint }) {

    const [username, setUsername] = useState(dataPoint.username)
    const [email, setEmail] = useState(dataPoint.email)
    const [desc, setDesc] = useState(dataPoint.description)

    const toast = useToast()

    const { mutate: editProfile } = useCustomMutation(editProfileAccount, 'user-profile')

    const isUsernameValid = () => {
        if (username.length < 5 || username.length > 15) return false
        else return true
    }

    const isEmailValid = () => {
        return /^[\w.+-]+@gmail\.com$/.test(email)
    }

    const isDescValid = () => {
        if (desc.length < 5 || username.length > 300) return false
        else return true
    }

    const handleEditProfile = () => {
        const objectPost = { ...dataPoint, username, email, description: desc }
        editProfile(objectPost)
    }

    return (
        <React.Fragment>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Change Your Username:</Text>
                        <Input onChange={(e) => setUsername(e.target.value)} value={username}
                            marginTop={'10px'} focusBorderColor='purple' placeholder='Username' />
                        {isUsernameValid() ? null : <Text color={'red'}><strong>Invalid Username</strong></Text>}
                        <Text>Change Your Email Address:</Text>
                        <Input onChange={(e) => setEmail(e.target.value)} value={email}
                            marginY={'10px'} focusBorderColor='purple' placeholder='Email Address' />
                        {isEmailValid() ? null : <Text color={'red'}><strong>Invalid Email Address</strong></Text>}
                        <Text>Change Your Description:</Text>
                        <Textarea onChange={(e) => setDesc(e.target.value)} rows={10} value={desc}
                            marginY={'10px'} focusBorderColor='purple' placeholder='Description...' />
                        {isDescValid() ? null : <Text color={'red'}><strong>Invalid Descrtiption</strong></Text>}
                    </ModalBody>
                    <ModalFooter>
                        <Button isDisabled={!isDescValid() || !isEmailValid() || !isUsernameValid()} colorScheme={'purple'} onClick={() => {
                            handleEditProfile()
                            toast({
                                description: 'Success Edit Profile Data!',
                                status: 'success',
                                duration: 1000,
                                isClosable: false,
                            })
                            onClose()
                        }}>Edit Profile</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default EditProfileModal