import {withLayoutContext} from "expo-router";
import {
    createNativeBottomTabNavigator,
    NativeBottomTabNavigationEventMap,
    NativeBottomTabNavigationOptions
} from '@bottom-tabs/react-navigation';
import {Colors} from "@/config/theme/colors";
import {Platform} from "react-native";

const {Navigator} = createNativeBottomTabNavigator();

export const Tabs =
    withLayoutContext<NativeBottomTabNavigationOptions, typeof Navigator, any, NativeBottomTabNavigationEventMap>(Navigator);


export default function Layout() {
    const isIos = Platform.OS === 'ios';

    return (
        <Tabs
            ignoresTopSafeArea
            hapticFeedbackEnabled
            translucent={true}
            barTintColor={isIos ? undefined : Colors.background}
            tabBarActiveTintColor={Colors.yellow}
            tabBarInactiveTintColor="#888"
            activeIndicatorColor={Colors.textGray}
        >
            <Tabs.Screen
                name="movies"
                options={{
                    title: 'Peliculas',
                    tabBarActiveTintColor: Colors.yellow,
                    // tabBarIcon: ({focused}) => platform === 'android' ? require('@/assets/icons/resume.svg') : ({sfSymbol: 'house'}),
                    tabBarIcon: ({focused}) =>  ({sfSymbol: focused ? 'movieclapper.fill' : 'movieclapper'}),
                }}
            />
            <Tabs.Screen
                name="tvshows"
                options={{
                    tabBarActiveTintColor: Colors.yellow,
                    title: 'TV Shows',
                    // tabBarIcon: () => platform === 'android' ? require('@/assets/icons/upcoming.svg') : ({sfSymbol: 'calendar'}),
                    tabBarIcon: ({ focused }) => ({sfSymbol: focused ? 'tv.fill' : 'tv'}),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    tabBarActiveTintColor: Colors.yellow,
                    title: 'Favoritos',
                    tabBarIcon: ({ focused }) => ({sfSymbol: focused ? 'heart.fill' : 'heart',}),
                    // tabBarIcon: ({ focused }) => platform === 'android' ? require('@/assets/icons/search.svg') : ({
                    //     sfSymbol: focused ? 'text.magnifyingglass' : 'magnifyingglass',
                    // }),
                }}
            />
        </Tabs>
    )
}
