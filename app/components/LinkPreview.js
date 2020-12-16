import React, { useState, useEffect } from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getLinkPreview } from "link-preview-js";
import { useTheme } from "@react-navigation/native";

const LinkPreview = (props) => {
  const { colors } = useTheme();
  const [linkData, setLinkData] = useState({
    images: [
      "https://www.pngarts.com/files/3/URL-Chain-Link-PNG-Image-Background.png",
    ],
  });
  useEffect(() => {});
  getLinkPreview(props.url).then((data) => setLinkData(data));
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.imagePreview}>
        <Image
          style={styles.image}
          source={{
            uri: linkData.images[0],
          }}
        />
      </View>
      <View style={styles.bodyPreview}>
        <View style={styles.titleArea}>
          <Text style={styles.title} numberOfLines={1}>
            {linkData.title}
          </Text>
        </View>
        <View style={styles.descriptionArea}>
          <Text style={styles.description}>{linkData.description}</Text>
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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  imagePreview: {},
  bodyPreview: { justifyContent: "space-evenly" },
  titleArea: {},
  title: { fontWeight: "600", fontSize: 18, flex: 1, flexWrap: "wrap" },
  descriptionArea: {},
  description: {},
  container: {
    margin: 10,
    borderRadius: 8,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#949494",
  },
});
