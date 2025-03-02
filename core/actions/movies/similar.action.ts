import {movieApi} from "@/core/api/movie-api";
import {MovieDBMoviesResponse} from "@/infrastructure/interfaces/moviedb-response.interface";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";
import {MovieDBSimilarResponse} from "@/infrastructure/interfaces/moviedb-similar-response";

export const similarMoviesAction = async (movieId: number) => {
    try {
        const {data} =  await movieApi.get<MovieDBSimilarResponse>(`/movie/${movieId}/similar?language=es-MX`);
        const movies = data.results.map(MovieMapper.fromTMDBToMovie);
        return movies;
    } catch (error) {
        console.log(error);
        throw  'Cannot load now playing movies';
    }
}
