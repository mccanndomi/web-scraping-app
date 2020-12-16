import React, { useState } from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
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

const SmallLinkPreview = (props) => {
  const { dark, colors } = useTheme();
  const [linkData, setLinkData] = useState({
    images: [],
  });
  getLinkPreview(props.url).then((data) => setLinkData(data));
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
        <ImageBackground
          style={styles.image}
          imageStyle={{
            borderRadius: 8,
          }}
          source={{
            uri: linkData.images[0],
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
              <Text
                numberOfLines={1}
                style={{
                  color: "white",
                  paddingVertical: 2,
                  paddingLeft: 4,
                  fontWeight: "600",
                }}
              >
                {linkData.url.replace(/^.*:\/\//i, "")}
              </Text>
              <MaterialCommunityIcons
                name="link-variant"
                size={20}
                color="red"
              />
            </View>
          </View>
        </ImageBackground>
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
  imagePreview: {},
  container: {
    width: 100,
    height: 100,
    borderRadius: 8,
    flexDirection: "row",
    borderWidth: 1,
    marginRight: 14,
  },
  linkPreviewText: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: 100,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
});
