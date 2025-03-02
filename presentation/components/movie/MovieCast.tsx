import {Text, View} from "react-native";
import {Cast} from "@/infrastructure/interfaces/cast";
import {FlashList} from "@shopify/flash-list";
import ActorCard from "@/presentation/components/movie/ActorCard";

type Props = {
    cast: Cast[]
}

export default function MovieCast({cast}: Props) {
    return (
        <View style={{marginTop: 10, height: 250, minHeight: 250}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, paddingHorizontal: 10, color: '#fff', marginBottom: 20}}>Actores</Text>

            <FlashList
                data={cast}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                estimatedItemSize={20}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <ActorCard actor={item} />}
            />
        </View>
    )
}
