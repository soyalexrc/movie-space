export interface MovieDBCreditsResponse {
    id: number;
    cast: TMDBCast[];
    crew: TMDBCast[];
}

export interface TMDBCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    cast_id?: number;
    character?: string;
    credit_id: string;
    order?: string;
    department?:  string;
    job?: string;
}
