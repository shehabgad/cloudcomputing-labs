import { database } from '../firebase'
import { set, ref, push, get, child, onValue } from "firebase/database";

export const DB_NOTIFCATIONS_NAME = "/notifications"

export const writeNotification = async (notification) => {
  console.log(notification)
  push(ref(database, DB_NOTIFCATIONS_NAME), {
    title: notification.title,
    body: notification.body,
    image: "" + notification.image
  })
}

export const fetchAllDataFromDB = async () => {
  const dbRef = ref(database, "notifications")
  const snapshot = await get(dbRef)
  const notifications = []
  snapshot.forEach(childSnapshot => {
    notifications.push(childSnapshot.val())
  })
  return notifications
}

export const getNotificationsRealtime = (setNotifications) => {
  const dbRef = ref(database, DB_NOTIFCATIONS_NAME)
  onValue(dbRef, (snapshot) => {
    const notifications = []
    snapshot.forEach(childSnapshot => {
      notifications.push(childSnapshot.val())
    })
    setNotifications(notifications)
  })
}