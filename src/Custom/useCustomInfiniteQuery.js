import { useInfiniteQuery } from "react-query";

export const useCustomInfiniteQuery = (queryKey, fetcherFunction) => {
    return useInfiniteQuery(queryKey, fetcherFunction,
        {
            getNextPageParam: (_lastpage, pages) => {
                const nextPage = pages.length + 1
                return nextPage
            }
        })
}