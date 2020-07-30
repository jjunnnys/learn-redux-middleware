import { handleActions, createAction } from 'redux-actions';
import { delay, put, takeEvery, takeLatest } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 1. 비동기 액션 만들기 */

const INCREASE_ASYNC = 'INCREASE_ASYNC';
const DECREASE_ASYNC = 'DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

/* 2. 비동기 액션 생성함수 */

// 마우스 클릭 이벤트가 payload 안에 들어가지 않도록
// () => undefined 를 두 번째 파라미터로 넣어 준다.
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

/* 3. saga 만들기 */

function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 특정 액션을 디스패치
}

function* decreaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(decrease()); // 특정 액션을 디스패치
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState
);

export default counter;
