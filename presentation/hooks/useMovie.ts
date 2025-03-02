import {useQuery} from "@tanstack/react-query";
import {getMovieByIdAction} from "@/core/actions/movie/get-movie-by-id.action";
import {getMovieCastAction} from "@/core/actions/movie/get-movie-cast.action";
import {getMovieVideosAction} from "@/core/actions/movie/get-movie-videos.action";
import {similarMoviesAction} from "@/core/actions/movies/similar.action";

export const useMovie = (id: number) => {
    const movieQuery =  useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieByIdAction(id),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const castQuery = useQuery({
        queryKey: ['movie', id, 'cast'],
        queryFn: () => getMovieCastAction(id),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const videosQuery = useQuery({
        queryKey: ['movie', id, 'videos'],
        queryFn: () => getMovieVideosAction(id),
        staleTime: 1000 * 60 * 60 * 24,
    })

    const similarMoviesQuery = useQuery({
        queryKey: ['movie', id, 'similar'],
        queryFn: () => similarMoviesAction(id),
        staleTime: 1000 * 60 * 60 * 24,
    })


    return {
        movieQuery,
        castQuery,
        videosQuery,
        similarMoviesQuery
    }
}
