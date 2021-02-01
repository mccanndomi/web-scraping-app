import React from "react";
import { View } from "react-native";
import FullWidthImage from "react-native-fullwidth-image";

const MediaImage = (props) => {
  return (
    //<View />
    <FullWidthImage
      style={{ flex: 1, marginBottom: 10, borderRadius: 4 }}
      source={{ uri: props.url }}
    />
  );
};

export { MediaImage };
