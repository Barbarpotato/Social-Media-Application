export const getBookmarkContent = async ({ pageParam = 1 }) => {
    const response = await fetch('http://localhost:4000/bookmark')
    return response.json()
}

export const removeBookmarkContent = async (dataPoint) => {
    const response = await fetch(`http://localhost:4000/bookmark/${dataPoint.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPoint)
    })
    return response.json()
}