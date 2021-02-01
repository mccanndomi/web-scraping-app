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
import FakeThreadRow from "../components/FakeThreadRow";
import { FilterButton } from "../components/FilterButton";
import { firebase } from "../services/Firebase";
import { useTheme } from "@react-navigation/native";
import { PreferencesContext } from "../services/PreferencesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Feed({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("None");
  const { dark, colors } = useTheme();

  const fakeData = [
    {
      id: "16013281412347333",
    },
    {
      id: "16081356412347333",
    },
    {
      id: "16081417562347333",
    },
    {
      id: "16087981412347333",
    },
    {
      id: "16081412347312333",
    },
    {
      id: "16081401112347333",
    },
    {
      id: "16081414112347333",
    },
  ];

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
  }, [setHasLoaded]);

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
            setFilterSelected("Recent");
            setPosts(
              Object.values(data).sort((a, b) =>
                new Date(a.date + " " + a.time).getTime() <
                new Date(b.date + " " + b.time).getTime()
                  ? 1
                  : -1
              )
            );
            setHasLoaded(true);
          }
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  }

  const renderItem = ({ item }) => <ThreadRow item={item}></ThreadRow>;
  const renderFakeItem = ({ item }) => (
    <FakeThreadRow item={item}></FakeThreadRow>
  );

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
            <TouchableOpacity
              onPress={() => handleFilterChange("Contains Link", posts)}
            >
              <FilterButton
                title="Contains Link"
                icon="link-box"
                isSelected={filterSelected == "Contains Link" ? true : false}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {hasLoaded ? (
        <FlatList
          data={getParentPosts(posts)}
          renderItem={renderItem}
          key={(item) => item.id}
        />
      ) : (
        <FlatList
          data={fakeData}
          renderItem={renderFakeItem}
          key={(item) => item.id}
        />
      )}
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
      case "Contains Link":
        setFilterSelected("Contains Link");

        setPosts(currentPosts.sort(testSort));

        //setPosts(currentPosts.sort((a, b) => (a.link > b.link ? 1 : -1)));
        break;
    }
  }
}

const testSort = (objA, objB) => {
  if (!objA.hasOwnProperty("link") && objB.hasOwnProperty("link")) {
    return -1;
  } else if (objA.hasOwnProperty("link") && !objB.hasOwnProperty("link")) {
    return 1;
  } else if (objA.link === undefined && objB.link !== undefined) {
    return -1;
  } else if (objA.link !== undefined && objB.link === undefined) {
    return 1;
  } else if (objA.link === undefined && objB.link === undefined) {
    return 0;
  } else {
    return objA.link.length - objB.link.length;
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS !== "android" ? StatusBar.currentHeight : 0,
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
