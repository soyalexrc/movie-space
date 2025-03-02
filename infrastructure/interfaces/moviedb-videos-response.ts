export interface MovieDBVideosResponse {
    id:      number;
    results: VideosResult[];
}

export interface VideosResult {
    iso_639_1:    string;
    iso_3166_1:   string;
    name:         string;
    key:          string;
    site:         string;
    size:         number;
    type:         string;
    official:     boolean;
    published_at: Date;
    id:           string;
}

export interface SimpleVideo {
    name: string;
    size: number;
    url: string;
    type: string;
    id: string;
}
