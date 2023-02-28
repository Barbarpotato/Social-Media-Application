export const userAccount = async () => {
    const response = await fetch(`http://localhost:4000/userAccount`)
    return response.json()
}

export const addAccount = async (postData) => {
    const response = await fetch(`http://localhost:4000/userAccount`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    return response.json()
}