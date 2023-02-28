import { useQuery } from "react-query";

export const useCustomQuery = (queryKey, fetcherFunction, dataReturn) => {
    return useQuery(queryKey, fetcherFunction,
        {
            staleTime: 300000,
            refetchInterval: 300000,
            refetchOnWindowFocus: false,
            select: dataReturn
        })
}