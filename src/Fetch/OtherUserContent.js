export const FetchOtherUserContent = async ({ pageParam = 1 }) => {
    const response = await fetch(`http://localhost:4000/usersPost?_limit=2&_page=${pageParam}`)
    return response.json()
}

export const postTweet = async (postObject) => {
    const response = await fetch(`http://localhost:4000/usersPost/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObject)
    })
    return response.json()
}

export const likeOtherUserContent = async (dataPoint) => {
    const response = await fetch(`http://localhost:4000/usersPost/${dataPoint.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPoint)
        })
    return response.json()
}

export const commentOtherUserContent = async (dataPoint) => {
    const response = await fetch(`http://localhost:4000/usersPost/${dataPoint.id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...dataPoint })
        })
    return response.json()
}

export const NewBookmarkContent = async (postObject) => {
    const response = await fetch(`http://localhost:4000/bookmark`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObject)
    })
    return response.json()
}

export const BookmarkContent = async (postObject) => {
    const response = await fetch(`http://localhost:4000/bookmark/${postObject.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postObject)
    })
    return response.json()
}