import * as firebase from "firebase";
import "firebase/database";

// initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBjllX7M_p3lwZlTbrnz0HUtNQiWg_v_sc",
    authDomain: "web-scraping-api.firebaseapp.com",
    databaseURL: "https://web-scraping-api.firebaseio.com",
    projectId: "web-scraping-api",
    storageBucket: "web-scraping-api.appspot.com",
    messagingSenderId: "562655786141",
    appId: "1:562655786141:web:da6c23efde05ab23629074"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//firebase.initializeApp(firebaseConfig);
export { firebase };
