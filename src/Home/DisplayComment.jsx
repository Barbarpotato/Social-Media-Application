import React from 'react'
import { VStack, HStack, Text, Heading, Avatar } from '@chakra-ui/react'

function DisplayComment({ dataPoint }) {
    return (
        <React.Fragment>
            {dataPoint.comments.map((item) => (
                <HStack key={item.id}>
                    <Avatar src={item.profilePicture} />
                    <VStack padding={'10px'} align={'left'}>
                        <Heading fontSize={'sm'}>{item.author}</Heading>
                        <Text fontSize={'sm'}>{item.comment}</Text>
                    </VStack>
                </HStack>
            ))
            }
        </React.Fragment>
    )
}

export default DisplayComment