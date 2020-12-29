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