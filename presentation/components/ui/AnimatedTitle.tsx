import { Colors } from "@/config/theme/colors";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withRepeat,
    Easing, withSequence, runOnJS
} from "react-native-reanimated";
import { useEffect } from "react";

export default function AnimatedTitle({ children, delay }: { children: string; delay: number }) {
    const translateY = useSharedValue(0);

    useEffect(() => {
        const startAnimation = () => {
            'worklet'; // Ensure this runs inside Reanimated worklet
            translateY.value = withRepeat(
                withSequence(
                    withTiming(-1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                false
            );
        };

        // Use runOnJS inside a worklet to properly handle the delay
        runOnJS(setTimeout)(() => {
            startAnimation();
        }, delay);
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return <Animated.Text style={[{ color: Colors.yellow }, animatedStyle]}>{children}</Animated.Text>;
};
