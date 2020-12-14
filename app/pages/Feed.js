import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  ColorPropType,
} from "react-native";
import ThreadRow from "../components/ThreadRow";
import { firebase } from "../services/Firebase";
import { useTheme } from "@react-navigation/native";
import { PreferencesContext } from "../services/PreferencesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Feed({ navigation }) {
  const [posts, setPosts] = useState([]);
  const { colors } = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => alert("Apply filters")}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color={colors.text}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

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

  const renderItem = ({ item }) => <ThreadRow item={item}></ThreadRow>;

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        data={getParentPosts(posts)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  headerIcon: {
    marginHorizontal: 20,
  },
});

export default Feed;

//-------------- HELPER FUNCTIONS --------------

function getParentPosts(data) {
  var parents = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (element.parrentID === "") {
      parents[parents.length] = element;
    }
  }
  return parents;
}
