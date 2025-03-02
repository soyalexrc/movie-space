import {Dimensions, Pressable, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import { Fragment } from "react";
import { Image } from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import Animated from "react-native-reanimated";

type Props = {
    title: string;
    poster: string;
    originalTitle: string;
    animatedImageStyle?: any
    titleAnimatedStyle?: any
};



const { height, width } = Dimensions.get('window');
const IMG_HEIGHT = height * 0.7


export default function MovieHeader({ poster, originalTitle, titleAnimatedStyle, title, animatedImageStyle }: Props) {
    console.log(width);
    return (
        <Fragment>
            {/*<LinearGradient*/}
            {/*    colors={['rgba(0, 0, 0, 0.4)', 'transparent']}*/}
            {/*    start={[0, .5]}*/}
            {/*    style={{*/}
            {/*        height: screenHeight * 0.7,*/}
            {/*        position: 'absolute',*/}
            {/*        zIndex: 1,*/}
            {/*        width: '100%'*/}
            {/*    }}*/}
            {/*/>*/}


            {/*<View style={{*/}
            {/*    position: 'absolute',*/}
            {/*    zIndex: 99,*/}
            {/*    top: 35,*/}
            {/*    left: 10*/}
            {/*}}>*/}
            {/*    <Pressable onPress={() => router.dismiss()}>*/}
            {/*        <Ionicons name="arrow-back" size={30} color="#fff" />*/}
            {/*    </Pressable>*/}
            {/*</View>*/}

            {/*<View style={[styles.container, { height: screenHeight * 0.7 }]}>*/}
            {/*    <View style={styles.imageWrapper}>*/}
            {/*        <Animated.Image style={[styles.image, animatedImageStyle]} source={{ uri: poster }} />*/}
            {/*    </View>*/}
            {/*</View>*/}

            <View>
                <Animated.Image
                    source={{uri: poster}}
                    style={[styles.image, animatedImageStyle]}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(23, 23, 23, 0.7)', 'rgba(23, 23, 23, 1)']}
                    style={{ width, height: IMG_HEIGHT, position: 'absolute', bottom: 0 }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                />
            </View>

            <View style={{
                marginTop: width <= 380 ? -160 : -120,
                paddingBottom: 20
            }}>
                <Animated.Text style={[titleAnimatedStyle, {
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 36,
                    fontWeight: 'bold',
                    letterSpacing:  1,
                    backgroundColor: 'transparent'
                }]}>{title}</Animated.Text>
            </View>

            {/*<View style={{ paddingHorizontal: 16, marginTop: 10 }}>*/}
            {/*    <Text style={styles.originalTitle}>{originalTitle}</Text>*/}
            {/*    <Text style={styles.title}>{title}</Text>*/}
            {/*</View>*/}
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    imageWrapper: {
        flex: 1,
        width: "100%",
        overflow: "hidden",

        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,

        // Shadow for Android
        elevation: 8,
    },
    image: {
        width: width,
        height: IMG_HEIGHT
    },
    originalTitle: {
        fontWeight: 'normal'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
