import {movieApi} from "@/core/api/movie-api";
import {MovieDBMoviesResponse} from "@/infrastructure/interfaces/moviedb-response.interface";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";

export const popularMoviesAction = async () => {
    try {
        const {data} =  await movieApi.get<MovieDBMoviesResponse>('/movie/popular');
        const movies = data.results.map(MovieMapper.fromTMDBToMovie);
        return movies;
    } catch (error) {
        console.log(error);
        throw  'Cannot load now playing movies';
    }
}
