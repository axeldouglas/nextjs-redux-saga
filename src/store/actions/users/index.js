import * as actionTypes from "../index.js";

export const getUsers = (payload) => ({
  type: actionTypes.GET_USERS,
  payload,
});

export const userReset = () => ({
	type: actionTypes.USER_RESET,
});