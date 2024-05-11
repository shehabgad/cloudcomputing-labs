import React, { Component, useEffect, useState } from 'react'
import { generateToken } from './firebase'
import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase';
import { writeNotification, getNotificationsRealtime } from './models/notifications';
import { fetchAllDataFromDB } from './models/notifications'
import { downloadFile, uploadFile, downloadAllFiles, deleteFile } from './storage';
import { writeInDb, readFromDb, readAllFromDb, deleteFileFromDb } from './models/files';
function App() {

  const [fileUrl, setFileUrl] = useState('')
  const [userId, setUserId] = useState('')
  const [fileName, setFileName] = useState('')
  const [toBeUploadedFile, setToBeUploadedFile] = useState(null)
  const [allFilesUrls, setAllFilesUrls] = useState([])
  const handleUpload = async () => {
    if (!userId || !toBeUploadedFile) {
      alert('User id or file is not entered')
      return
    }
    const file_url = await uploadFile(userId, toBeUploadedFile)
    if (file_url) {
      writeInDb(userId, toBeUploadedFile.name, file_url)
    }
  }

  const handleDownload = () => {
    if (!userId || !fileName) {
      alert('User id or file is not entered')
      return
    }
    downloadFile(userId, fileName, setFileUrl)
  }

  const handleDownloadFromDb = () => {
    if (!userId || !fileName) {
      alert('User id or file is not entered')
      return
    }
    readFromDb(userId, fileName, setFileUrl)
  }

  const handleDownloadAllfiles = () => {
    if (!userId) {
      alert('User id is not entered')
      return
    }
    downloadAllFiles(userId, setAllFilesUrls)
  }
  const handleDownloadAllfilesFromDb = () => {
    if (!userId) {
      alert('User id is not entered')
      return
    }
    readAllFromDb(userId, setAllFilesUrls)
  }

  const handleDeleteFile = async (file_url) => {
    await deleteFile(file_url)
    await deleteFileFromDb(file_url)
    const newAllFileUrls = allFilesUrls.filter(file => file.url !== file_url)
    setAllFilesUrls(newAllFileUrls)
  }
  const handleClearfile = () => {
    setFileUrl("")
  }
  const handleClearAllfiles = () => {
    setAllFilesUrls([])
  }
  return (
    <div>
      <h4>Enter User ID</h4>
      <input
        type='text'
        placeholder='User ID'
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <hr></hr>
      <h4>Upload an file</h4>
      <input
        type='file'
        onChange={(e) => setToBeUploadedFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
      <hr></hr>
      {/* <h4>Enter file name to download</h4>
      <input
        type='text'
        placeholder='file name'
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <button onClick={handleDownload}>Download</button>
      <button onClick={handleDownloadFromDb}>Download From Db</button>

      <button onClick={handleClearfile}>Clear file</button>
      {fileUrl && <img src={fileUrl} alt={fileName} style={{ display: 'block' }} />} */}
      <hr></hr>
      <button onClick={handleDownloadAllfiles}>Get All files</button>
      <button onClick={handleDownloadAllfilesFromDb}>Get All files From Db</button>
      <button onClick={handleClearAllfiles}>Clear All files</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allFilesUrls.map((file, index) =>
              <tr key={index}>
                <td><a href={file.url}>{file.name}</a></td>
                <td>
                  <button onClick={() => {
                    console.log(file.url)
                    handleDeleteFile(file.url)
                  }}>
                    Delete
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default App