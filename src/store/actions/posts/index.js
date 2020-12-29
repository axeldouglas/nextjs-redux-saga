import * as actionTypes from "../index.js";

export const postsUpdateList = (posts) => ({
	type: actionTypes.POSTS_UPDATE_LIST,
	payload: posts,
});