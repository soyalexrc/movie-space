import {movieApi} from "@/core/api/movie-api";
import {MovieDBMoviesResponse} from "@/infrastructure/interfaces/moviedb-response.interface";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";
import {MovieDBMovieResponse} from "@/infrastructure/interfaces/moviedb-movie-response";
import {FullMovie} from "@/infrastructure/interfaces/movie.interface";
import {TvSeriesSearchResponse} from "@/infrastructure/interfaces/tv-series-search-response";

export const getMovieByIdAction = async (id: string | number): Promise<FullMovie> => {
    try {
        const {data} = await movieApi.get<MovieDBMovieResponse>(`/movie/${id}`);
        return MovieMapper.fromTMDBToFullMovie(data);
    } catch (error) {
        console.error(error);
        const {data} = await movieApi.get<TvSeriesSearchResponse>(`/tv/${id}?language=es-MX`);
        return MovieMapper.fromTBDBSeriesToMovie(data)
    }
}
