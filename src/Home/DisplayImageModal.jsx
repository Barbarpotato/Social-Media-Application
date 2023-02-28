import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image } from '@chakra-ui/react'

function DisplayImageModal({ isOpen, onClose, dataPoint }) {
    return (
        <React.Fragment>
            <Modal size={'6xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={dataPoint.imageURL} height={'100vh'} width={'100vw'} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}

export default DisplayImageModal