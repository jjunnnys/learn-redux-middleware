import { handleActions, createAction } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import { startLoading, finishLoading } from './loading';

/* 1. 액션 타입을 선언 */

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

/* 2. 액션 함수 생성 */

export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

/* 3. saga 만들기 */

function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); // 로딩 시작
  // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있다.
  try {
    // call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다.
    // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
    const post = yield call(api.getPost, action.payload); // === api.getPost(action.payload)
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (error) {
    yield put({
      type: GET_POST_FAILURE,
      payload: error,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS)); // 로딩 시작
  try {
    const post = yield call(api.getPost);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: post.data,
    });
  } catch (error) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: error,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

/* 4. 초기 상태 선언 */

const initialState = {
  post: null,
  users: null,
};

/* 4. 리듀서 작성 */

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
