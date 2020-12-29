import { combineReducers } from "redux";
import settingsReducer from "./users/settings";
import userReducer from "./users";
import postsReducer from "./posts";

export default combineReducers({
  settings: settingsReducer,
  user: userReducer,
  posts: postsReducer,
});