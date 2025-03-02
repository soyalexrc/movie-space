import {
    Alert,
    Dimensions,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View
} from "react-native";
import {Colors} from "@/config/theme/colors";
import {Ionicons} from "@expo/vector-icons";
import {Stack, useFocusEffect, useRouter} from "expo-router";
import {useMovies} from "@/presentation/hooks/useMovies";
import {FlashList, MasonryFlashList} from "@shopify/flash-list";
import {Image} from "expo-image";
import {useLiveQuery} from "drizzle-orm/expo-sqlite";
import {useSQLiteContext} from "expo-sqlite";
import {drizzle} from "drizzle-orm/expo-sqlite/index";
import * as schema from "@/core/db/schema";
import {eq} from "drizzle-orm";
import {useCallback, useEffect, useState} from "react";
import * as ContextMenu from 'zeego/context-menu'

const {width} = Dimensions.get('window')

export default function Screen() {
    const router = useRouter();
    const db = useSQLiteContext();
    const [selectedList, setSelectedList] = useState<number>(0)
    const drizzleDb = drizzle(db, { schema });
    const [data, setData] = useState<any[]>([])

    const { data: lists } = useLiveQuery(
        drizzleDb.select().from(schema.lists)
    )

    async function getMoviesFromDB() {
        try {
            const result = await drizzleDb.select().from(schema.movies).where(selectedList > 0 ? eq(schema.movies.list_id, selectedList) : undefined)
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteList(list: { name: string, id: number }) {
        try {
            Alert.alert(`Eliminar lista: ${list.name}`, 'Se eliminaran las peliculas dentro de la misma', [
                {
                    style: 'default',
                    text: 'Cancelar',
                    isPreferred: true,
                },
                {
                    style: 'destructive',
                    text: 'Eliminar',
                    onPress: async () => {
                        await drizzleDb.delete(schema.movies).where(eq(schema.movies.list_id, list.id))
                        await drizzleDb.delete(schema.lists).where(eq(schema.lists.id, list.id))
                        setSelectedList(0)
                    }
                }
            ])
        } catch (error) {
            console.error(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getMoviesFromDB();
        }, [selectedList]) // Dependency array
    );


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: Colors.background
                    },
                    headerTitle: () => (
                        <View style={styles.header}>
                            <Ionicons name="heart" color={Colors.yellow} size={30} />
                            <Text style={styles.title}>Favoritos</Text>
                        </View>
                    )
            }}
            />

            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ height: 30, marginVertical: 10 }}>
                    <TouchableOpacity onPress={() => setSelectedList(0)} style={{ backgroundColor: selectedList === 0 ? 'lightgray' : 'gray', borderRadius: 12, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12, height: 30 }} >
                        <Text style={{ fontWeight: 'bold' }}>Todos</Text>
                    </TouchableOpacity>

                    {
                        lists.map(list => (
                            <ContextMenu.Root key={list.name}>
                                <ContextMenu.Trigger>
                                    <TouchableOpacity onPress={() => setSelectedList(list.id)} style={{ backgroundColor: selectedList === list.id ? 'lightgray' : 'gray', marginRight: 12, borderRadius: 12, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', height: 30 }} >
                                        <Text style={{ fontWeight: 'bold' }}>{list.name}</Text>
                                    </TouchableOpacity>
                                </ContextMenu.Trigger>
                                <ContextMenu.Content>
                                    {/*<ContextMenu.Label />*/}
                                    <ContextMenu.Item key="Editar" onSelect={() => router.push({ pathname: '/createList', params: { name: list.name, id: list.id.toString() } })}>
                                        <ContextMenu.ItemTitle>Cambiar nombre</ContextMenu.ItemTitle>
                                    </ContextMenu.Item>
                                    <ContextMenu.Item key="Eliminar" destructive onSelect={() => handleDeleteList(list)}>
                                        <ContextMenu.ItemTitle>Eliminar</ContextMenu.ItemTitle>
                                    </ContextMenu.Item>
                                    <ContextMenu.Arrow />
                                </ContextMenu.Content>
                            </ContextMenu.Root>

                        ))
                    }

                    <TouchableOpacity onPress={() => router.push('/createList')} style={{ backgroundColor: 'lightgray', borderRadius: 12, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', height: 30 }} >
                        <Text style={{ fontWeight: 'bold' }}>Nueva lista + </Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            <View style={{ flex: 1 }}>
                <FlashList
                    data={data ?? []}
                    numColumns={2}
                    estimatedItemSize={250} // Set an estimated item height
                    renderItem={({item}) => (
                        <Pressable onPress={() => router.push(`/tabs/favorites/${item.movie_id}`)} style={[styles.card, { height: 250 }]}>
                            <Image
                                source={{ uri: item.poster }}
                                style={styles.image}
                            />
                        </Pressable>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24
    },
    card: {
        borderRadius: 10,
        width: width * 0.5,
        padding: 5,
    },
    image: {
        width: '100%',
        height: "100%",
        borderRadius: 10,
    },
    movieTitle: {
        color: "#fff",
        padding: 8,
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    backButton: {
        // backgroundColor: Colors.yellow,
        borderRadius: 12,
        padding: 4,
    },
});
