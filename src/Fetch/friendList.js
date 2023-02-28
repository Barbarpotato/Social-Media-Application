export const getFriendList = async () => {
    const response = await fetch('http://localhost:4000/friendList')
    return response.json()
}

export const postFriendList = async (postData) => {
    const response = await fetch('http://localhost:4000/friendList',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    return response.json()
}

export const manageFriend = async (dataPoint) => {
    const response = await fetch(`http://localhost:4000/friendList/${dataPoint.id}`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPoint)
    })
    return response.json()
} 