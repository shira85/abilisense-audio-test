import React, { useState } from "react";
import Header from "./components/Header/Header";
import FileInput from "./components/fileInput/FileInput";
import FetchButton from "./components/fetchButton/FetchButton";
import FileNameList from "./components/fileNameList/FileNamelist";
import ResultList from "./components/resultList/ResultList";
import "./styles.css";

export default function App() {
  const [fileList, setFileList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [toggleResult, setToggleResult] = useState(false);
  const [fileCSV, setFileCSV] = useState([]);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [stringResultList, setStringResultList] = useState([]);

  const checkFileSize = () => {
    let file = document.getElementById("file");
    for (let i = 0; i < file.files.length; i++) {
      if (file.files[i].size > 500000) {
        alert(`File ${file.files[i].name} is too big!`);
        file.value = "";
        break;
      } else {
        fileList.push(file.files[i]);
        setFileList([...fileList]);
      }
    }
  };

  const onButtonSubmit = () => {
    setToggleLoading(true);
    // loop the files and make a new formdata for each file

    for (let i = 0; i < fileList.length; i++) {
      const fd = new FormData();
      fd.append("audiofile", fileList[i]);
      fd.append("samplingrate", 44100);

      fetchSound(fd);
    }
  };

  const fetchSound = async (fd) => {
    const response = await fetch("https://api.abilisense.com/v1/api/predict", {
      // Your POST endpoint
      method: "POST",
      headers: {
        // Content-Type may need to be completely **omitted**
        // or you may need something
        "X-AbiliSense-API-Key": "0479e58c-3258-11e8-b467-4d41j4-Svc01",
      },
      body: fd, // This is your file object
    });

    const json = await response.json();
    let jsonArray = makeResponseArray(json);

    arrangeResult(jsonArray); // putting the best result first
    resultList.push(jsonArray);
    setResultList([...resultList]);
    // arrangeStringResult(jsonArray); // arraging the results as strings with no 0. value for categoryList component
  };

  const makeResponseArray = (json) => {
    let space_count = 0;
    let tempString = "";
    let resultArray = [];
    let spaceIdx = -1;
    for (const char of json) {
      if (char == " ") {
        space_count++;
      }
      if (space_count == 2) {
        resultArray.push(tempString);
        tempString = "";
        space_count = 0;
      }
      tempString += char;
    }
    return resultArray;
  };

  const toggleChecked = () => {
    setToggleResult(!toggleResult);
  };
  // accept an array of results from the API and sending it so the 1st result is the highest
  const arrangeResult = (jsonArray) => {
    let res_index = 0; // index of the result in the array
    let res_num = 0; // number of the result for ex breaking 0.6 res_num is 6
    let temp = ""; // the result array
    for (let res in jsonArray) {
      let point_Index = jsonArray[res].indexOf(".");
      if (jsonArray[res].charAt(point_Index + 1) === "0") {
        temp = jsonArray[res];
        jsonArray.splice(res, 1);
        jsonArray.unshift(temp); // putting the best result first
        return jsonArray;
      } else if (jsonArray[res].charAt(point_Index + 1) > res_num) {
        res_index = res;
        res_num = jsonArray[res].charAt(point_Index + 1);
        temp = jsonArray[res];
      }
    }
    jsonArray.splice(res_index, 1);
    jsonArray.unshift(temp); // putting the best result first
    return jsonArray;
  };

  const downloadCSV = () => {
    for (let i = 0; i < fileList.length; i++) {
      let temp = {
        File: fileList[i].name,
        Sound: resultList[i][0].events[0],
      };

      fileCSV.push(temp);
      setFileCSV([...fileCSV]);
    }
  };

  // const sendCSVToEmail = () => {
  //   downloadCSV();
  //
  // };

  const arrangeStringResult = (json) => {
    for (let res in json) {
      let spaceIdx = json[res].events[0].indexOf(" ");
      let sliceResult = json[res].events[0].slice(0, spaceIdx);
      let isCategoryExist = stringResultList.findIndex(
        (res) => res.name === sliceResult
      );
      if (isCategoryExist !== -1 && stringResultList.length > 1) {
        stringResultList[isCategoryExist].count++;
        setStringResultList([...stringResultList]);
      } else {
        stringResultList.push({ name: sliceResult, count: 1 });
        setStringResultList([...stringResultList]);
      }
    }
  };

  const clearAll = () => {
    document.getElementById("file").value = "";
    setFileList([]);
    setResultList([]);
    setToggleResult(false);
    setFileCSV([]);
    setToggleLoading(false);
    setStringResultList([]);
  };

  return (
    <>
      <Header />
      <div className="pink-border">
        <div className="file-btn-container">
          <FileInput checkFileSize={checkFileSize} />
          <FetchButton onButtonSubmit={onButtonSubmit} />
        </div>

        <table>
          <tr>
            <th>File Name</th>
            <th>Result</th>
          </tr>

          <tr>
            <FileNameList fileList={fileList} />
            <ResultList resultList={resultList} toggleResult={toggleResult} />
          </tr>
        </table>
      </div>
    </>
  );
}
