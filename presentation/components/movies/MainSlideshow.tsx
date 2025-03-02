import {StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {Movie} from "@/infrastructure/interfaces/movie.interface";
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel'
import {useRef} from "react";
import MoviePoster from "@/presentation/components/movies/MoviePoster";

type Props = {
    movies: Movie[]
}

export default function MainSlideshow({movies}: Props) {
    const carouselRef = useRef<ICarouselInstance>(null)
    const { width, height } = useWindowDimensions()
    return (
        <View style={{
            width,
            marginTop: -30
        }}>
            <Carousel
                ref={carouselRef}
                data={movies}
                renderItem={({ item }) => <MoviePoster poster={item.poster} id={item.id} />}
                width={width}
                height={height * .55}
                mode="parallax"
                autoPlay
                autoPlayInterval={3500}
                snapEnabled
                modeConfig={{
                    parallaxScrollingOffset: 100,
                    parallaxScrollingScale: 0.8
                }}
                defaultIndex={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250
    }
})
