# nextjs-redux-saga base
Base structure to use Redux Saga with Next.js
> This base structure example is based on the Jan 2021 documentation. Check the [with-redux-saga](https://github.com/vercel/next.js/tree/canary/examples/with-redux-saga) current documentation exemple.

# How to use
Create new Next.js project
```bash
npx create-next-app project-name
cd project-name
```

Install Redux and Saga: [next.js oficial exemple](https://github.com/vercel/next.js/tree/canary/examples/with-redux-saga)
```bash
npm install redux react-redux redux-saga
# or
yarn add redux react-redux redux-saga
```
This will install all `redux-saga` dependencies

Install `next-redux-wrapper` that brings Next.js and Redux together.
```bash
npm install next-redux-wrapper
# or
yarn add next-redux-wrapper
```

## Dev Tools
Debbug the redux structure on browser [docs](https://github.com/zalmoxisus/redux-devtools-extension)
```bash
npm install redux-devtools-extension
# or
yarn add redux-devtools-extension
```


# File Structure
Create a folder and file structure considering modules Users and Posts for example
> This structure can change according to the size of the project. You can separete per module for exemple, and inside each module create a file to actions, reducers, etc.

## Actions

First at all create the actions list `/src/store/actions/index.js`
```javascript
// *** USER ***
export const GET_USERS = "GET_USERS";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const USER_RESET = "USER_RESET";

// *** SETTINGS ***
export const USER_SETTINGS_UPDATE_LANGUAGE = "USER_SETTINGS_UPDATE_LANGUAGE";

// *** POSTS ***
export const POSTS_UPDATE_LIST = "POSTS_UPDATE_LIST";
```

* <u>Users</u> actions `/src/store/actions/users/index.js`
```javascript
import * as actionTypes from "../index.js";

export const getUsers = (payload) => ({
  type: actionTypes.GET_USERS,
  payload,
});

export const userReset = () => ({
	type: actionTypes.USER_RESET,
});
```

* <u>Users Settings</u> actions `/src/store/actions/users/settings.js`
```javascript
import * as actionTypes from "../index.js";

export const settingsUpdateLang = (lang) => ({
  type: actionTypes.USER_SETTINGS_UPDATE_LANGUAGE,
  payload: lang,
});
```

* <u>Posts</u> actions `/src/store/actions/posts/index.js`
```javascript
import * as actionTypes from "../index.js";

export const postsUpdateList = (posts) => ({
	type: actionTypes.POSTS_UPDATE_LIST,
	payload: posts,
});
```

## Reducers

Next step is create the reducers structure

* <u>Users</u> reducer `/src/store/reducers/users/index.js`
```javascript
import { HYDRATE } from "next-redux-wrapper";
import * as actionTypes from "../../actions";

const initialState = {
  id: null,
  name: null,
  username: null,
  email: null,
  address: {
    street: null,
    suite: null,
    city: null,
    zipcode: null,
    geo: {
      lat: null,
      lng: null,
    }
  },
  phone: null,
  website: null,
  company: {
    name: null,
    catchPhrase: null,
    bs: null,
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case actionTypes.GET_USERS_SUCCESS:
      return { ...state, ...action.payload.newUser };
    case actionTypes.USER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
```

* <u>Users Settings</u> reducer `/src/store/reducers/users/settings.js`
```javascript
import { HYDRATE } from "next-redux-wrapper";
import * as actionTypes from "../../actions";

const initialState = {
  language: "pt-br",
  postsPerPage: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.settings };
    case actionTypes.USER_SETTINGS_UPDATE_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};

export default reducer;
```

* <u>Posts</u> reducer `/src/store/reducers/posts/index.js`
```javascript
import { HYDRATE } from "next-redux-wrapper";
import * as actionTypes from "../../actions";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.posts;
    case actionTypes.POSTS_UPDATE_LIST:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
```

> If you notice, all reducers have an action called *HYDRATE* imported from `next-redux-wrapper`. Hydrate adjust the version that came from server side with the client version, updating only the changes between them.


Now create the reducer file that will combine the other ones `/src/store/reducers/index.js`
```javascript
import { combineReducers } from "redux";
import settingsReducer from "./user/settings";
import userReducer from "./user";
import postsReducer from "./posts";

export default combineReducers({
  settings: settingsReducer,
  user: userReducer,
  posts: postsReducer,
});
```

## Services/API

Create a structure to connect and fetch data from API `/src/services/api/users.js`
```javascript
export function getUsers(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  }));
}
```

## Sagas

* <u>Users</u> sagas `/src/store/saga/users/index.js`
```javascript
import { all, call, delay, put, take, takeLatest } from 'redux-saga/effects';
import * as actionTypes from '../../actions/index';

import * as api from "../../../services/api/users";

export function* getUsersSaga({ payload }) {
    try {
        const data = yield call(api.getUsers, payload);
        
        yield put({
            type: actionTypes.GET_USERS_SUCCESS,
            payload: { newUser: data || {} },
        });
    } catch (error) {
        console.log('error: ', error);
    } finally { }
}

export default all([
    takeLatest(actionTypes.GET_USERS, getUsersSaga),
]);
```

Now create the sagas file that will combine the other ones `/src/store/saga/index.js`
```javascript
import { all } from "redux-saga/effects";

import users from "./users/index";
// import posts from "./posts/index";

export default function* rootSaga() {
    return yield all([
        users,
        // posts,
    ]);
}
```

## Store

Save the current application state `/src/store/index.js`
```javascript
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
```

## Final Structure

```
📁project
├──📁src
│   ├──📁pages
│   |   └──...
│   ├──📁services
│   |   └──📁api
│   |   |   └──📃index.js
│   ├──📁store
│   |   ├──📁actions
│   |   |   ├──📁users
│   |   |   |   ├──📃index.js
│   |   |   |   └──📃settings.js
│   |   |   ├──📁posts
│   |   |   |   └──📃index.js
│   |   |   └──📃index.js
│   |   ├──📁reducers
│   |   |   ├──📁users
│   |   |   |   ├──📃index.js
│   |   |   |   └──📃settings.js
│   |   |   ├──📁posts
│   |   |   |   └──📃index.js
│   |   |   └──📃index.js
│   |   ├──📁sagas
│   |   |   ├──📁users
│   |   |   |   ├──📃index.js
│   |   |   |   └──📃settings.js
│   |   |   ├──📁posts
│   |   |   |   └──📃index.js
│   |   |   └──📃index.js
│   |   └──📃index.js
|   └── ...
└── ...
```
## Store Initialize

Now is necessary set up the store structure in our `src/pages/_app.js` to make all redux confiiguration that we made, start to work.

```javascript
import "../styles/globals.css";
import { storeWrapper } from "../store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default storeWrapper.withRedux(MyApp);
```

## Get Data on Pages
Exemple to access the data stored `/src/pages/index.js`

```javascript
import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as actionUsers from "../store/actions/users";

function Home({ users }) {
	const dispatch = useDispatch();
	
  useEffect(() => {
    dispatch(actionUsers.getUsers());
  }, []);

  useEffect(() => {
    console.log('users:', users);
  }, [users]);

  return (
    <>Hello</>
  )
}

const mapStateToProps = state => ({
  users: state.user,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```