import { Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { Colors } from "@/config/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMovies } from "@/presentation/hooks/useMovies";
import { Image } from "expo-image";
import { useSearchMovies } from "@/presentation/hooks/useSearchMovies";
import { useState, useCallback } from "react";
import { debounce } from "lodash";

export default function Screen() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading, error, refetch } = useSearchMovies(searchTerm);

    // Memoized debounced function
    const handleSearch = useCallback(
        debounce((query) => {
            refetch(); // Fetch search results
        }, 500),
        [refetch]
    );

    // Updates state and triggers debounced search
    const onChangeSearch = (text: string) => {
        setSearchTerm(text);
        handleSearch(text);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
            <View
                style={{
                    marginHorizontal: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 100,
                    borderColor: 'lightgray'
                }}
            >
                <TouchableOpacity style={{ paddingLeft: 20 }} onPress={() => router.dismiss()}>
                    <Ionicons name="arrow-back" color="#fff" size={30}></Ionicons>
                </TouchableOpacity>
                <TextInput
                    placeholder="Buscar"
                    placeholderTextColor="lightgray"
                    value={searchTerm}
                    onChangeText={onChangeSearch}
                    style={{
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        flex: 1,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 16,
                        letterSpacing: 1.5
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        setSearchTerm("");
                        refetch(); // Reset search
                    }}
                    style={{
                        borderRadius: 100,
                        padding: 10,
                        margin: 4,
                        backgroundColor: 'gray'
                    }}
                >
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, padding: 10 }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.yellow} />
                ) : (
                    <FlashList
                        data={data ?? []}
                        estimatedItemSize={30}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => router.push(`/movie/${item.id}`)} style={{ marginBottom: 20, flexDirection: 'row', gap: 10 }}>
                                <Image
                                    source={{ uri: item.poster }}
                                    style={{
                                        width: 100,
                                        height: 120,
                                        borderRadius: 12
                                    }}
                                />
                                <View>
                                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                                    <View style={{ flexDirection: 'row', gap: 5, marginVertical: 6, alignItems: 'center' }}>
                                        <Ionicons name="star" color={Colors.yellow} />
                                        <Text style={{ color: '#fff' }}>{item.rating?.toFixed(2)}</Text>
                                    </View>
                                    <Text style={{ color: '#fff' }}>{item.releaseDate?.toLocaleDateString('es-MX')}</Text>
                                    <Text style={{ color: '#fff', marginTop: 6 }}>{item.description?.substring(0, 100).concat('...')}</Text>
                                </View>
                            </Pressable>
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
