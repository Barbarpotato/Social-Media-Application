import React from 'react'
import {
    Box, SkeletonCircle, SkeletonText
} from '@chakra-ui/react'

function OtherContentLoading() {
    return (
        <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' marginTop={'20px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonCircle size='10' marginTop={'20px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonCircle size='10' marginTop={'20px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonCircle size='10' marginTop={'20px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
            <SkeletonCircle size='10' marginTop={'20px'} />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    )
}

export default OtherContentLoading