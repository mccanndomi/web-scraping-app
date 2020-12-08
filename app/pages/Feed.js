import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ThreadRow from '../components/ThreadRow';
import { firebase } from "../services/Firebase";

function Feed({ navigation }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getAllPosts();
    }, []);

    async function getAllPosts() {
      //fetches all posts from db
      return await firebase
        .database()
        .ref("posts/")
        .on(
          "value",
          function (snapshot) {
            let data = snapshot.val();
            if (data != null) {
              setPosts(Object.values(data));
            }
          },
          function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          }
        );
    }

  const renderItem = ({item}) => <ThreadRow item={item}></ThreadRow>;

  return (
    <View style={styles.container}>
      <FlatList
        data={ getParentPosts(posts) }
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