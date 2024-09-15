import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*apiKey: "AIzaSyBEqa8xOrWXqt9I68WdC4uE3W1vnA8jvW0",
    authDomain: "dengapp-5d20c.firebaseapp.com",
    projectId: "dengapp-5d20c",
    storageBucket: "dengapp-5d20c.appspot.com",
    messagingSenderId: "603039875561",
    appId: "1:603039875561:web:2b1c540cb1b1d067434b78",
    measurementId: "G-3DGJE66QX4"*/
    apiKey: "AIzaSyB8B8iaGTLU98o3LwuzndOsS97zFPd8wzY",
    authDomain: "dengue-app-a7c61.firebaseapp.com",
    projectId: "dengue-app-a7c61",
    storageBucket: "dengue-app-a7c61.appspot.com",
    messagingSenderId: "778956363684",
    appId: "1:778956363684:web:828560be689ffa31841331",
    measurementId: "G-YMHZD9DP8Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { db };
