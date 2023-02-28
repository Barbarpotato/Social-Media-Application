import { useMutation, useQueryClient } from "react-query"

export const useCustomMutation = (postFunction, queryKey) => {
    const queryClient = useQueryClient()
    return useMutation(postFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}