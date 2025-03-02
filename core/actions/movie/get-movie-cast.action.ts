import {movieApi} from "@/core/api/movie-api";
import {MovieDBCreditsResponse} from "@/infrastructure/interfaces/moviedb-credits-response";
import CastMapper from "@/infrastructure/mappers/cast.mapper";

export const getMovieCastAction = async (movieId: number) => {
    try {
        const {data} = await movieApi.get<MovieDBCreditsResponse>(`/movie/${movieId}/credits`);
        return data.cast.map(CastMapper.fromTMDBCastToEntity);
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies';
    }
}
