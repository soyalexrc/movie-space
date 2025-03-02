import {ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View} from "react-native";
import {Movie} from "@/infrastructure/interfaces/movie.interface";
import {FlashList} from "@shopify/flash-list";
import MoviePoster from "@/presentation/components/movies/MoviePoster";
import {useEffect, useRef} from "react";

type Props = {
    movies: Movie[];
    title: string;

    loadNextPage?: () => void;
}

export default function MoviesHorizontalList({movies, title, loadNextPage}: Props) {
    const isLoading = useRef(false)

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200)
    }, [movies]);

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isLoading.current) return;

        const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

        const isEndReached = (contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;

        if (!isEndReached) return;

        isLoading.current = true;

        loadNextPage && loadNextPage()

    }

    return (
        <View style={styles.list}>
            <Text style={styles.title}>{title}</Text>
            <FlashList
                horizontal
                onScroll={onScroll}
                showsHorizontalScrollIndicator={false}
                data={movies}
                estimatedItemSize={100}
                keyExtractor={(item, i) => `${item.id}-${i}`}
                ItemSeparatorComponent={() => <View style={{width: 10}}/>}
                renderItem={({item}) => <MoviePoster poster={item.poster} id={item.id} smallPoster/>}
                ListFooterComponent={() => isLoading.current ? <ActivityIndicator size="large" color="#ff0000" style={styles.loader} /> : null}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginBottom: 20,
        height: 250,
        minHeight: 250,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 20
    },
    loader: {
        marginLeft: 20, // Adjust spacing
        paddingVertical: 20, // Space below loader
    },
})
