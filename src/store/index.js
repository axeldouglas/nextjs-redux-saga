import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer  from "./reducers";
import rootSaga  from "./sagas";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  return store
}

// export an assembled wrapper
export const storeWrapper = createWrapper(makeStore, { debug: true })