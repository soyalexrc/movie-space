import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Stack} from "expo-router";
import {Suspense, useCallback, useEffect, useState} from "react";
import {ActivityIndicator, View} from "react-native";
import {Colors} from "@/config/theme/colors";
import {SQLiteProvider, openDatabaseSync} from 'expo-sqlite';
import {drizzle} from 'drizzle-orm/expo-sqlite';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/core/db/drizzle/migrations';

const queryClient = new QueryClient();

export const DATABASE_NAME = 'mddb';

export default function RootLayout() {
    const expoDb = openDatabaseSync(DATABASE_NAME);
    const db = drizzle(expoDb);
    const {success, error} = useMigrations(db, migrations);

    // Keep the splash screen visible while we fetch resources
    SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
    SplashScreen.setOptions({
        duration: 2000,
        fade: true,
    });

    // useEffect(() => {
    //     async function prepare() {
    //         try {
    //             // Pre-load fonts, make any API calls you need to do here
    //             // await Font.loadAsync(Entypo.font);
    //             // Artificially delay for two seconds to simulate a slow loading
    //             // experience. Remove this if you copy and paste the code!
    //             await new Promise(resolve => setTimeout(resolve, 2000));
    //         } catch (e) {
    //             console.warn(e);
    //         } finally {
    //             // Tell the application to render
    //             setAppIsReady(true);
    //         }
    //     }
    //
    //     prepare();
    // }, []);

    // const onLayoutRootView = useCallback(() => {
    //     if (appIsReady) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.
    //         SplashScreen.hide();
    //     }
    // }, [appIsReady]);

    // if (!appIsReady) {
    //     return null;
    // }


    return (
        <Suspense fallback={<ActivityIndicator size="large"/>}>
            <SQLiteProvider
                databaseName={DATABASE_NAME}
                options={{enableChangeListener: true}}
                useSuspense>
                <QueryClientProvider client={queryClient}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="createList" options={{
                            presentation: 'formSheet',
                            sheetCornerRadius: 12,
                            sheetAllowedDetents: 'fitToContents',
                            sheetGrabberVisible: false,
                        }} />
                    </Stack>
                </QueryClientProvider>
            </SQLiteProvider>
        </Suspense>

    )
}
