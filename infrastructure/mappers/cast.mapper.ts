import {TMDBCast} from "@/infrastructure/interfaces/moviedb-credits-response";
import {Cast} from "@/infrastructure/interfaces/cast";

export default class CastMapper {
    static fromTMDBCastToEntity(actor: TMDBCast): Cast {
        return {
            id: actor.id,
            avatar: actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : `https://i.stack.imgur.com/l60Hf.png`,
            name: actor.name,
            character: actor.character ?? 'No Character'
        }
    }
}
