import React, { useState, useEffect } from 'react'

import Homepage from './pages/Homepage'
import './styles.css'

export default function App() {
  const [fileList, setFileList] = useState([])
  const [resultList, setResultList] = useState([])
  const [toggleResult, setToggleResult] = useState(false)
  const [fileCSV, setFileCSV] = useState([])
  const [toggleLoading, setToggleLoading] = useState(false)
  const [stringResultList, setStringResultList] = useState([])
  const [toggleRecord, setToggleRecord] = useState(false)
  const [userKey, setUserKey] = useState('')

  useEffect(() => {
    do {
      var userInput = prompt('Please enter your valid key')
    } while (userInput == null || userInput.length !== 36)
    setUserKey(userInput)
  }, [])

  const checkFileSize = () => {
    let file = document.getElementById('file')
    for (let i = 0; i < file.files.length; i++) {
      if (file.files[i].size > 500000) {
        alert(`File ${file.files[i].name} is too big!`)
        file.value = ''
        break
      } else {
        fileList.push(file.files[i])
        setFileList([...fileList])
      }
    }
  }

  const checkRecordSize = (blob) => {
    if (blob.size > 500000) {
      alert(`File ${blob.name} is too big!`)
    } else {
      setFileList([blob])
    }
  }

  const toggleChecked = () => {
    setToggleResult(!toggleResult)
  }

  const downloadCSV = () => {
    for (let i = 0; i < fileList.length; i++) {
      let temp = {
        File: fileList[i].name,
        Sound: resultList[i][0].events[0],
      }

      fileCSV.push(temp)
      setFileCSV([...fileCSV])
    }
  }

  const arrangeStringResult = (json) => {
    for (let res in json) {
      let spaceIdx = json[res].events[0].indexOf(' ')
      let sliceResult = json[res].events[0].slice(0, spaceIdx)
      let isCategoryExist = stringResultList.findIndex(
        (res) => res.name === sliceResult
      )
      if (isCategoryExist !== -1 && stringResultList.length > 1) {
        stringResultList[isCategoryExist].count++
        setStringResultList([...stringResultList])
      } else {
        stringResultList.push({ name: sliceResult, count: 1 })
        setStringResultList([...stringResultList])
      }
    }
  }

  const clearAll = () => {
    setFileList([])
    setResultList([])
    setToggleResult(false)
    setFileCSV([])
    setToggleLoading(false)
    setStringResultList([])
  }

  return <Homepage />
}
