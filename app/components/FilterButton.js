import React from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

const FilterButton = (props) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={props.icon}
        size={22}
        color="#949494"
        style={styles.icon}
      />
      <Text style={[styles.title, { color: colors.text }]}>{props.title}</Text>
      {props.isSelected ? (
        <View style={styles.selected}>
          <MaterialCommunityIcons
            name="check-bold"
            size={22}
            color={colors.primary}
          />
        </View>
      ) : null}
    </View>
  );
};

export { FilterButton };

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  container: {
    margin: 10,
    paddingVertical: 4,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
  selected: {
    flex: 1,
    alignItems: "flex-end",
  },
});
