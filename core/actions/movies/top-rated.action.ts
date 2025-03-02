import {movieApi} from "@/core/api/movie-api";
import {MovieDBMoviesResponse} from "@/infrastructure/interfaces/moviedb-response.interface";
import {MovieMapper} from "@/infrastructure/mappers/movie.mapper";

type Props = {
    page?: number;
    limit?: number;
}

export const topRatedAction = async ({limit = 10, page = 1}: Props) => {
    try {
        const {data} = await movieApi.get<MovieDBMoviesResponse>('/movie/top_rated', {
            params: {
                page,
                limit
            }
        });
        const movies = data.results.map(MovieMapper.fromTMDBToMovie);
        return movies;
    } catch (error) {
        console.log(error);
        throw 'Cannot load now playing movies';
    }
}
