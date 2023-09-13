import createSagaMiddleware from "redux-saga";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootSaga from "./rootSaga";

import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
