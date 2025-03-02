import {ActivityIndicator, Pressable, StyleSheet, Text, View} from "react-native";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {useMovie} from "@/presentation/hooks/useMovie";
import MovieHeader from "@/presentation/components/movie/MovieHeader";
import MovieDescription from "@/presentation/components/movie/MovieDescription";
import MovieCast from "@/presentation/components/movie/MovieCast";
import Animated, {
    interpolate, interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue, withTiming
} from 'react-native-reanimated';
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useRef, useState} from "react";
import {Colors} from "@/config/theme/colors";
import {useSQLiteContext} from "expo-sqlite";
import {drizzle, useLiveQuery} from "drizzle-orm/expo-sqlite";
import * as schema from '@/core/db/schema';
import {FullMovie} from "@/infrastructure/interfaces/movie.interface";
import {eq, ilike} from "drizzle-orm";

export default function Screen() {
    const IMG_HEIGHT = 300
    const {id} = useLocalSearchParams();
    const numberId = +id;
    const {movieQuery, castQuery} = useMovie(numberId);
    const router = useRouter();
    const scrollRef = useRef<Animated.ScrollView>(null);
    const scrollOffset = useSharedValue(0);
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });
    // 🔹 Fade Animation (Initially Hidden)
    const fadeOpacity = useSharedValue(0);
    const [isMovieStored, setIsMovieStored] = useState(false)

    // const { data } = useLiveQuery(
    //     drizzleDb.select().from(schema.movies).where(ilike(schema.movies.movie_id, numberId.toString()))
    // );

    useEffect(() => {
        if (movieQuery.data) {
            fadeOpacity.value = withTiming(1, { duration: 400 });
        }
    }, [movieQuery.data]);

    const fadeInStyle = useAnimatedStyle(() => ({
        opacity: fadeOpacity.value,
    }));

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1],
                    )
                }
            ]
        }
    })

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [IMG_HEIGHT, IMG_HEIGHT + 100], [0, 1])
        }
    })

    const titleAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollOffset.value, [IMG_HEIGHT, IMG_HEIGHT + 50], [1, 0], "clamp")
        };
    });

    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                scrollOffset.value,
                [IMG_HEIGHT, IMG_HEIGHT + 30],
                [Colors.yellow, "transparent"]
            )
        };
    });

    function formatHeaderTitle(title: string) {
        return title.length > 30 ? title.substring(0, 27).concat('...') : title;
    }


    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y;
        },
    });

    async function handleSaveMovieOnList(movie: FullMovie, listId: number) {
        try {
            if (isMovieStored) {
                const result = await drizzleDb.delete(schema.movies).where(eq(schema.movies.movie_id, numberId));
                setIsMovieStored(false);
            } else {
                const result = await drizzleDb
                    .insert(schema.movies).values({
                    ...movie,
                    movie_id: movie.id,
                    releaseDate: new Date(movie.releaseDate).toLocaleDateString('es-MX'),
                    genres: movie.genres.join(' - '),
                    productionCompanies: movie.productionCompanies.join(' - '),
                    list_id: listId,
                });
                setIsMovieStored(true);
            }

        } catch (error) {
            console.log(error)
        }
    }

    async function checkForStoredMovie() {
        try {
            const result = await drizzleDb
                .select()
                .from(schema.movies)
                .where(eq(schema.movies.movie_id, numberId))
            setIsMovieStored(result.length > 0);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        checkForStoredMovie()
    }, []);


    function createSampleList() {
       try {
           console.log('here')
           drizzleDb.insert(schema.lists).values({
               name: 'Favoritos',
           }).execute();
       } catch (error) {
           console.log(error);
       }
    }



    if (movieQuery.isLoading || !movieQuery.data) {
        return (
            <View style={{flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', gap: 4}}>
                <Text>Espere por favor...</Text>
                <ActivityIndicator color="purple" size={30}/>
            </View>
        )
    }

    return (
        <Animated.View style={[styles.container, fadeInStyle]}>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerShown: true,
                    title: '',
                    headerLeft: () => (
                        <Animated.View style={[styles.backButton, buttonAnimatedStyle]}>
                            <Pressable onPress={() => router.dismiss()} >
                                <Ionicons name="arrow-back" size={30} color="#fff"/>
                            </Pressable>
                        </Animated.View>
                    ),
                    headerRight: () => (
                        <Pressable onPress={() => handleSaveMovieOnList(movieQuery.data, 1)}>
                            <Ionicons name="heart" size={30} color={isMovieStored ? 'red' : '#fff'}/>
                        </Pressable>
                    ),
                    headerBackground: () => (
                        <Animated.View style={[styles.header, headerAnimatedStyle]}>
                            <Text style={{
                                paddingBottom: 14,
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>{formatHeaderTitle(movieQuery.data.title)}</Text>
                        </Animated.View>
                    )
                }}
            />
            <Animated.ScrollView onScroll={onScroll} style={{flex: 1}} showsVerticalScrollIndicator={false}
                                 ref={scrollRef} scrollEventThrottle={16}>

                <MovieHeader titleAnimatedStyle={titleAnimatedStyle} animatedImageStyle={imageAnimatedStyle} poster={movieQuery.data.poster} title={movieQuery.data.title} originalTitle={movieQuery.data.originalTitle} />
                <View style={{
                    backgroundColor: Colors.background,
                    // borderTopLeftRadius: 12,
                    // borderTopRightRadius: 12,
                    paddingVertical: 10,
                    // marginTop: -10
                }}>
                    <MovieDescription movie={movieQuery.data}/>
                    <MovieCast cast={castQuery.data ?? []}/>
                </View>
            </Animated.ScrollView>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    backButton: {
        borderRadius: 12,
        padding: 4,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    header: {
        backgroundColor: Colors.background,
        height: 100,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth
    }
})
