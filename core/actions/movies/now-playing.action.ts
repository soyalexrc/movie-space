import {movieApi} from "@/core/api/movie-api";
import {MovieDBMoviesResponse} from "@/infrastructure/interfaces/moviedb-response.interface";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";

export const nowPlayingAction = async () => {
    try {
        const {data} =  await movieApi.get<MovieDBMoviesResponse>('/movie/now_playing');
        const movies = data.results.map(MovieMapper.fromTMDBToMovie);
        return movies;
    } catch (error) {
        console.log(error);
        throw  'Cannot load now playing movies';
    }
}
