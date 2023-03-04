import {
    FetchOtherUserContent, likeOtherUserContent,
    NewBookmarkContent, BookmarkContent
} from '../Fetch/OtherUserContent';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQuery, useMutation, useInfiniteQuery } from 'react-query';
import { getBookmarkContent, removeBookmarkContent } from '../Fetch/Bookmark';
import { useCustomMutation } from '../Custom/useCustomMutations';
import React, { useState } from 'react'
import { useWindowSize } from '../Custom/useWindowSize';

const fetchProfile = async () => {
    const response = await fetch('http://localhost:4000/userAccount')
    return response.json()
}

export const withContent = (WrappedComponent) => {
    return (_props) => {

        const toast = useToast()
        const { isOpen: isOpenModalComment, onOpen: onOpenModalComment, onClose: onCloseModalComment } = useDisclosure()

        const [isOpenComment, setIsOpenComment] = useState({ open: false, index: 0, init: true })
        const [dataPoint, setDataPoint] = useState({ profilePicture: '', comment: '', author: '', likes: 0 })

        const parseUserAccount = JSON.parse(sessionStorage.getItem('user-account'))
        const windowType = useWindowSize()

        const { data: profile } = useQuery('user-profile', fetchProfile)

        const { data, isLoading, isSuccess,
            fetchNextPage, isFetchingNextPage } = useInfiniteQuery('user-Content', FetchOtherUserContent, {
                getNextPageParam: (_lastpage, pages) => {
                    const nextPage = pages.length + 1
                    return nextPage
                },
                select: (data) => {
                    let joinData = data.pages
                    for (let x = 0; x < data.pages[data.pages.length - 1].length; x++) {
                        const joinProfile = profile.filter(element => element.id === data.pages[data.pages.length - 1][x].authorId)
                        joinData[data.pages.length - 1][x] = {
                            ...data.pages[data.pages.length - 1][x], author: joinProfile[0].username,
                            profilePicture: joinProfile[0].profilePicture
                        }
                    }
                    return { ...data, pages: joinData }
                }
            })

        const { mutate: newBookmark } = useCustomMutation(NewBookmarkContent, 'bookmark')
        const { mutate: bookmark, isError: errorBookmark } = useMutation(BookmarkContent)
        const { data: getBookmark, isLoading: isBookmarkLoading, isSuccess: isBookmarkSuccess } =
            useQuery('bookmark', getBookmarkContent, {
                select: (data) => {
                    const userData = data.find(element => element.id === parseUserAccount.id)
                    let joinData = []
                    for (let idx = 0; idx < userData.bookmarkList.length; idx++) {
                        const joinProfile = profile.filter(element => {
                            return element.id === userData.bookmarkList[idx].authorId
                        })
                        if (joinProfile) joinData.push({
                            ...userData.bookmarkList[idx], author: joinProfile[0].username,
                            profilePicture: joinProfile[0].profilePicture
                        })
                    }
                    const generateUserData = { ...userData, bookmarkList: joinData }
                    return generateUserData
                }
            })

        const { mutate: removeBookmark } = useCustomMutation(removeBookmarkContent, 'bookmark')

        const { mutate: addLikes } = useCustomMutation(likeOtherUserContent, 'user-Content')

        const handleCommentDisplay = (pointData) => {
            let joinData = []
            for (let idx = 0; idx < pointData.comments.length; idx++) {
                const joinProfile = profile.filter(element => {
                    return element.id === pointData.comments[idx].authorId
                })
                joinData.push(joinProfile[0])
            }
            const comments = pointData.comments.map((element, idx) => {
                return { ...element, profilePicture: joinData[idx].profilePicture, author: joinData[idx].username }
            })
            const newpointData = { ...pointData, comments }
            setDataPoint(newpointData)
            setIsOpenComment({ open: !isOpenComment.open, index: pointData.id })
        }

        const handleLikeButton = (dataPoint, likeContent) => {
            setDataPoint(dataPoint)
            setIsOpenComment({ open: false, index: dataPoint.id })
            const isUserLikeTheContent = likeContent.find(element => element.authorId === parseUserAccount.id)
            if (isUserLikeTheContent) {
                const removeLikesContent = likeContent.filter(element => element.authorId !== isUserLikeTheContent.authorId)
                dataPoint.likes = removeLikesContent
                addLikes(dataPoint)
            } else {
                likeContent.push({ id: likeContent.length, authorId: parseUserAccount.id })
                dataPoint.likes = likeContent
                addLikes(dataPoint)
            }
        }

        const handleBookmark = (dataPoint) => {
            if (!getBookmark) {
                parseUserAccount.bookmarkList = [dataPoint]
                newBookmark(parseUserAccount)
            } else {
                const checkBookmarkContent = getBookmark.bookmarkList.find(element => element.authorId === dataPoint.authorId)
                if (!checkBookmarkContent) {
                    getBookmark.bookmarkList.push(dataPoint)
                    bookmark(getBookmark)
                }
            }
        }

        const handleUnBookMark = (dataPoint) => {
            const PUTbookmarkList = getBookmark.bookmarkList.filter((element) => element.id !== dataPoint.id)
            getBookmark.bookmarkList = PUTbookmarkList
            removeBookmark(getBookmark)
        }

        return (
            <WrappedComponent
                handleBookmark={handleBookmark} handleUnBookMark={handleUnBookMark}
                handleCommentDisplay={handleCommentDisplay} handleLikeButton={handleLikeButton}
                isOpenModalComment={isOpenModalComment} onOpenModalComment={onOpenModalComment} onCloseModalComment={onCloseModalComment}
                dataPoint={dataPoint} setDataPoint={setDataPoint}
                toast={toast} errorBookmark={errorBookmark} windowType={windowType}
                isOpenComment={isOpenComment} setIsOpenComment={setIsOpenComment}
                data={data} isSuccess={isSuccess} isLoading={isLoading}
                fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}
                getBookmark={getBookmark} isBookmarkSuccess={isBookmarkSuccess} isBookmarkLoading={isBookmarkLoading}
            />
        )
    }
}
