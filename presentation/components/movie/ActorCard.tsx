import {Text, View} from "react-native";
import {Cast} from "@/infrastructure/interfaces/cast";
import {Image} from "expo-image";

type Props = {
    actor: Cast
}

export default function ActorCard({actor}: Props) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={{uri: actor.avatar}} style={{
                width: 120, height: 120, borderRadius: '100%',    // Shadow for iOS
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.3,
                shadowRadius: 10,

                // Shadow for Android
                // elevation: 8,
            }}/>

            <View style={{ width: 150 }}>
                <Text numberOfLines={2} adjustsFontSizeToFit style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 14, marginTop: 10, color: '#fff' }}>{actor.name}</Text>
                <Text numberOfLines={2} adjustsFontSizeToFit style={{ color: 'gray', textAlign: 'center', fontSize: 16 }}>{actor.character}</Text>
            </View>
        </View>
    )
}
