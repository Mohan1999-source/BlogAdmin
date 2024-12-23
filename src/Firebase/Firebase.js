// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc ,deleteDoc,updateDoc,doc,getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDythp1zFz3RLbbfbHxk0_SAugyTzvAzLs",
  authDomain: "freelance1-153c8.firebaseapp.com",
  projectId: "freelance1-153c8",
  storageBucket: "freelance1-153c8.firebasestorage.app",
  messagingSenderId: "989662314512",
  appId: "1:989662314512:web:513ffb3cf54cce23a34a95"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { db,storage, ref, uploadBytes, getDownloadURL,collection, addDoc,deleteDoc ,updateDoc,doc,getDocs};