export const FetchTweetUser = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=1000`)
    return response.json()
}

export const FetchRandomUserSuggest = async () => {
    const response = await fetch(`https://randomuser.me/api/?results=5`)
    return response.json()
}