import React from "react";
import { Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/database";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBjllX7M_p3lwZlTbrnz0HUtNQiWg_v_sc",
    authDomain: "web-scraping-api.firebaseapp.com",
    databaseURL: "https://web-scraping-api.firebaseio.com",
    projectId: "web-scraping-api",
    storageBucket: "web-scraping-api.appspot.com",
    messagingSenderId: "562655786141",
    appId: "1:562655786141:web:da6c23efde05ab23629074"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();

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
          console.log(data);
          return data;
        }
      },
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      }
    );
}

export { getAllPosts };
