import {Result} from "@/infrastructure/interfaces/moviedb-response.interface";
import {FullMovie, Movie} from "@/infrastructure/interfaces/movie.interface";
import {MovieDBMovieResponse} from "@/infrastructure/interfaces/moviedb-movie-response";
import {TvSeriesSearchResponse} from "@/infrastructure/interfaces/tv-series-search-response";
import {SimpleVideo, VideosResult} from "@/infrastructure/interfaces/moviedb-videos-response";

export class MovieMapper {
    static fromTMDBToMovie = (movie: Result): Movie => {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            rating: movie.vote_average
        }
    }

    static fromTMDBToFullMovie = (movie: MovieDBMovieResponse): FullMovie => {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            rating: movie.vote_average,
            budget: movie.budget,
            duration: movie.runtime,
            genres: movie.genres.map((g) => g.name),
            originalTitle: movie.original_title,
            productionCompanies: movie.production_companies.map((c) => c.name)
        }
    }

    static fromTBDBSeriesToMovie = (series: TvSeriesSearchResponse): FullMovie => {
        return {
            id: series.id,
            title: series.original_name,
            description: series.overview,
            releaseDate: new Date(series.first_air_date),
            poster: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
            backdrop: `https://image.tmdb.org/t/p/w500${series.backdrop_path}`,
            rating: series.vote_average,
            budget: 0,
            duration: 0,
            genres: series.genres.map((g) => g.name),
            originalTitle: series.original_language,
            productionCompanies: series.production_companies.map((c) => c.name)
        }
    }

    static fromTBDBVideosToVideo = (video: VideosResult): SimpleVideo => {
        return {
            id: video.id,
            name: video.name,
            size: video.size,
            url: `https://www.youtube.com/embed/${video.key}?si=M1lz8_U1a-nGliKt`,
            type: video.type
        }
    }
}
