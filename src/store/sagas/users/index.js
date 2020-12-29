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