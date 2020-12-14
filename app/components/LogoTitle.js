import React from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import { StyleSheet, View, Text } from "react-native";

const LogoTitle = (props) => {
  return (
    <View>
      <Text style={[styles.title, { color: props.color }]}>Optimum</Text>
    </View>
  );
};

export { LogoTitle };

const styles = StyleSheet.create({
  title: {
    fontFamily: "Baskerville",
    fontSize: 30,
  },
});
