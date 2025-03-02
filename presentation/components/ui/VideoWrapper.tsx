
import WebView from "react-native-webview";
import {SimpleVideo} from "@/infrastructure/interfaces/moviedb-videos-response";
import {useWindowDimensions, View} from "react-native";

type Props = {
    video: SimpleVideo;
}

export default function VideoWrapper({video}: Props) {
    const {width} = useWindowDimensions();
    return (
        <View style={{ width, padding: 10 }}>
            <WebView
                source={{ uri: video.url}} // Replace with your video ID
                allowsFullscreenVideo
                allowsPictureInPictureMediaPlayback
                style={{ height: 275, flex: 1, borderRadius: 12 }}
            />
        </View>
    )
}
