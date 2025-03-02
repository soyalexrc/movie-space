// To parse this data:
//
//   import { Convert, MovieDBMoviesResponse } from "./file";
//
//   const movieDBMoviesResponse = Convert.toMovieDBMoviesResponse(json);

import {Result} from "@/infrastructure/interfaces/moviedb-response.interface";

export interface MovieDBSimilarResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}
