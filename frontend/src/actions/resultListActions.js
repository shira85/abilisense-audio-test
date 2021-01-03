import {
  RESULT_LIST_FAIL,
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
} from '../constants/resultConstants'

const fetchSingleResult = async (fd) => {
  const response = await fetch('https://api.abilisense.com/v1/api/predict', {
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
}

export const getResults = (fileList) => async (dispatch) => {
  try {
    dispatch({ type: RESULT_LIST_REQUEST })

    for (let i = 0; i < fileList.length; i++) {
      const fd = new FormData()
      fd.append('audiofile', fileList[i])
      fd.append('samplingrate', 44100)

      fetchSingleResult(fd)
    }

    dispatch({ type: RESULT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: RESULT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
