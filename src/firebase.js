import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const config = {
  apiKey: "AIzaSyBITFYBAFi3slkXatj75zsPC5o0H-CAWXM",
  authDomain: "cloud-lab-1-4cca6.firebaseapp.com",
  projectId: "cloud-lab-1-4cca6",
  messagingSenderId: "608221972387",
  appId: "1:608221972387:web:53f707f740776d2805bc16",
  measurementId: "G-YMZDCQ35Z4",
  storageBucket: "gs://cloud-lab-1-4cca6.appspot.com"
}
const app = initializeApp(config)
export const messaging = getMessaging(app)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const generateToken = async () => {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: "BLIjGcgY6_ZSOk0DrBTDsye9gZSWVp_gXImoqId5WUL9rqaRY_U5xo1fZXE2GZV-kGyVa70JUaCa_ldyijg81Mc"
    })
    console.log(token)
  }
}