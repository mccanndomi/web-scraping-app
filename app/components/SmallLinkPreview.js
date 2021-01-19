import React, { useState, useEffect } from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { getLinkPreview } from "link-preview-js";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const SmallLinkPreview = (props) => {
  const { dark, colors } = useTheme();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [linkData, setLinkData] = useState({});

  useEffect(() => {
    let isMounted = true;

    getLinkPreview(props.url).then((data) => {
      if (isMounted) {
        setLinkData(data);
        setHasLoaded(true);
      }
    });
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  }, []); // getLinkPreview, setLinkData, setHasLoaded

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(linkData.url)}
      style={[
        styles.container,
        {
          borderColor: dark ? "#2b2b2b" : "#dbdbdb",
        },
      ]}
    >
      <View style={styles.imagePreview}>
        {hasLoaded ? (
          <ImageBackground
            style={styles.image}
            imageStyle={{
              borderRadius: 8,
            }}
            source={{
              uri: linkData.hasOwnProperty("images") ? linkData.images[0] : " ",
            }}
          >
            <View
              style={{
                flex: 1,
                width: 100,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.linkPreviewText}>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "white",
                      paddingVertical: 2,
                      paddingLeft: 4,
                      fontWeight: "600",
                      fontSize: 9,
                    }}
                  >
                    {linkData.hasOwnProperty("url")
                      ? linkData.url.replace(/^.*:\/\//i, "")
                      : " "}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  style={{ paddingRight: 2 }}
                  name="link-variant"
                  size={10}
                  color="white"
                />
              </View>
            </View>
          </ImageBackground>
        ) : (
          <ShimmerPlaceHolder
            width={100}
            height={100}
            style={{
              borderRadius: 8,
            }}
            shimmerColors={
              dark
                ? ["#0f0f0f", "#1c1c1c", "#0f0f0f"]
                : ["#ebebeb", "#c5c5c5", "#ebebeb"]
            }
          ></ShimmerPlaceHolder>
        )}
      </View>
    </TouchableOpacity>
  );
};

export { SmallLinkPreview };

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  container: {
    width: 100,
    height: 100,
    borderRadius: 8,
    flexDirection: "row",
    marginRight: 14,
  },
  linkPreviewText: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
