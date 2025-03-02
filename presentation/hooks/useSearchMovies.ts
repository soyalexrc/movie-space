import {useQuery} from "@tanstack/react-query";
import {searchMoviesAction} from "@/core/actions/movies/search.action";

export const useSearchMovies = (query: string) => {
    console.log('query', query);
    return useQuery({
        queryKey: ['movies', query, 'search'],
        queryFn: () => searchMoviesAction(query),
        staleTime: 1000 * 60 * 60 * 14 // 24 horas
    })

}
