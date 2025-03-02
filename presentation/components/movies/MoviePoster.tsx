import {Pressable, StyleSheet, useWindowDimensions, View} from "react-native";
import { Image } from "expo-image";
import {useRouter} from "expo-router";

type Props = {
    id: number;
    poster: string;
    smallPoster?: boolean;
};

export default function MoviePoster({ poster, smallPoster = false, id }: Props) {
    const router = useRouter();
    const {width, height} = useWindowDimensions();
    return (
        <Pressable
            onPress={() => router.push(`/tabs/movies/${id}`)}
            style={({ pressed }) => [
                styles.pressable,
                pressed && styles.pressed // Active state effect (opacity)
            ]}
        >
            <Image
                source={{ uri: poster }}
                contentFit='cover'
                style={[
                    styles.poster,
                    {
                        width: smallPoster ? width * .29 : width,
                        height: smallPoster ? height * .22 : height * 0.6,
                        borderRadius: smallPoster ? 12 : 20
                    },
                ]}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    poster: {
        width: "100%",
        height: "100%",
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.3, // Shadow visibility
        shadowRadius: 6, // Blur effect
        elevation: 6, // Required for Android shadow
    },
    pressable: {
        borderRadius: 12, // Ensures shadow follows the shape
        overflow: "hidden", // Prevents shadow being cut off
    },
    pressed: {
        opacity: 0.9, // Reduces opacity on press
    },
});
