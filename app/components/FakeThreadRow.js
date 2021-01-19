import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "./Avatar";
import { SmallLinkPreview } from "./SmallLinkPreview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";

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
          <Text style={[styles.middleText, { color: colors.text }]}>
            Sheffield United
          </Text>
          {/* {item.hasOwnProperty("link") ? (
            <SmallLinkPreview url={item.link} />
          ) : null} */}
        </View>
        <View style={styles.bottomArea}>
          <MaterialCommunityIcons name="comment" size={18} color="#949494" />
          <Text style={styles.bottomText}>8</Text>
          <MaterialCommunityIcons
            name="calendar-blank"
            size={18}
            color="#949494"
          />
          <Text style={styles.bottomText}>December 17 2020</Text>
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
