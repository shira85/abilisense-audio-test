import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getResultReducer } from './reducers/resultListReducers'

const reducer = combineReducers({
  getResult: getResultReducer,
})

const initialState = {
  resultList: [],
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
