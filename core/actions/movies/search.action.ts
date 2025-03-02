import {movieApi} from "@/core/api/movie-api";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";
import {MovieDBSearchResponse} from "@/infrastructure/interfaces/moviedb-search-response";

export const searchMoviesAction = async (query: string) => {
    try {
        // const {data} =  await movieApi.get<MovieDBSearchResponse>(`/search/multi?query=${encodeURIComponent(query)}&include_adult=true&language=es-MX&page=1`, {
        const {data} =  await movieApi.get<MovieDBSearchResponse>(`/search/movie?query=${encodeURIComponent(query)}&include_adult=true&language=es-MX&page=1`, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`
            }
        });
        const movies = data.results.map(MovieMapper.fromTMDBToMovie);
        return movies;
    } catch (error) {
        console.error(error);
        throw  'Cannot load searched valuesr';
    }
}
