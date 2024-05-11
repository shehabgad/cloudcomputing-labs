importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js');

const config = {
  apiKey: "AIzaSyBITFYBAFi3slkXatj75zsPC5o0H-CAWXM",
  authDomain: "cloud-lab-1-4cca6.firebaseapp.com",
  projectId: "cloud-lab-1-4cca6",
  storageBucket: "cloud-lab-1-4cca6.appspot.com",
  messagingSenderId: "608221972387",
  appId: "1:608221972387:web:53f707f740776d2805bc16",
  measurementId: "G-YMZDCQ35Z4",
  databaseURL: "https://cloud-lab-1-4cca6-default-rtdb.europe-west1.firebasedatabase.app/"
}
firebase.initializeApp(config)

const database = firebase.database();
const DB_NOTIFCATIONS_NAME = "/notifications";

const writeNotification = async (notification) => {
  console.log(notification);
  const notifcationsRef = database.ref(DB_NOTIFCATIONS_NAME)
  notifcationsRef.push({
    title: notification.title,
    body: notification.body,
    image: "" + notification.image
  })
};


const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  writeNotification(payload.notification)
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

