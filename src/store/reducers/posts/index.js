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