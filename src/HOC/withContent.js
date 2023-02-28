import {
    FetchOtherUserContent, likeOtherUserContent,
    NewBookmarkContent, BookmarkContent
} from '../Fetch/OtherUserContent';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useQuery, useMutation } from 'react-query';
import { getBookmarkContent, removeBookmarkContent } from '../Fetch/Bookmark';
import { useCustomMutation } from '../Custom/useCustomMutations';
import { useCustomInfiniteQuery } from '../Custom/useCustomInfiniteQuery'
import React, { useState } from 'react'

export const withContent = (WrappedComponent) => {
    return (_props) => {

        const toast = useToast()
        const { isOpen: isOpenModalComment, onOpen: onOpenModalComment, onClose: onCloseModalComment } = useDisclosure()

        const [isOpenComment, setIsOpenComment] = useState({ open: false, index: 0, init: true })
        const [dataPoint, setDataPoint] = useState({ profilePicture: '', comment: '', author: '', likes: 0 })

        const userAccount = sessionStorage.getItem('user-account')
        const parseUserAccount = JSON.parse(userAccount)

        const { data, isLoading, isSuccess,
            fetchNextPage, isFetchingNextPage } = useCustomInfiniteQuery('user-Content', FetchOtherUserContent)

        const { mutate: addLikes } = useCustomMutation(likeOtherUserContent, 'user-Content')

        const { data: bookmarkData } = useQuery('bookmark', getBookmarkContent, {
            select: (data) => {
                const userBookmark = data.find(element => element.username === parseUserAccount.username)
                return userBookmark
            }
        })
        const { mutate: newBookmark } = useCustomMutation(NewBookmarkContent, 'bookmark')
        const { mutate: bookmark, isError: errorBookmark } = useMutation(BookmarkContent)

        const { data: getBookmark, isLoading: isBookmarkLoading, isSuccess: isBookmarkSuccess } =
            useQuery('bookmark', getBookmarkContent, {
                select: (data) => {
                    const userData = data.find(element => element.id === parseUserAccount.id)
                    return userData
                }
            })

        const { mutate: removeBookmark } = useCustomMutation(removeBookmarkContent, 'bookmark')

        const handleCommentDisplay = (pointData) => {
            setDataPoint(pointData)
            setIsOpenComment({ open: !isOpenComment.open, index: pointData.id })
        }

        const handleLikeButton = (dataPoint, likeContent) => {
            setDataPoint(dataPoint)
            const isUserLikeTheContent = likeContent.find(element => element.username === parseUserAccount.username)
            if (isUserLikeTheContent) {
                const removeLikesContent = likeContent.filter(element => element.username !== isUserLikeTheContent.username)
                const objectPost = dataPoint
                objectPost.likes = removeLikesContent
                addLikes(objectPost)
            } else {
                const objectPost = dataPoint
                likeContent.push(parseUserAccount)
                objectPost.likes = likeContent
                addLikes(objectPost)
            }
        }

        const handleBookmark = (dataPoint) => {
            if (!bookmarkData) {
                parseUserAccount.bookmarkList = [dataPoint]
                newBookmark(parseUserAccount)
            } else {
                const checkBookmarkContent = bookmarkData.bookmarkList.find(element => element.id === dataPoint.id)
                if (!checkBookmarkContent) {
                    bookmarkData.bookmarkList.push(dataPoint)
                    bookmark(bookmarkData)
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
                toast={toast} errorBookmark={errorBookmark}
                isOpenComment={isOpenComment} setIsOpenComment={setIsOpenComment}
                data={data} isSuccess={isSuccess} isLoading={isLoading}
                fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage}
                getBookmark={getBookmark} isBookmarkSuccess={isBookmarkSuccess} isBookmarkLoading={isBookmarkLoading}
            />
        )
    }
}
