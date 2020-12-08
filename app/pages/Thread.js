import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "../components/Avatar";
import { Comment } from "../components/Comment"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../services/Firebase";

export default function Thread({ route, navigation }) {
  const { itemId } = route.params;
  const [thread, setThread] = useState({
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

    return(
        <View style={{flex: 1}}>
           <ScrollView>
            <View style={styles.threadBody}>
          <View style={styles.topArea}>
            <Avatar avatarName={thread.user} size={34}></Avatar>
            <Text style={styles.userText}>Posted by {thread.user}</Text>
            <Text style={styles.timeText}>- {thread.time}</Text>
          </View>
          <View style={styles.middleArea}>
            <Text style={styles.titleText}>{(thread.title).replace(/(\r\n|\n|\r)/gm," ")}</Text>
            <Text style={styles.bodyText}>{(thread.description).replace(/(\r\n|\n|\r)/gm," ")}</Text>
          </View>
          <View style={styles.bottomArea}>
            <MaterialCommunityIcons name="comment" size={18} color="#949494" />
            <Text style={styles.bottomText}>{thread.comments}</Text>
            <MaterialCommunityIcons name="calendar-blank" size={18} color="#949494" />
            <Text style={styles.bottomText}>{thread.date}</Text>
          </View>
        </View>
            <View style={styles.threadComments}>
                {thread.childIDs.map((id) => (
                    <Comment commentId={id} indentSize={0} />
                ))}
            </View>
            </ScrollView> 
        </View>
    );
}

const styles = StyleSheet.create({
    threadComments: {
        
    },
    threadBody: {
        padding: 10,
        backgroundColor: 'white',
    },
      titleText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
        padding: 10,
      },
      bodyText: {
        color: 'black',
        paddingHorizontal: 10,
        paddingBottom: 10,
      },
      userText: {
        color: '#949494',
        fontStyle: "italic",
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
      },
      timeText: {
        color: '#949494',
        fontStyle: "italic",
        fontSize: 14,
        paddingTop: 10,
        paddingBottom: 10,
      },
      bottomText: {
        color: '#949494',
        fontWeight: '600',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 25,
      },
      topArea: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: "center",
      },
      middleArea: {
          
      },
      bottomArea: {
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: "center",
      },
      
});