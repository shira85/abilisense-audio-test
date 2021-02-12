import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import { Table, Container } from 'react-bootstrap'
import FetchButton from '../components/fetchButton/FetchButton'
import FileInput from '../components/fileInput/FileInput'
import FileNameList from '../components/fileNameList/FileNamelist'
import Header from '../components/Header/Header'
import UserRecord from '../components/UserRecord/UserRecord'

const Homepage = () => {
  const [fileList, setFileList] = useState([])
  const [resultList, setResultList] = useState([])
  const [toggleResult, setToggleResult] = useState(false)
  const [fileCSV, setFileCSV] = useState([])
  const [toggleLoading, setToggleLoading] = useState(false)
  const [stringResultList, setStringResultList] = useState([])
  const [toggleRecord, setToggleRecord] = useState(false)

  const addFile = () => {
    setToggleLoading(false)
    if (fileList.length > 0) {
      setResultList([])
      setFileList([])
    }
    let file = document.getElementById('file')
    for (let i = 0; i < file.files.length; i++) {
      if (file.files[i].size > 700000) {
        alert(`File ${file.files[i].name} is too big!`)
        file.value = ''
        break
      } else {
        file.files[i].blobURL = URL.createObjectURL(file.files[i])
        fileList.push(file.files[i])
        setFileList([...fileList])
      }
    }
  }

  const addRecord = (blob) => {
    setToggleLoading(false)
    if (resultList.length > 0) {
      setResultList([])
    }
    if (blob.size > 700000) {
      alert(`File ${blob.name} is too big!`)
    } else {
      setFileList([blob])
    }
  }

  const onButtonSubmit = () => {
    setToggleLoading(true)
    // loop the files and make a new formdata for each file

    for (let i = 0; i < fileList.length; i++) {
      const fd = new FormData()
      fd.append('audiofile', fileList[i])
      fd.append('samplingrate', 44100)

      fetchSound(fd, i)
    }
  }

 /* const fetchSound = async (fd, idx) => {
    const response = await fetch('https://api.abilisense.com/v1/api/predict', {
      // Your POST endpoint
      method: 'POST',
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        'X-AbiliSense-API-Key': '0479e58c-3258-11e8-b467-4d41j4-Svc01',
      },
      body: fd, // This is your file object
    })

    const json = await response.json()
    let jsonArray = makeResponseArray(json)

    arrangeResult(jsonArray) // putting the best result first
    resultList.push(jsonArray)
    setResultList([...resultList])
    fileList[idx].result = jsonArray
    setFileList([...fileList])

    // arrangeStringResult(jsonArray); // arraging the results as strings with no 0. value for categoryList component
  }*/
  const fetchSound = async (fd, idx) => {
    debugger
    const response = await fetch("https://api.abilisense.com/v1/api/Deepsense_500", {
      // Your POST endpoint
      method: 'POST',
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        "X-AbiliSense-API-Key": "0479e58c-3258-11e8-b467-4d41j4-mm141",
      },
      body: fd, // This is your file object
    })
    const data = await response.json();
    const lengthData = data.length;
    let json = {};
    // if lengthData equal 1 there is only one predict
    if (lengthData == 0) {
      json = { Label: 'No predicts' };
    }
    else {
      let bigScoreIndex;
      let bigScore = 0;
      for (let i = 0; i < lengthData; i++) {
        if (data[i].events.Score > bigScore) {
          bigScore = data[i].events.Score
          bigScoreIndex = i;
        }
      }
      try{
        json = { Label: data[bigScoreIndex].events.Label? data[bigScoreIndex].events.Label:'No predict', Score: data[bigScoreIndex].events.Score }
        resultList.push(json.Label)
        setResultList([...resultList])
        fileList[idx].result=json.Label;
        setFileList([...fileList])
      }
      catch(e){
        console.log('error');
      }
    }
  }

  const makeResponseArray = (json) => {
    let space_count = 0
    let tempString = ''
    let resultArray = []

    for (const char of json) {
      if (tempString == 'Fireworks') {
        tempString = 'Explosion'
      }
      if (char == ' ') {
        space_count++
      }
      if (space_count == 2) {
        resultArray.push(tempString)
        tempString = ''
        space_count = 0
        continue
      }
      tempString += char
    }
    return resultArray
  }

  const toggleChecked = () => {
    setToggleResult(!toggleResult)
  }
  // accept an array of results from the API and sending it so the 1st result is the highest
  const arrangeResult = (jsonArray) => {
    let res_index = 0 // index of the result in the array
    let res_num = 0 // number of the result for ex breaking 0.6 res_num is 6
    let temp = '' // the result array
    for (let res in jsonArray) {
      let point_Index = jsonArray[res].indexOf('.')
      if (jsonArray[res].charAt(point_Index + 1) === '0') {
        temp = jsonArray[res]
        jsonArray.splice(res, 1)
        jsonArray.unshift(temp) // putting the best result first
        return jsonArray
      } else if (jsonArray[res].charAt(point_Index + 1) > res_num) {
        res_index = res
        res_num = jsonArray[res].charAt(point_Index + 1)
        temp = jsonArray[res]
      }
    }
    jsonArray.splice(res_index, 1)
    jsonArray.unshift(temp) // putting the best result first
    return jsonArray
  }

  const clearAll = () => {
    let file = document.getElementById('file')
    if (file.value) {
      file.value = ''
    }
    setFileList([])
    setResultList([])
    setToggleResult(false)
    setToggleLoading(false)
  }

  return (
    <>
      <Header />
      <Container fluid className='pink-border'>
        <input className='user-key-input' type='text' placeholder='Your Key' />
        <div className='file-btn-container'>
          <button
            className='button'
            onClick={() => {
              setToggleRecord(!toggleRecord)
            }}
          >
            {toggleRecord ? 'upload files?' : 'record?'}
          </button>
          {toggleRecord ? (
            <UserRecord addRecord={addRecord} />
          ) : (
            <FileInput addFile={addFile} />
          )}
          <FetchButton onButtonSubmit={onButtonSubmit} />

          <button className='button' onClick={clearAll}>
            Clear
          </button>
        </div>
        {resultList.length === fileList.length ? (
          resultList.length > 0 ? (
            <h4 className='loader'>Completed</h4>
          ) : null
        ) : toggleLoading ? (
          <CircularProgress className='loader' />
        ) : null}
        <Container>
          <Table
            striped
            bordered
            hover
            responsive
            className='table-md table-data'
          >
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Play Sound</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <FileNameList fileList={fileList} />
            </tbody>

            {/* <ResultList resultList={resultList} toggleResult={toggleResult} /> */}
          </Table>
        </Container>
      </Container>
    </>
  )
}

export default Homepage
