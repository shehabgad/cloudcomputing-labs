import { storage } from "./firebase";
import { ref, getMetadata, getDownloadURL, uploadBytes, listAll, deleteObject } from 'firebase/storage'

export const downloadFile = async (userId, fileName, setFileUrl) => {
  const filePath = constructPath(userId, fileName)
  const isFileExists = await fileExists(filePath)
  if (!isFileExists) {
    alert(`file: ${fileName} doesn't exist for user: ${userId}`)
    return
  }
  const fileRef = ref(storage, filePath)
  const fileUrl = await getDownloadURL(fileRef)
  console.log(fileUrl)
  setFileUrl(fileUrl)
}

export const downloadAllFiles = async (userId, setAllFilesUrls) => {
  const userIdRef = ref(storage, `${userId}`)
  const folder = await listAll(userIdRef)
  const filesUrls = []
  for (const fileRef of folder.items) {
    const fileUrl = await getDownloadURL(fileRef)
    filesUrls.push({
      url: fileUrl,
      name: fileRef.name
    })
  }
  if (filesUrls.length === 0) {
    alert(`No files with the user ${userId}`)
  }
  setAllFilesUrls(filesUrls)
}
export const fileExists = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath)
    await getMetadata(fileRef)
    return true
  } catch (err) {
    if (err.code === 'storage/object-not-found') {
      return false
    }

  }
}

export const uploadFile = async (userId, file) => {
  const filePath = constructPath(userId, file.name)
  const isFileExist = await fileExists(filePath)
  if (isFileExist) {
    alert("File already exists")
    return
  }

  const fileRef = ref(storage, filePath)
  try {
    await uploadBytes(fileRef, file)
    alert("Upload is successfull !")
    return getDownloadURL(fileRef)
  } catch (err) {
    alert("Upload was not successful")
  }
}

export const deleteFile = async (file_url) => {
  const fileRef = await ref(storage, file_url)
  await deleteObject(fileRef)
  alert("File got deleted from Storage")
}
export const constructPath = (userId, fileName) => {
  return `${userId}/${fileName}`
}