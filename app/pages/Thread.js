import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "../components/Avatar";
import { Comment } from "../components/Comment"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";

const DATA = [
    {
      childIDs: ['1605553940'],
      comments: 2,
      date: 'November 16, 2020,',
      description:
        'when we sign Isco\n\nin january... la la la laaa\n\n\nIn other news, Carlo and the coaches have been impressed with Tosuns attitude working his way back from injury.\n\n',
      id: '1605553556',
      parrentID: '',
      time: '7:05 pm',
      title: 'Lets all have a disco',
      user: 'Col',
    },
    {
      childIDs: ['1605554019'],
      comments: 1,
      date: 'November 16, 2020,',
      description:
        '\n\nPrevious Message\n\nwhen we sign Isco\n\nin january... la la la laaa\n\n\nIn other news, Carlo and the coaches have been impressed with Tosuns attitude working his way back from injury.',
      id: '1605553940',
      parrentID: '1605553556',
      time: '7:12 pm,',
      title: 'I hope Tousn',
      user: 'PaulSan',
    },
    {
      comments: 1,
      date: 'November 16, 2020,',
      description:
        '.......and he can finish. All round game isnâ€™t great but with a more creative midfield behind him he may prove valuable.\nPrevious Message\n\n\nPrevious Message\n\nwhen we sign Isco\n\nin january... la la la laaa\n\n\nIn other news, Carlo and the coaches have been impressed with Tosuns attitude working his way back from injury.\n\n',
      id: '1605554019',
      parrentID: '1605553940',
      time: '7:13 pm,',
      title:
        'I hope Tosun can succeed. His attitude has always been spot on.....',
      user: 'PaulSan',
    },
    {
      childIDs: ['1605567774'],
      comments: 1,
      date: 'November 16, 2020,',
      description:
        "\n....James and Mina were crap.\n\nIt's all Carlo's fault...\n\n",
      id: '1605560544',
      parrentID: '',
      time: '9:02 pm',
      title: 'Narcy Colombians...',
      user: 'T-t',
    },
    {
      comments: 1,
      date: 'November 16, 2020,',
      description:
        "The good news is that as Mina was sent off he won't have to trael half way across the world for their next game.\nPrevious Message\n\n\n",
      id: '1605567774',
      parrentID: '1605560544',
      time: '11:02 pm,',
      title: 'Re: Narcy Colombians...',
      user: 'Aberblue',
    },
];

export default function GameStats({ route, navigation }) {
    const { itemId } = route.params;
    const thread = getThreadData(itemId);
    return(
        <View style={{flex: 1}}>
            <ScrollView>
            <View style={styles.threadBody}>
          <View style={styles.topArea}>
            <Avatar avatarName={thread.user} size={34}></Avatar>
            <Text style={styles.userText}>Posted by {thread.user}</Text>
          </View>
          <View style={styles.middleArea}>
            <Text style={styles.titleText}>{thread.title}</Text>
            <Text style={styles.bodyText}>{thread.description}</Text>
          </View>
          <View style={styles.bottomArea}>
            <MaterialCommunityIcons name="comment" size={18} color="#949494" />
            <Text style={styles.bottomText}>{thread.comments}</Text>
            <MaterialCommunityIcons name="calendar-blank" size={18} color="#949494" />
            <Text style={styles.bottomText}>{thread.date.replaceAll(',','')}</Text>
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

// ======= HELPER CODE =========

/**
 * gets thread post from data for a given id
 * @param id 
 */
function getThreadData(id) {
    for (let index = 0; index < DATA.length; index++) {
        const element = DATA[index];
        if (element.id == id) {
            return element;
        }
    }
}