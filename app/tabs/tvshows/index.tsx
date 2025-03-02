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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 30 }}>Vista en proceso....</Text>
        </View>
    )

    return (
        <View style={{flex: 1, backgroundColor: Colors.background}}>
            <StatusBar barStyle="light-content"/>
            <Stack.Screen options={{headerShown: false}}/>
            <View style={{paddingTop: safeArea.top, paddingBottom: safeArea.bottom + 10}}>
                <View style={styles.header}>
                    {/*<View style={{ width: 30 }} />*/}
                    <TouchableOpacity onPress={() => router.push('/tabs/favorites')}>
                        <Ionicons name="heart" size={30} color="#fff"/>
                    </TouchableOpacity>
                    {/*<View style={{ flexDirection: "row", gap: 2 }}>*/}
                    {/*    {text.map((letter, index) => (*/}
                    {/*        <AnimatedTitle key={index + letter} delay={index * 1500}>{letter}</AnimatedTitle>*/}
                    {/*    ))}*/}
                    {/*</View>*/}
                    {/*<View style={{ flexDirection: "row", gap: 2 }}>*/}
                    {/*    {text.map((letter, index) => (*/}
                    {/*        <Text key={index} style={{ color: "#fff", fontSize: 30, fontWeight: "bold" }}>*/}
                    {/*            {letter === " " ? " " : <AnimatedTitle delay={index * 150}>{letter}</AnimatedTitle>}*/}
                    {/*        </Text>*/}
                    {/*    ))}*/}
                    {/*</View>*/}
                    <View style={{flexDirection: 'row', gap: 10}}>
                        <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
                            <Text style={{color: Colors.yellow}}>TV</Text> Shows
                        </Text>
                        {/*<Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>*/}
                        {/*    <Text style={{ color: Colors.yellow }}>S</Text>pace*/}
                        {/*</Text>*/}
                    </View>
                    <TouchableOpacity onPress={() => router.push('/tabs/tvshows/search')}>
                        <Ionicons name="search" size={30} color="#fff"/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <MainSlideshow movies={nowPlayingQuery.data ?? []}/>

                    <View style={{height: 20}}/>
                    {/*    Popular */}
                    <MoviesHorizontalList title="Populares" movies={popularQuery.data ?? []}/>


                    {/*    Popular */}
                    <MoviesHorizontalList title="Proximamente" movies={upcomingQuery.data ?? []}/>

                    {/*    Popular */}
                    <MoviesHorizontalList title="Mejor calificadas" movies={topRatedQuery.data?.pages.flat() ?? []}
                                          loadNextPage={topRatedQuery.fetchNextPage}/>

                </ScrollView>
            </View>
        </View>
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
