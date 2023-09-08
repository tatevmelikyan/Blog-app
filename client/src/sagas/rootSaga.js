import {all, put, takeEvery} from 'redux-saga/effects'
import watcherPostsSaga from './postsSaga'


export default function* rootSaga() {
    yield all([
      watcherPostsSaga()
    ])
}