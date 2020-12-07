import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'; 
import { Avatar } from "./Avatar";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function ThreadRow({item, onPress}) {
    const navigation = useNavigation();

    return (
      <TouchableOpacity onPress={() => navigation.navigate("Thread", { itemId: item.id })}>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <Avatar avatarName={item.user} size={26}></Avatar>
            <Text style={styles.userText}>Posted by {item.user}</Text>
          </View>
          <View style={styles.middleArea}>
            <Text style={styles.middleText}>{item.title}</Text>
          </View>
          <View style={styles.bottomArea}>
            <MaterialCommunityIcons name="comment" size={18} color="#949494" />
            <Text style={styles.bottomText}>{item.comments}</Text>
            <MaterialCommunityIcons name="calendar-blank" size={18} color="#949494" />
            <Text style={styles.bottomText}>{item.date.replaceAll(',','')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderColor: "white",
      flex: 1,
      marginHorizontal: 12,
      marginTop: 18,
      padding: 2,
      borderRadius: 6,
      borderWidth: 1,
    },
    middleText: {
      color: 'black',
      fontWeight: '600',
      fontSize: 24,
      padding: 10,
    },
    userText: {
      color: '#949494',
      fontStyle: "italic",
      fontSize: 13,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
    },
    bottomText: {
      color: '#949494',
      fontWeight: '600',
      fontSize: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 25,
    },
    topArea: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 10,
      alignItems: "center",
    },
    middleArea: {
      flex: 1,
    },
    bottomArea: {
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 10,
      alignItems: "center",
    }
  });

export default ThreadRow;