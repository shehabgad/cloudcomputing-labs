import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs, deleteDoc } from 'firebase/firestore';

export const writeInDb = async (userId, fileName, fileUrl) => {
  await addDoc(collection(db, "files"), {
    user_id: userId,
    file_name: fileName,
    file_url: fileUrl
  })
}

export const readFromDb = async (userId, fileName, setfileUrl) => {
  const my_query = query(
    collection(db, "files"),
    where("user_id", "==", userId),
    where("file_name", "==", fileName)
  )
  const querySnapshot = await getDocs(my_query);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      const fileData = doc.data();
      console.log("from db")
      setfileUrl(fileData.file_url)
    })
  } else {
    alert(`file: ${fileName} doesn't exist for user: ${userId}`)
  }
}
export const deleteFileFromDb = async (file_url) => {
  const my_query = query(
    collection(db, "files"),
    where("file_url", "==", file_url)
  )
  const querySnapshot = await getDocs(my_query);
  if (querySnapshot.size > 0) {
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref)
      alert("File Deleted from DB")
    })
  }
}
export const readAllFromDb = async (userId, setAllFilesUrls) => {
  const my_query = query(
    collection(db, "files"),
    where("user_id", "==", userId),
  )
  const querySnapshot = await getDocs(my_query);
  const filesUrls = []
  if (querySnapshot.size > 0) {
    querySnapshot.forEach((doc) => {
      const fileData = doc.data()
      filesUrls.push({
        url: fileData.file_url,
        name: fileData.file_name
      })
    })
    setAllFilesUrls(filesUrls)
  }
  else {
    alert(`No files with the user ${userId}`)
  }
}