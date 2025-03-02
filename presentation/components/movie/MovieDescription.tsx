import {Text, View} from "react-native";
import {FullMovie} from "@/infrastructure/interfaces/movie.interface";
import {Formatter} from "@/config/helpers/formatter";
import {Colors} from "@/config/theme/colors";
import {Ionicons} from "@expo/vector-icons";

type Props = {
    movie: FullMovie
}

export default function MovieDescription({movie}: Props) {
    const {
        poster,
        title,
        originalTitle,
        genres,
        budget,
        productionCompanies,
        description,
        duration,
        id,
        rating,
        backdrop,
        releaseDate
    } = movie;

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                justifyContent: 'center'
            }}>
                <Ionicons name="star" color={Colors.yellow}/>
                <Text style={{
                    fontWeight: 'bold',
                    color: Colors.textGray,
                }}>{rating?.toFixed(2)}</Text>
            </View>
            <Text style={{
                fontWeight: 'bold',
                color: Colors.textGray,
                textAlign: 'center',
                marginVertical: 10
            }}>{releaseDate?.toLocaleDateString('es-MX')} - {duration} Min</Text>

            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: Colors.textGray,
            }}>{genres.join(' - ')}</Text>
            <Text style={{
                fontWeight: 'bold',
                paddingHorizontal: 10,
                color: Colors.textGray,
                marginTop: 10,
            }}>{description}</Text>
            <Text style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: Colors.textGray,
                marginTop: 10,
                fontSize: 20
            }}>{Formatter.currency(budget)}</Text>
        </View>
    )
}
