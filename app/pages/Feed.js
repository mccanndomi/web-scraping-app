import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Text,
} from "react-native";
import ThreadRow from "../components/ThreadRow";
import { FilterButton } from "../components/FilterButton";
import { firebase } from "../services/Firebase";
import { useTheme } from "@react-navigation/native";
import { PreferencesContext } from "../services/PreferencesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Feed({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("None");
  const { dark, colors } = useTheme();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="sort-variant"
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
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <View
            style={[
              styles.modalSection,
              {
                backgroundColor: colors.card,
                borderTopColor: colors.card,
              },
            ]}
          >
            <Text style={[styles.titleText, { color: colors.text }]}>
              SORT BY
            </Text>
            <View
              style={{
                borderBottomColor: "#949494",
                borderBottomWidth: 1,
                marginHorizontal: 5,
              }}
            />
            <TouchableOpacity
              onPress={() => handleFilterChange("Recent", posts)}
            >
              <FilterButton
                title="Recent"
                icon="new-box"
                isSelected={filterSelected == "Recent" ? true : false}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFilterChange("Most Comments", posts)}
            >
              <FilterButton
                title="Most Comments"
                icon="comment-multiple"
                isSelected={filterSelected == "Most Comments" ? true : false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={getParentPosts(posts)}
        renderItem={renderItem}
        key={(item) => item.id}
      />
    </View>
  );

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

  /**
   * @param {*} type type of sort/filter
   * @param {*} posts posts that are being sorted
   */
  function handleFilterChange(type, posts) {
    var typeChange = type;
    var currentPosts = posts;

    setModalVisible(false);

    switch (typeChange) {
      case "Recent":
        setFilterSelected("Recent");
        setPosts(
          currentPosts.sort((a, b) =>
            new Date(a.date + " " + a.time).getTime() <
            new Date(b.date + " " + b.time).getTime()
              ? 1
              : -1
          )
        );
        break;
      case "Most Comments":
        setFilterSelected("Most Comments");
        setPosts(
          currentPosts.sort((a, b) => (a.comments < b.comments ? 1 : -1))
        );
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
  headerIcon: {
    marginHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "700",
    padding: 10,
  },
  modalSection: {
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 40,
    shadowOpacity: 1,
    shadowRadius: 200,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
  },
});

export default Feed;
