import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import ThreadRow from '../components/ThreadRow';
import { getAllPosts } from "../services/Firebase";

const DATA = [{"id":"1607379908","title":"Barking mad M.O.B","user":"topcat ","date":"December 7 2020","time":"10:25 pm","description":"Inspired","comments":2,"parrentID":"","childIDs":["1607382235","1607380660"]},{"id":"1607382235","title":"Haha!! ","user":"db ","date":"December 7 2020","time":"11:03 pm","description":"\n\n","comments":1,"parrentID":"1607379908","childIDs":[]},{"id":"1607380660","title":"Bad case of logorrhea. ","user":"Cactus Jack ","date":"December 7 2020","time":"10:37 pm","description":"\n\n","comments":1,"parrentID":"1607379908","childIDs":[]},{"id":"1607378315","title":"Prediction League - I got 9 results right this week. Guess who let me down? ","user":"Brentwood Blue ","date":"December 7 2020","time":"9:58 pm","description":"","comments":1,"parrentID":"","childIDs":["1607378593"]},{"id":"1607378593","title":"Well done, Jim. Trust those buggers in royal blue, eh? ","user":"Cactus Jack ","date":"December 7 2020","time":"10:03 pm","description":"\n\n","comments":1,"parrentID":"1607378315","childIDs":[]},{"id":"1607369281","title":"Everton Nigeria update on the Banks of the Royal Blue Ikolo,","user":"Midfield General ","date":"December 7 2020","time":"7:28 pm","description":"Hi Everyone\nYesterday results in group E. As you can see the group of death is living up to its reputation we lie on Second place and only need a draw next week to progress to the knock out stages. However, we will of course be trying to win and win the Group! The video below shows the team arriving home cheered by the local community. Very cool! #COYBS #UTFTS\nYENEGUE FC -1\nvs\nEVERTON NIGERIA -2\nAKENFA FC- 2\nvs\nAKENPAI FC 0\n1. AKENFA 4poi +2 goals\n2. Everton Nigeria 4point 1goal\n3. AKENPAI 3point 0 goal\n4. YENEGUE FC 0 0 point -3goals","comments":1,"parrentID":"","childIDs":["1607369448"]},{"id":"1607369448","title":"Please follow us on FB. The video of the local community celebrating our First team return from","user":"Midfield General  ","date":"December 7 2020","time":"7:30 pm","description":"The return of our away win yesterday is amazing!\n","comments":1,"parrentID":"1607369281","childIDs":[]},{"id":"1607363276","title":"Anyone had the dreaded email from Everton","user":"JC ","date":"December 7 2020","time":"5:47 pm","description":"to say they've been successful in the ballot\n\nFortunately I've been unsuccessful ","comments":10,"parrentID":"","childIDs":["1607373696","1607371904","1607363749"]},{"id":"1607373696","title":"","user":"AndyH ","date":"December 7 2020","time":"8:41 pm","description":"No joy for me either.\n\nSaves me getting a test and timing it right to fulfil the criteria:\n\nIn support of the Liverpool City Region mass-testing programme, all fans who are successful in the ballot will need to provide confirmation of having received a negative COVID-19 test result on the day of the game - or the day prior - to gain ery to the stadium.\n\n\n","comments":1,"parrentID":"1607363276","childIDs":[]},{"id":"1607371904","title":"No joy for me, fingers crossed for next game ","user":"Gray  ","date":"December 7 2020","time":"8:11 pm","description":"\n\n","comments":1,"parrentID":"1607363276","childIDs":[]},{"id":"1607363749","title":"Unfortunately I’ve been successful.","user":"PaulSan ","date":"December 7 2020","time":"5:55 pm","description":"I jest - I’m really pleased and feel lucky to be one of the few back there. It will be strange but hopefully we’ll see more and more fans back there soon.\n","comments":7,"parrentID":"1607363276","childIDs":["1607372163","1607367646","1607366781","1607364335"]},{"id":"1607372163","title":"I’m hoping with there only being 2000 there","user":"Ezy ","date":"December 7 2020","time":"8:16 pm","description":"We get to hear “cmon Everton deez are shite” at least once\n","comments":2,"parrentID":"1607363749","childIDs":["1607372724"]},{"id":"1607372724","title":"Not usually my style but I’ll see what I can do ;-) ()","user":"PaulSan ","date":"December 7 2020","time":"8:25 pm","description":"\n\n","comments":1,"parrentID":"1607372163","childIDs":["1607373075"]},{"id":"1607373075","title":"It would be greatly appreciated &#128522;.","user":"Ezy ","date":"December 7 2020","time":"8:31 pm","description":"\n\n","comments":1,"parrentID":"1607372724","childIDs":[]},{"id":"1607367646","title":"Don't forget your TPF banner...","user":"T-t ","date":"December 7 2020","time":"7:00 pm","description":"\n... footer's not footer without banners....","comments":1,"parrentID":"1607363749","childIDs":[]},{"id":"1607366781","title":"enjoy it, probably less than 80 Goodison games left when you think about it ","user":"Col ","date":"December 7 2020","time":"6:46 pm","description":"\n\n","comments":1,"parrentID":"1607363749","childIDs":["1607369601"]},{"id":"1607369601","title":"I best get off my arse and get to the game. ","user":"Jonathan Gard ","date":"December 7 2020","time":"7:33 pm","description":"\n\n","comments":1,"parrentID":"1607366781","childIDs":[]},{"id":"1607364335","title":"Enjoy","user":"JC ","date":"December 7 2020","time":"6:05 pm","description":"obviously I would have liked to have been back, well at least uil the referee blew his whistle to start the game\n","comments":1,"parrentID":"1607363749","childIDs":[]},{"id":"1607340486","title":"Symptom free Covid testing now available across Wirral - link inside","user":"macca ","date":"December 7 2020","time":"11:28 am","description":"Floral Pavilion, Greasby Library, Birkenhead Market and Eastham Library.\n\n\nTesting, testing....","comments":1,"parrentID":"","childIDs":[]},{"id":"1607338637","title":"John Collins/Allan....","user":"PaulC ","date":"December 7 2020","time":"10:57 am","description":"....yeah its a strange one just a gut feeling I shared. They are not similar players but I think it is more about the expectation I had that each would take the midfield up a level. and also that each were real clear targets of their managers at the time. Collins pately did not do that, and I am not seeing it yet with Allan.\n\nAllan has had some great moments....and some really bad ones and he can have spells in matches where he seems error prone. He may well adapt and be the player we hope he can be. Collins was just consistently mediocre on the other hand ;-)\n\nApologies for the shameless top of the boarding!","comments":12,"parrentID":"","childIDs":["1607349467","1607340459"]}];

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