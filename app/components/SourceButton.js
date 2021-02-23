import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";

const SourceButton = (props) => {
  const { dark, colors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{props.title}</Text>
      <View style={styles.selected}>
        <Switch
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          trackColor={{ false: "#767577", true: colors.primary }}
          thumbColor={dark ? "#0f0f0f" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

export { SourceButton };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  selected: {
    flex: 1,
    alignItems: "flex-end",
  },
  container: {
    margin: 8,
    flexDirection: "row",
  },
});
