import {movieApi} from "@/core/api/movie-api";
import {MovieDBVideosResponse} from "@/infrastructure/interfaces/moviedb-videos-response";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";

export const getMovieVideosAction = async (movieId: number) => {
    try {
        const {data} = await movieApi.get<MovieDBVideosResponse>(`/movie/${movieId}/videos?language=es-MX`);
        return data.results.map(MovieMapper.fromTBDBVideosToVideo);
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies';
    }
}
