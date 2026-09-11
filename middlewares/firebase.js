import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDiGF6uyCTZql_LOcZKzJQeh94qv3iY2Co",
  authDomain: "delalatest11.firebaseapp.com",
  projectId: "delalatest11",
  storageBucket: "delalatest11.appspot.com",
  messagingSenderId: "392107720319",
  appId: "1:392107720319:web:c3c87cfbac60bbb537094a",
  measurementId: "G-LBPQ1XVDWC"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
