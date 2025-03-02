import {Alert, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "@/config/theme/colors";
import {useSQLiteContext} from "expo-sqlite";
import {drizzle} from "drizzle-orm/expo-sqlite/index";
import * as schema from "@/core/db/schema";
import {useEffect, useState} from "react";
import {useLocalSearchParams, useRouter} from "expo-router";
import {eq, ilike} from "drizzle-orm";

export default function Screen() {
    const db = useSQLiteContext();
    const drizzleDb = drizzle(db, { schema });
    const [name, setName] = useState<string>('')
    const [id, setId] = useState<number>(0)
    const router = useRouter();
    const params = useLocalSearchParams<{ name?: string, id?: string }>();



    useEffect(() => {
        console.log('name', params?.name);
        console.log('id', params?.id);

        setName(params?.name || '')
        setId(params?.id ? Number(params.id) : 0)
    }, []);

    async function updateList() {
        try {
            const lists = await drizzleDb.select().from(schema.lists).where(eq(schema.lists.name, name));
            if (lists.length > 0) {
                Alert.alert('No se puede crear la lista', `La categoria: ${name} ya existe...`, [
                    {
                        style: 'default',
                        text: 'Ok'
                    }
                ])
                return;
            }

            const result = await drizzleDb.update(schema.lists).set({
                name
            })
                .where(eq(schema.lists.id, id))
            router.dismiss()

        } catch (error) {
            console.error(error);
        }
    }

    async function createList() {
        try {
            const lists = await drizzleDb.select().from(schema.lists).where(eq(schema.lists.name, name));

            if (lists.length > 0) {
                Alert.alert('No se puede crear la lista', `La categoria: ${name} ya existe...`, [
                    {
                        style: 'default',
                        text: 'Ok'
                    }
                ])
                return;
            }

            const result = await drizzleDb.insert(schema.lists).values({
                name
            })
            router.dismiss()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={{ height: 160, padding: 12 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Nueva lista</Text>
            <TextInput
                style={{
                    borderRadius: 12,
                    marginTop: 20,
                    borderColor: Colors.background,
                    borderWidth: 1,
                    borderStyle: 'solid',
                    height: 40,
                    color: Colors.background,
                    paddingHorizontal: 16,
                }}
                placeholder="Lista"
                value={name}
                onChangeText={setName}
                placeholderTextColor={Colors.background}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    backgroundColor: Colors.yellow,
                    borderRadius: 12,
                    padding: 10,
                    marginTop: 20
                }}
                onPress={params.name ? updateList : createList}
            >
                <Text style={{
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 18,
                }}>{params.name ? 'Actualizar' : 'Crear'}</Text>
            </TouchableOpacity>
        </View>
    )
}
