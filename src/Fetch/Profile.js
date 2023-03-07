export const fetchUserTweet = async () => {
    const response = await fetch('http://localhost:4000/usersPost')
    return response.json()
}

export const fetchProfile = async () => {
    const response = await fetch('http://localhost:4000/userAccount')
    return response.json()
}

export const editFriend = async (dataPoint) => {
    const response = await fetch(`http://localhost:4000/userAccount/${dataPoint.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPoint)
    })
    return response.json()
}
