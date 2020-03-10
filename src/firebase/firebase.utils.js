import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyAJx-EEISoI7OENywPXzkTMXcI9PkxQQAA',
	authDomain: 'tyme-ac4f0.firebaseapp.com',
	databaseURL: 'https://tyme-ac4f0.firebaseio.com',
	projectId: 'tyme-ac4f0',
	storageBucket: 'tyme-ac4f0.appspot.com',
	messagingSenderId: '673648672917',
	appId: '1:673648672917:web:14a35781463928c2fd9b9c'
};

// Initialize Firebase
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// add new user
export const createNewUser = (name, email, password) => {
	firebase.firestore().collection('users').add({
		name: name,
		email: email,
		password: password,
		date_created: new Date()
	});
};

export const updateUserTimer = (id, name, hour, min, ampm) => {
	console.log(id);
	firebase.firestore().collection("users").doc(id).update({
		"timers": {
			"medication": name,
			"repeat": false,
			"setFor": [hour, min, ampm]
		}
	});
}

export const getUsers = () => {
	let userRef = firebase.firestore().collection('users');
	// let users = [];

	userRef
		.get()
		.then((snapshot) => {
			if (snapshot.empty) {
				console.log('No users found');
			} else {
				console.log('Users found');
				// console.log(snapshot.docs);
				snapshot.docs.forEach((doc) => {
					return doc.data();
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
