import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Avatar } from "../components/Avatar"
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const Comment = ( props ) => {
    const comment = getCommentData(props.commentId);
    var indentSize = props.indentSize;

    return(
        <View>
            <View style={[styles.container, {paddingLeft: 25*indentSize}]}>
                <View style={styles.topArea}>
                        <Avatar avatarName={comment.user} size={28}></Avatar>
                        <Text style={styles.userText}>Commented by {comment.user}</Text>
                        <Text style={styles.userText}>- {comment.date.replaceAll(',','')}</Text>
                </View>
                <View style={styles.middleArea}>
                    <Text style={styles.title}>{comment.title}</Text>
                    <Text>{comment.description}</Text>
                </View>
            </View>


                {(comment.hasOwnProperty("childIDs")) ? 
                    comment.childIDs.map((id) => (
                        <Comment commentId={id}m indentSize={indentSize+1}/>
                    )) : null
                }
        </View>
    );
};

export { Comment }

const styles = StyleSheet.create({
    leftTop: {
        flexDirection: "row",
        alignItems: "center",
    },
    rightTop: {
        alignItems: "flex-end",
        flex: 1,
    },
    container: {
        borderLeftColor: "#545454",
        paddingVertical: 10,
        marginHorizontal: 10,
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
        paddingLeft: 14,
    },
    userText: {
        color: '#808080',
        fontSize: 12,
        paddingLeft: 5,
    },
    title: {
        fontWeight: "700",
        paddingBottom: 4,
    }
});

// ======= HELPER CODE =========

/**
 * gets thread post from data for a given id
 * @param id 
 */
function getCommentData(id) {
    for (let index = 0; index < DATA.length; index++) {
        const element = DATA[index];
        if (element.id == id) {
            return element;
        }
    }
}
