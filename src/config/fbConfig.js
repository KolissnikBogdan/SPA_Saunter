import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyApbrATkWmIfa0wkxIC9105e4K46ytzI4g",
    authDomain: "saunter-react.firebaseapp.com",
    databaseURL: "https://saunter-react.firebaseio.com",
    projectId: "saunter-react",
    storageBucket: "saunter-react.appspot.com",
    messagingSenderId: "801803586863",
    appId: "1:801803586863:web:69acee9ccca6345c43a5da"
};

try {
    firebase.initializeApp(firebaseConfig);
    firebase.firestore();
} catch (err) {
    console.log(err.toString());
}

export default firebase;