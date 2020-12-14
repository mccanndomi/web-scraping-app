import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Avatar } from "../components/Avatar";
import { firebase } from "../services/Firebase";
import { useTheme } from "@react-navigation/native";

const Comment = (props) => {
  const { dark, colors } = useTheme();
  const itemId = props.commentId;
  const [isHidden, setIsHidden] = useState(true);
  const [comment, setComment] = useState({
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
    getComment();
  }, []);

  async function getComment() {
    //fetches thread from db
    return await firebase
      .database()
      .ref("posts/")
      .child(itemId)
      .once("value", function (snapshot) {
        let data = snapshot.val();
        if (data != null) {
          setComment(JSON.parse(JSON.stringify(data)));
        }
      });
  }

  var indentSize = props.indentSize;

  return isHidden ? (
    <View>
      <View
        style={[
          styles.container,
          {
            //paddingLeft: 5 * indentSize,
            marginLeft: indentSize == 0 ? 0 : 20,
            borderColor: dark == true ? "#303030" : "#e0e0e0",
            backgroundColor: colors.card,
          },
        ]}
      >
        <TouchableOpacity
          onLongPress={() => {
            setIsHidden(!isHidden);
          }}
        >
          <View>
            <View style={[styles.topArea, {}]}>
              <Avatar avatarName={comment.user} size={28}></Avatar>
              <Text style={styles.userText}>Commented by {comment.user}</Text>
              <Text style={styles.timeText}>- {comment.time}</Text>
            </View>
            <View style={[styles.middleArea, {}]}>
              {getCommentTitle(comment.title.replace(/(\r\n|\n|\r)/gm, ""))}
              {getCommentBody(
                comment.description.replace(/(\r\n|\n|\r)/gm, "")
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View styles={styles.bottomRow}>
          {/* <MaterialCommunityIcons name="reply" size={18} color="#949494" /> */}
        </View>
        {comment.hasOwnProperty("childIDs") && comment.childIDs.length != 0 ? (
          isHidden ? (
            comment.childIDs.map((id) => (
              <Comment commentId={id} m indentSize={indentSize + 1} />
            ))
          ) : (
            <View style={styles.hiddenView}></View>
          )
        ) : null}
      </View>
    </View>
  ) : (
    <View
      style={[
        styles.container,
        {
          marginLeft: indentSize == 0 ? 0 : 20,
          borderColor: dark == true ? "#303030" : "#e0e0e0",
          backgroundColor: colors.card,
        },
      ]}
    >
      <TouchableOpacity
        onLongPress={() => {
          setIsHidden(!isHidden);
        }}
      >
        <View>
          <View style={[styles.topArea, {}]}>
            <View style={{ paddingBottom: 8 }}>
              <Avatar avatarName={comment.user} size={28}></Avatar>
            </View>
            {getHiddenCommentTitle(
              comment.title.replace(/(\r\n|\n|\r)/gm, ""),
              comment.description.replace(/(\r\n|\n|\r)/gm, "")
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export { Comment };

function getCommentTitle(title) {
  const { colors } = useTheme();
  if (title == "" || title === "" || title == " " || title === " ") {
    return;
  } else {
    return (
      <Text style={[styles.title, { color: colors.text, paddingBottom: 2 }]}>
        {title}
      </Text>
    );
  }
}

function getHiddenCommentTitle(title, body) {
  const { colors } = useTheme();
  if (title == "" || title === "" || title == " " || title === " ") {
    return (
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          { color: colors.text, paddingLeft: 8, marginRight: 30 },
        ]}
      >
        {body}
      </Text>
    );
  } else {
    return (
      <Text
        numberOfLines={1}
        style={[
          styles.title,
          { color: colors.text, paddingLeft: 8, marginRight: 30 },
        ]}
      >
        {title}
      </Text>
    );
  }
}

function getCommentBody(body) {
  const { colors } = useTheme();
  if (body == "" || body === "" || body == " " || body === " ") {
    return;
  } else {
    return <Text style={{ color: colors.text }}>{body}</Text>;
  }
}

const styles = StyleSheet.create({
  bottomRow: {
    //flexDirection: "row",
  },
  hiddenView: {},
  leftTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightTop: {
    alignItems: "flex-end",
    flex: 1,
  },
  container: {
    flex: 1,
    borderLeftWidth: 1,
    marginTop: 10,
    paddingRight: 10,
    paddingTop: 8,
    flexDirection: "column",
  },
  topArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  middleArea: {
    flexDirection: "column",
    paddingLeft: 45,
    paddingBottom: 12,
  },
  userText: {
    color: "#949494", //THEME CHANGES
    fontSize: 12,
    paddingLeft: 5,
  },
  timeText: {
    color: "#949494", //THEME CHANGES
    fontSize: 12,
  },
  title: {
    fontWeight: "700",
    paddingBottom: 2,
  },
});
