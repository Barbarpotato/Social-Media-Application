import React from 'react'
import { Box, VStack, HStack, Text, Heading, Avatar } from '@chakra-ui/react'

function DisplayComment({ dataPoint }) {
    return (
        <Box id=''>
            {dataPoint.comments.map(item => (
                <HStack>
                    <Avatar src={item.profilePicture} />
                    <VStack padding={'10px'} align={'left'}>
                        <Heading fontSize={'sm'}>{item.author}</Heading>
                        <Text fontSize={'sm'}>{item.comment}</Text>
                    </VStack>
                </HStack>
            ))
            }
        </Box >
    )
}

export default DisplayComment