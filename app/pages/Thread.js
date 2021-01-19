import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "../components/Avatar";
import { Comment } from "../components/Comment";
import { LinkPreview } from "../components/LinkPreview";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../services/Firebase";
import { useTheme } from "@react-navigation/native";

export default function Thread({ route, navigation }) {
  const { colors } = useTheme();
  const { itemId } = route.params;
  const [thread, setThread] = useState({
    childIDs: [],
    comments: 0,
    date: " ",
    description: " ",
    id: " ",
    parrentID: " ",
    time: " ",
    title: " ",
    user: " ",
  });

  useEffect(() => {
    getThread();
  }, []);

  async function getThread() {
    //fetches thread from db
    return await firebase
      .database()
      .ref("posts/")
      .child(itemId)
      .once("value", function (snapshot) {
        let data = snapshot.val();
        if (data != null) {
          setThread(JSON.parse(JSON.stringify(data)));
        }
      });
  }

  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SafeAreaView style={{ backgroundColor: colors.card }} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={[
            styles.threadBody,
            {
              backgroundColor: colors.card,
            },
          ]}
        >
          <View style={styles.topArea}>
            <Avatar avatarName={thread.user} size={34}></Avatar>
            <Text style={styles.userText}>Posted by {thread.user}</Text>
            <Text style={styles.timeText}>- {thread.time}</Text>
          </View>
          <View style={styles.middleArea}>
            <Text
              style={[
                styles.titleText,
                {
                  color: colors.text,
                },
              ]}
            >
              {thread.title.replace(/(\r\n|\n|\r)/gm, " ")}
            </Text>
            <Text
              style={[
                styles.bodyText,
                {
                  color: colors.text,
                },
              ]}
            >
              {thread.description.replace(/(\r\n|\n|\r)/gm, " ")}
            </Text>
            {thread.hasOwnProperty("link") ? (
              <LinkPreview url={thread.link} />
            ) : null}
          </View>
          <View style={styles.bottomArea}>
            <MaterialCommunityIcons name="comment" size={18} color="#949494" />
            <Text style={styles.bottomText}>{thread.comments}</Text>
            <MaterialCommunityIcons
              name="calendar-blank"
              size={18}
              color="#949494"
            />
            <Text style={styles.bottomText}>{thread.date}</Text>
            <TouchableOpacity onPress={() => alert(thread.id)}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={26}
                color="#949494"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.threadComments}>
          {thread.hasOwnProperty("childIDs")
            ? thread.childIDs.map((id) => (
                <Comment commentId={id} key={id} indentSize={0} />
              ))
            : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  threadBody: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontWeight: "600",
    fontSize: 20,
    padding: 10,
  },
  bodyText: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  userText: {
    color: "#949494", // THEME CHANGES
    fontStyle: "italic",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  timeText: {
    color: "#949494", //THEME CHANGES
    fontStyle: "italic",
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomText: {
    color: "#949494", //THEME CHANGES
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 25,
  },
  topArea: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  middleArea: {},
  bottomArea: {
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
});
