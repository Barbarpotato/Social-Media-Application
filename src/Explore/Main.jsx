import React, { useEffect } from 'react'
import SearchTweet from './SearchTweet'
import { Text, Heading, VStack, StackDivider, Image, Box, Center, Spinner } from '@chakra-ui/react'
import { useCustomInfiniteQuery } from '../Custom/useCustomInfiniteQuery'
import NewsLoading from '../Loading/NewsLoading'
import { useWindowSize } from '../Custom/useWindowSize'

const FetchNewsData = async ({ pageParam = 1 }) => {
    const response = await fetch(`http://localhost:4000/news?_limit=3&_page=${pageParam}`)
    return response.json()
}

function News() {

    const windowType = useWindowSize()

    const { data: newsData,
        isLoading, isSuccess,
        fetchNextPage, hasNextPage } = useCustomInfiniteQuery('news-content', FetchNewsData)


    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            fetchNextPage()
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (isLoading) {
        return (
            <NewsLoading />
        )
    }

    return (
        <VStack spacing={4}
            align={'left'}
            divider={<StackDivider borderColor='gray.200' />}
            width={'80%'}
            height={'100vh'}
            padding={windowType === 'Desktop' ? '50px' : '0px'} >
            <Heading size={'md'}>Trends For You</Heading>
            <SearchTweet />
            {
                isSuccess &&
                newsData.pages.map(page =>
                    page.map((article, idx) => (
                        <Box padding={'30px'} key={idx}>
                            <Heading size={windowType === 'Desktop' ? 'xl' : 'md'}>#{article.title}</Heading>
                            <Text fontSize={windowType === 'Desktop' ? '2xl' : 'md'}>{article.description}</Text>
                            {article.imageURL ? < Image borderRadius={'10px'} src={article.imageURL} /> : null}
                        </Box>
                    ))
                )
            }
            {hasNextPage ? <Center>
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='purple'
                    size='xl'
                />
            </Center> : null}
        </VStack >
    )
}

export default News