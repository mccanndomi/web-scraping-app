import React, { useState, useEffect } from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { getLinkPreview } from "link-preview-js";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import * as Linking from "expo-linking";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const LinkPreview = (props) => {
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
  }, []); //getLinkPreview, setLinkData, setHasLoaded;

  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(linkData.url)}
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: dark ? "#2b2b2b" : "#dbdbdb",
        },
      ]}
    >
      <View style={styles.imagePreview}>
        {hasLoaded ? (
          <ImageBackground
            style={styles.image}
            imageStyle={{
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              resizeMode: "cover",
            }}
            source={{
              uri: linkData.hasOwnProperty("images")
                ? linkData.images[0]
                : "https://www.bbc.com/sport/football",
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
                  {hasLoaded ? (
                    <Text numberOfLines={1} style={styles.smallLinkText}>
                      {linkData.hasOwnProperty("url")
                        ? linkData.url.replace(/^.*:\/\//i, "")
                        : " "}
                    </Text>
                  ) : (
                    <Text numberOfLines={1} style={styles.smallLinkText}>
                      loading...
                    </Text>
                  )}
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
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
            }}
            shimmerColors={
              dark
                ? ["#0f0f0f", "#1c1c1c", "#0f0f0f"]
                : ["#ebebeb", "#c5c5c5", "#ebebeb"]
            }
          ></ShimmerPlaceHolder>
        )}
      </View>
      <View style={styles.bodyPreview}>
        <View style={{ paddingBottom: 6 }}>
          <ShimmerPlaceHolder
            visible={hasLoaded}
            width={150}
            shimmerColors={
              dark
                ? ["#0f0f0f", "#1c1c1c", "#0f0f0f"]
                : ["#ebebeb", "#c5c5c5", "#ebebeb"]
            }
          >
            <Text
              style={[
                styles.title,
                {
                  color: colors.text,
                },
              ]}
              numberOfLines={1}
            >
              {linkData.title}
            </Text>
          </ShimmerPlaceHolder>
        </View>
        <View style={[styles.descriptionArea]}>
          <ShimmerPlaceHolder
            visible={hasLoaded}
            width={225}
            height={20}
            shimmerColors={
              dark
                ? ["#0f0f0f", "#1c1c1c", "#0f0f0f"]
                : ["#ebebeb", "#c5c5c5", "#ebebeb"]
            }
          >
            <Text
              style={[styles.description, { color: "#949494" }]}
              numberOfLines={3}
            >
              {linkData.description}
            </Text>
          </ShimmerPlaceHolder>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { LinkPreview };

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  imagePreview: {},
  descriptionArea: {},
  bodyPreview: { flexShrink: 1, padding: 8 },
  title: { fontWeight: "600", fontSize: 16 },
  container: {
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
  },
  linkPreviewText: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 8,
  },
  smallLinkText: {
    color: "white",
    paddingVertical: 2,
    paddingLeft: 4,
    fontWeight: "600",
    fontSize: 9,
  },
});
