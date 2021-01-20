import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "./Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

function ThreadRow({ item, onPress }) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          { backgroundColor: colors.card, borderColor: colors.card },
        ]}
      >
        <View style={styles.topArea}>
          <Avatar avatarName={"tim61"} size={26}></Avatar>
          <Text style={styles.userText}>Posted by tim61 - 10:28pm</Text>
        </View>
        <View style={styles.middleArea}>
          <View style={{ padding: 10 }}>
            <ShimmerPlaceHolder
              height={24}
              width={160 + Math.floor(Math.random() * Math.floor(180))}
            />
          </View>
          {/* {item.hasOwnProperty("link") ? (
            <SmallLinkPreview url={item.link} />
          ) : null} */}
        </View>
        <View style={styles.bottomArea}>
          <View style={{ paddingRight: 25 }}>
            <ShimmerPlaceHolder height={17} width={20} />
          </View>

          <ShimmerPlaceHolder
            height={17}
            width={100 + Math.floor(Math.random() * Math.floor(40))}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  middleText: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 22,
    padding: 10,
  },
  userText: {
    color: "#949494", //THEME CHANGES
    fontStyle: "italic",
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  bottomText: {
    color: "#949494", //THEME CHANGES
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 25,
  },
  topArea: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  middleArea: {
    flex: 1,
    flexDirection: "row",
  },
  bottomArea: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
    paddingBottom: 6,
  },
});

export default ThreadRow;
