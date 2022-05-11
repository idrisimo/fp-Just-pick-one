import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import filtersReducer from './reducers/filtersReducer'

const store = createStore(filtersReducer, composeWithDevTools(applyMiddleware(thunk)))


export default store
