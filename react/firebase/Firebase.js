import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUtLcgF1JMOB1HR7q2PlBxB98LRuVEL9E",
  authDomain: "project-defence.firebaseapp.com",
  databaseURL: "https://project-defence-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-defence",
  storageBucket: "project-defence.appspot.com",
  messagingSenderId: "851868368276",
  appId: "1:851868368276:web:5f4b43fd3c3edf67e7e381",
  measurementId: "G-9KJ215NXQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


export const getAllSmartphones = async () => {
    try {
      const smartphonesRef = ref(database, 'smartphones');
      const snapshot = await get(smartphonesRef);
  
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        return data;
      } else {
        console.log("No data available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const getAllCellphones = async () => {
    try {
      const chellphonesRef = ref(database, 'cellphones');
      const snapshot = await get(chellphonesRef);
  
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        return data;
      } else {
        console.log("No data available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const getAllSmartwatches = async () => {
    try {
      const smartpwatchesRef = ref(database, 'smartwatches');
      const snapshot = await get(smartpwatchesRef);
  
      if (snapshot.exists()) {
        const data = Object.values(snapshot.val());
        return data;
      } else {
        console.log("No data available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  export const getOneDevice = async (pathAndId) => {
    try {
      const deviceRef = ref(database, pathAndId);
      const snapshot = await get(deviceRef);
  
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        return data;
      } else {
        console.log("No data available");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

export default app;