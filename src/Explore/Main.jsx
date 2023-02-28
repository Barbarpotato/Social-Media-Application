import React from 'react'
import { Text, Heading, VStack, StackDivider, Image, Box, Button } from '@chakra-ui/react'
import { useCustomInfiniteQuery } from '../Custom/useCustomInfiniteQuery'
import NewsLoading from '../Loading/NewsLoading'
import { useWindowSize } from '../Custom/useWindowSize'

const TrendTitle = () => {
    return (
        <React.Fragment>
            <Heading size={'md'}>Trends For You</Heading>
        </React.Fragment>
    )
}

const FetchNewsData = async ({ pageParam = 1 }) => {
    const response = await fetch(`http://localhost:4000/news?_limit=3&_page=${pageParam}`)
    return response.json()
}

function News() {

    const windowType = useWindowSize()

    const { data: newsData,
        isLoading, isSuccess,
        fetchNextPage, isFetchingNextPage } = useCustomInfiniteQuery('news-content', FetchNewsData)

    if (isLoading) {
        return (
            <NewsLoading />
        )
    }

    return (
        <VStack spacing={4}
            align={'left'}
            divider={<StackDivider borderColor='gray.200' />}
            width={windowType === 'Desktop' ? '50%' : '80%'}
            height={'100vh'}
            padding={'15px 5px 5px 15px'} >
            <TrendTitle />
            {
                isSuccess &&
                newsData.pages.map(page =>
                    page.map((article, idx) => (
                        <Box padding={'30px'} key={idx}>
                            <Heading size={'xl'}>#{article.title}</Heading>
                            <Text fontSize={'2xl'}>{article.description}</Text>
                            {article.imageURL ? < Image borderRadius={'10px'} src={article.imageURL} /> : null}
                        </Box>
                    ))
                )
            }
            <Button colorScheme={'white'}
                width={'100%'}
                bg={'white'}
                color={'#1DA1F2'} disabled={isFetchingNextPage}
                marginTop={'10px'} size={'lg'}
                borderRadius={'10px'}
                onClick={() => fetchNextPage()}>Show More...</Button>
        </VStack >
    )
}

export default News