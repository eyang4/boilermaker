import {createStore, applyMiddleware} from 'redux'
import thunks from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {dummyReducer} from './reducers'

const logger = createLogger()
const store = createStore(dummyReducer, applyMiddleware(thunks, logger))
export default store
