import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Avatar } from "../components/Avatar";
import { firebase } from "../services/Firebase";

const Comment = ( props ) => {
    const itemId = props.commentId;
    const [isHidden, setIsHidden] = useState(true);
    const [comment, setComment] = useState({
      "childIDs": [],
      "comments": 0,
      "date": " ",
      "description": " ",
      "id": " ",
      "parrentID": " ",
      "time": " ",
      "title": " ",
      "user": " ",
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

    return(
        <TouchableOpacity 
          onLongPress={() => {
            setIsHidden(!isHidden);
          }
        }>
            <View style={[styles.container, {paddingLeft: 25*indentSize}]}>
                <View style={[styles.topArea, { }]}>
                        <Avatar avatarName={comment.user} size={28}></Avatar>
                        <Text style={styles.userText}>Commented by {comment.user}</Text>
    <Text style={styles.timeText}>- {comment.time}</Text>
                </View>
                <View style={[styles.middleArea, { }]}>
                    {getCommentTitle((comment.title).replace(/(\r\n|\n|\r)/gm," "))}
                    {getCommentBody((comment.description).replace(/(\r\n|\n|\r)/gm," "))}
                </View>
            </View>
                { 
                  (comment.hasOwnProperty("childIDs") && comment.childIDs.length != 0) ? 
                    isHidden ? (
                      comment.childIDs.map((id) => (
                          <Comment commentId={id}m indentSize={indentSize+1}/>
                      ))) : <View style={styles.hiddenView}></View>
                  : null
                }
        </TouchableOpacity>
    );
};

export { Comment }

function getCommentTitle(title) {
  if (title == "" || title === "" || title == " "|| title === " ") {
    return;
  } else {
    return <Text style={styles.title}>{title}</Text>
  }
  
}

function getCommentBody(body) {
  if (body == "" || body === "" || body == " "|| body === " ") {
    return;
  } else {
    return <Text>{body}</Text>
  }
}

const styles = StyleSheet.create({
  hiddenView: {
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderBottomColor: "#bdbdbd",
    backgroundColor: "#d6d6d6",
  },
    leftTop: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightTop: {
        alignItems: "flex-end",
        flex: 1,
    },
    container: {
        borderBottomWidth: 1,
        borderColor: "#e6e6e6",
        paddingVertical: 10,
        paddingRight: 20,
        flexDirection: "column",
    },
    topArea: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    middleArea: {
        flexDirection: "column",
        paddingVertical: 8,
        paddingLeft: 45,
    },
    userText: {
        color: '#808080',
        fontSize: 12,
        paddingLeft: 5,
    },
    timeText: {
      color: '#808080',
      fontSize: 12,
  },
    title: {
        fontWeight: "700",
        paddingBottom: 4,
    }
});
