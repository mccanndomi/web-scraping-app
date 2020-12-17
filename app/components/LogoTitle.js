import React from "react"; //Baskerville, Bodoni 72, Didot, Times New Roman
import { StyleSheet, View, ImageBackground } from "react-native";
import { useTheme } from "@react-navigation/native";

const LogoTitle = (props) => {
  const { dark } = useTheme();

  return (
    <View>
      <ImageBackground
        style={styles.image}
        imageStyle={{
          borderRadius: 8,
          resizeMode: "contain",
        }}
        source={
          !dark
            ? require("../assets/title-dark.png")
            : require("../assets/title-light.png")
        }
      />
    </View>
  );
};

export { LogoTitle };

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 100,
  },
});
