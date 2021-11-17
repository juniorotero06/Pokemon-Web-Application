import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const thunkMiddleware = applyMiddleware(thunk);

const store = createStore(persistedReducer, thunkMiddleware);
let persistor = persistStore(store);

export { store, persistor };
