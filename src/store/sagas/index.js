import { all } from "redux-saga/effects";

import users from "./users/index";
// import posts from "./posts/index";

export default function* rootSaga() {
    return yield all([
        users,
        // posts,
    ]);
}
