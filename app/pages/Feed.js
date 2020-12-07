import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ThreadRow from '../components/ThreadRow';
import { getAllPosts } from "../services/Firebase";

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

function Feed({ navigation }) {
    const [posts, setPosts] = useState();

    useEffect(() => {
        setPosts(getAllPosts());
    }, []);

  const renderItem = ({item}) => <ThreadRow item={item}></ThreadRow>;

  return (
    <View style={styles.container}>
      <FlatList
        data={ getParentPosts(DATA) }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
});

export default Feed;

//-------------- HELPER FUNCTIONS --------------

function getParentPosts(data) {
    var parents = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.parrentID === '') {
            parents[parents.length] = element;
        }
    }
    return parents;
}