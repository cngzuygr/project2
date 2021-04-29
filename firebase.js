import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBEBWcyVFwRYkS4HNt1zTwyq8eviqUU3F4",
	authDomain: "project-3591b.firebaseapp.com",
	projectId: "project-3591b",
	storageBucket: "project-3591b.appspot.com",
	messagingSenderId: "501467152973",
	appId: "1:501467152973:web:4ee298377a6d1328a45204",
	measurementId: "G-SWTZZ7TJC8",
};

let app;

if (firebase.apps.length === 0) {
	const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
