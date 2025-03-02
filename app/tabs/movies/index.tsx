import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {useMovies} from "@/presentation/hooks/useMovies";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MainSlideshow from "@/presentation/components/movies/MainSlideshow";
import MoviesHorizontalList from "@/presentation/components/movies/MoviesHorizontalList";
import {Stack, useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/config/theme/colors";
import AnimatedTitle from "@/presentation/components/ui/AnimatedTitle";

export default function Screen() {
    const {nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery} = useMovies();
    const safeArea = useSafeAreaInsets()
    const router = useRouter();
    // const text = "Movie Space".split(""); // Split text into individual letters
    const text = "Sample".split(""); // Split text into individual letters

    if (nowPlayingQuery.isLoading)
        return (
            <View style={styles.loader}>
                <ActivityIndicator color="purple" size={40}/>
            </View>
        )

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
            <StatusBar barStyle="light-content"/>
            <Stack.Screen options={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: Colors.background,
                },
                headerShadowVisible: false,
                headerLargeTitle: true,
                title: 'Peliculas',
                headerTintColor: '#fff',
                headerRight: () => (
                    <TouchableOpacity onPress={() => router.push('/tabs/movies/search')}>
                        <Ionicons name="search" size={30} color="#fff" />
                    </TouchableOpacity>
                )
            }}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentInsetAdjustmentBehavior="automatic"
            >
                {
                    nowPlayingQuery.data && nowPlayingQuery.data.length > 0 &&
                    <MainSlideshow movies={nowPlayingQuery.data ?? []}/>
                }

                <View style={{height: 20}}/>
                {/*    Popular */}

                {
                    popularQuery.data && popularQuery.data.length > 0 &&
                    <MoviesHorizontalList title="Populares" movies={popularQuery.data ?? []}/>
                }

                {/*    Popular */}
                {
                    upcomingQuery.data && upcomingQuery.data.length > 0 &&
                    <MoviesHorizontalList title="Proximamente" movies={upcomingQuery.data ?? []}/>
                }

                {/*    Popular */}
                {
                    topRatedQuery.data && topRatedQuery.data.pages?.flat().length > 0 &&
                    <MoviesHorizontalList title="Mejor calificadas" movies={topRatedQuery.data?.pages.flat() ?? []}
                                          loadNextPage={topRatedQuery.fetchNextPage}/>
                }

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginBottom: 2
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        marginHorizontal: 14
    }
})
