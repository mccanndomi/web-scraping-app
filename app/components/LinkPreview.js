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
import * as Linking from "expo-linking";

const LinkPreview = (props) => {
  const { dark, colors } = useTheme();
  const [linkData, setLinkData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getLinkPreview(props.url).then((data) => setLinkData(data));
  }

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
        <ImageBackground
          style={styles.image}
          imageStyle={{
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
          source={{
            uri: linkData.hasOwnProperty("images") ? linkData.images[0] : " ",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <MaterialCommunityIcons
              name="link-variant"
              size={100}
              color="rgba(255, 255, 255, 0.1)"
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.bodyPreview}>
        <View style={styles.titleArea}>
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {linkData.title}
          </Text>
        </View>
        <View style={styles.descriptionArea}>
          <Text style={styles.description} numberOfLines={3}>
            {linkData.description}
          </Text>
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
  bodyPreview: { justifyContent: "space-evenly", flexShrink: 1, padding: 8 },
  titleArea: { flexShrink: 1 },
  title: { fontWeight: "600", fontSize: 16 },
  descriptionArea: {},
  description: { color: "#949494" },
  container: {
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
    borderWidth: 1,
  },
});
