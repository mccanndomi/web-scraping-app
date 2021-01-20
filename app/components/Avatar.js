import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

var size = 0;

const Avatar = (props) => {
  return (
    <View
      style={[
        styles.circle,
        { backgroundColor: getBackgroundColour(props.avatarName) },
      ]}
    >
      <MaterialCommunityIcons
        name="account"
        size={props.size}
        color={getForegroundColour(props.avatarName)}
      />
    </View>
  );
};

export { Avatar };

const styles = StyleSheet.create({
  circle: {
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});

// ======== Helper methods ========

function getBackgroundColour(name) {
  if (name.toUpperCase().charCodeAt(0) < 69) {
    return "#ffb3b3";
  } else if (name.toUpperCase().charCodeAt(0) < 73) {
    return "#b1c7f0";
  } else if (name.toUpperCase().charCodeAt(0) < 77) {
    return "#a2eba7";
  } else if (name.toUpperCase().charCodeAt(0) < 81) {
    return "#f2f5a4";
  } else if (name.toUpperCase().charCodeAt(0) < 86) {
    return "#f5d7ab";
  } else if (name.toUpperCase().charCodeAt(0) < 90) {
    return "#e6bff2";
  } else {
    return "#b3b3b3";
  }
}

function getForegroundColour(name) {
  if (name.toUpperCase().charCodeAt(0) < 69) {
    return "#d68181";
  } else if (name.toUpperCase().charCodeAt(0) < 73) {
    return "#7299e0";
  } else if (name.toUpperCase().charCodeAt(0) < 77) {
    return "#66d16e";
  } else if (name.toUpperCase().charCodeAt(0) < 81) {
    return "#dfe630";
  } else if (name.toUpperCase().charCodeAt(0) < 86) {
    return "#e0a958";
  } else if (name.toUpperCase().charCodeAt(0) < 90) {
    return "#c96ee6";
  } else {
    return "#666666";
  }
}
