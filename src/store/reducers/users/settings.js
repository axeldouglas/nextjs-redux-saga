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