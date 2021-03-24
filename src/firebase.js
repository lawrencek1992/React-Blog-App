import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDdCgiTjihj9CjlRcJgDzSrgiEwT2RMVc4",
    authDomain: "react-blog-app-4758b.firebaseapp.com",
    projectId: "react-blog-app-4758b",
    storageBucket: "react-blog-app-4758b.appspot.com",
    messagingSenderId: "117116205938",
    appId: "1:117116205938:web:65aa4acb952ab56db8bbeb",
    measurementId: "G-LSRJFNE3MQ"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;
firebase.analytics();
