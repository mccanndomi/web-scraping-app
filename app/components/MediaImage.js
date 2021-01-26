import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

const MediaImage = (props) => {
  return (
    <View
      style={{
        flex: 1,
        height: 400,
        marginBottom: 10,
      }}
    >
      <Image
        resizeMode="contain"
        style={{ flex: 1, width: null, height: null }}
        source={{
          uri: props.url,
        }}
      />
    </View>
  );
};

export { MediaImage };

const styles = StyleSheet.create({});
