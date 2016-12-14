import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {AsyncStorage} from 'react-native'
import { persistStore, autoRehydrate } from 'redux-persist'

import rootReducer from './reducers'
import rootSaga from './sagas'

const initialState = {}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

if (__DEV__) {
  // we use require for dynamic import  
  const loggerMiddleware = require('./logger').default
  // add logger for development
  middleware.push(loggerMiddleware)  
}


// mount it on the Store
export const store = createStore(
  rootReducer,
  initialState,
  compose(
    // if you use getStoredState then no need to use auto hydrate to get state back
    autoRehydrate(),
    applyMiddleware(...middleware),      
  )
)

// Enable persistence
persistStore(store, {storage: AsyncStorage})

// then run the saga
sagaMiddleware.run(rootSaga)



