import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tag = (props) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColour(props.source) },
      ]}
    >
      <Text style={[styles.text, { color: "white" }]}>{props.source}</Text>
    </View>
  );
};

export { Tag };

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: "center",
    backgroundColor: "#b5c6ff",
    justifyContent: "center",
  },
  text: {
    color: "#002ab5",
    fontWeight: "700",
    paddingVertical: 3,
    paddingHorizontal: 6,
    fontSize: 11,
  },
});

// ======== Helper Methods ========

function getBackgroundColour(source) {
  if (source === "TPF") {
    return "#4169E1";
  } else if (source === "reddit") {
    return "#FF5700";
  } else if (source === "Optimum") {
    return "green";
  }
}

function getTextColour(source) {
  if (source === "TPF") {
    return "#002ab5";
  } else if (source === "reddit") {
    return "#964517";
  } else if (source === "Optimum") {
    return "#4f4f4f";
  }
}
