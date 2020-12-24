import {
  RESULT_LIST_FAIL,
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
} from '../constants/resultConstants'

export const getResultReducer = (state = { resultList: [] }, action) => {
  switch (action.type) {
    case RESULT_LIST_REQUEST:
      return { loading: true, state: [] }
    case RESULT_LIST_SUCCESS:
      return { loading: false, success: true, resultList: action.payload }
    case RESULT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
