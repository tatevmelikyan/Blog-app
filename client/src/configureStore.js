import { combineReducers } from "redux";
import postsReducer from "./features/posts/postsSlice";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootSaga from "./sagas/rootSaga";

const reducer = combineReducers({
  posts: postsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;
