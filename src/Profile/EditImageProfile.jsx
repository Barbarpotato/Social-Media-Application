import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    ModalContent, ModalCloseButton, Input, Image
} from '@chakra-ui/react'
import React, { useRef, useState, useEffect } from 'react'
import { convertToBase64 } from '../Home/CreateTweetUser'
import { useCustomMutation } from '../Custom/useCustomMutations'
import { editProfileAccount } from '../Fetch/Account'

function EditImageProfile({ isOpen, onClose, overlay, dataPoint }) {

    const imageRef = useRef(null)
    const [imageURL, setImageUrl] = useState('')
    const [image, setImage] = useState('')

    const { mutate: editImagePorfile } = useCustomMutation(editProfileAccount, 'user-profile')

    useEffect(() => {
        if (image) setImageUrl(URL.createObjectURL(image))
    }, [image])

    const handleEditImage = async () => {
        const base64 = await convertToBase64(image)
        const updateImageObject = { ...dataPoint, profilePicture: base64 }
        editImagePorfile(updateImageObject)
    }

    return (
        <React.Fragment>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>Edit Your Image Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            style={{ display: 'inline' }}
                            accept='image/png, image/jpeg'
                            ref={imageRef}
                            type="file"
                            onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                        {image && <Image src={imageURL} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => {
                            handleEditImage()
                            onClose()
                        }} isDisabled={!image} colorScheme={'purple'} >Edit Image Profile</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment >
    )
}

export default EditImageProfile